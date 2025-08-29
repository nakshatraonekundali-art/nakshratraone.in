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
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')}/api/pdf/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userData: decoded.userData, planType: decoded.planType || productinfo })
        });
        const json = await res.json();
        if (json.success && json.pdf_url) {
          pdfUrl = json.pdf_url;
        }
      } catch (e) {
        // fall through; we'll still show success page
      }

      // Return an HTML page that triggers a download/open and then redirects
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>Payment Success</title></head><body style="font-family:system-ui;-webkit-font-smoothing:antialiased;">
        <div style="max-width:640px;margin:80px auto;text-align:center;">
          <h1>Payment Successful</h1>
          <p>Transaction ID: ${txnid || ''}</p>
          ${pdfUrl ? `<p>Your report is ready. Download should begin automatically. <a href="${pdfUrl}">Open PDF</a></p>` : `<p>Your report is being prepared.</p>`}
        </div>
        <script>
          (function(){
            var pdf = ${JSON.stringify(pdfUrl)};
            if (pdf) {
              try {
                var a = document.createElement('a');
                a.href = pdf; a.download = '';
                document.body.appendChild(a); a.click();
              } catch (e) {}
              setTimeout(function(){ window.open(pdf, '_blank'); }, 300);
            }
            setTimeout(function(){ window.location = '/shubham?payment=success'; }, 1200);
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
