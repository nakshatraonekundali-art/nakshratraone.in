import { NextResponse } from 'next/server';
import { getPaymentContext, deletePaymentContext } from '../_store';

// Handle PayU success redirect (form POST)
export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let body;
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const form = await request.formData();
      body = Object.fromEntries(form.entries());
    }

    const { txnid, status, amount, productinfo, udf1 } = body;

    if (status === 'success') {
      // Decode user data sent via udf1
      let decoded = { planType: productinfo, userData: null };
      try {
        if (udf1) {
          decoded = JSON.parse(Buffer.from(udf1, 'base64').toString('utf-8'));
        }
      } catch (e) {
        // ignore decode errors and fall back to productinfo only
      }

      // Fallback to stored context when udf1 is missing (some gateways strip it)
      if (!decoded.userData && txnid) {
        const ctx = getPaymentContext(txnid);
        if (ctx) {
          decoded.userData = decoded.userData || ctx.userData;
          decoded.planType = decoded.planType || ctx.planType;
          deletePaymentContext(txnid);
        }
      }

      // Generate the PDF server-side
      let pdfUrl = '';
      let pdfError = '';
      let emailSent = false;
      let emailError = '';
      
      // Debug logging
      console.log('Payment success - decoded data:', {
        planType: decoded.planType,
        productinfo,
        hasUserData: !!decoded.userData,
        userDataKeys: decoded.userData ? Object.keys(decoded.userData) : []
      });
      
      try {
        if (!decoded.userData) {
          throw new Error('No user data available for PDF generation');
        }
        
        const pdfRequestData = { 
          userData: decoded.userData, 
          planType: decoded.planType || productinfo 
        };
        
        console.log('Calling PDF generation with:', pdfRequestData);
        
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
        const pdfApiUrl = `${baseUrl}/api/pdf/generate`;
        
        console.log('PDF generation URL:', pdfApiUrl);
        
        const res = await fetch(pdfApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pdfRequestData)
        });
        
        console.log('PDF generation response status:', res.status);
        
        const json = await res.json();
        console.log('PDF generation response:', json);
        
        if (json.success && json.pdf_url) {
          pdfUrl = json.pdf_url;
          
          // Send email with PDF if user email is available
          if (decoded.userData.email) {
            try {
              console.log('Sending email to:', decoded.userData.email);
              
              const emailResponse = await fetch(`${baseUrl}/api/email/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  to: decoded.userData.email,
                  subject: `Your Kundli Report - ${decoded.userData.name || 'User'}`,
                  pdfUrl: pdfUrl,
                  pdfName: `kundli-report-${decoded.userData.name || 'user'}.pdf`,
                  userName: decoded.userData.name || 'User'
                })
              });
              
              const emailResult = await emailResponse.json();
              
              if (emailResult.success) {
                emailSent = true;
                console.log('Email sent successfully:', emailResult.messageId);
              } else {
                emailError = emailResult.message;
                console.error('Email sending failed:', emailError);
              }
            } catch (emailErr) {
              emailError = emailErr.message;
              console.error('Email sending error:', emailErr);
            }
          } else {
            console.log('No email address available for sending report');
          }
        } else {
          pdfError = json.message || 'PDF generation failed';
        }
      } catch (e) {
        console.error('PDF generation error:', e);
        pdfError = e.message;
      }

      // Return an HTML page that shows email status and triggers download
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Payment Success</title></head><body style="font-family:system-ui;-webkit-font-smoothing:antialiased;">
        <div style="max-width:640px;margin:80px auto;text-align:center;">
          <h1>Payment Successful</h1>
          <p>Transaction ID: ${txnid || ''}</p>
          ${pdfUrl ? 
            `<div style="margin: 20px 0;">
              <p>Your report is ready!</p>
              ${emailSent ? 
                `<p style="color: green; font-weight: bold;">✓ Report sent to your email: ${decoded.userData?.email || ''}</p>` :
                decoded.userData?.email ? 
                  `<p style="color: orange;">⚠ Email delivery failed: ${emailError}</p>` :
                  `<p style="color: orange;">⚠ No email address provided</p>`
              }
              <p><a href="${pdfUrl}" target="_blank" style="background: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px;">Download PDF</a></p>
            </div>` : 
            pdfError ? 
              `<p style="color: red;">PDF generation failed: ${pdfError}</p><p>Please contact support with Transaction ID: ${txnid}</p>` :
              `<p>Your report is being prepared. Please wait...</p>`
          }
          <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 5px; font-size: 12px; text-align: left;">
            <strong>Debug Info:</strong><br>
            Plan Type: ${decoded.planType || productinfo}<br>
            Has User Data: ${decoded.userData ? 'Yes' : 'No'}<br>
            ${decoded.userData ? `User Name: ${decoded.userData.name || 'N/A'}<br>User Email: ${decoded.userData.email || 'N/A'}<br>` : ''}
            ${pdfError ? `PDF Error: ${pdfError}<br>` : ''}
            ${emailError ? `Email Error: ${emailError}<br>` : ''}
          </div>
        </div>
        <script>
          (function(){
            var pdf = ${JSON.stringify(pdfUrl)};
            if (pdf) {
              try {
                var a = document.createElement('a');
                a.href = pdf; a.download = '';
                document.body.appendChild(a); a.click();
              } catch (e) {
                console.error('Download failed:', e);
              }
              setTimeout(function(){ window.open(pdf, '_blank'); }, 300);
            }
            setTimeout(function(){ window.location = '/shubham?payment=success'; }, 5000);
          })();
        </script>
      </body></html>`;

      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    return NextResponse.json({ success: false, message: 'Payment failed' }, { status: 400 });
  } catch (error) {
    console.error('Payment success handler error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
