import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { to, subject, text, html, pdfUrl, pdfName, userName } = await request.json();

    // Validate required fields
    if (!to || !subject || !pdfUrl) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: to, subject, pdfUrl' },
        { status: 400 }
      );
    }

    // ✅ Use correct method name
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nakshatraonekundali@gmail.com',
        pass: 'gbpt jcpz fuyg unds' // Gmail App Password
      }
    });

    // Download PDF
    const pdfResponse = await fetch(pdfUrl);
    if (!pdfResponse.ok) throw new Error('Failed to download PDF');
    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Email options
    const mailOptions = {
      from: 'nakshatraonekundali@gmail.com',
      to,
      subject,
      text: text || `Hello ${userName || 'there'},\n\nYour Kundli report is attached.`,
      html: html || `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B5CF6;">Your Kundli Report</h2>
          <p>Hello ${userName || 'there'},</p>
          <p>Thank you for using NakshatraOne! Your personalized Kundli report is attached to this email.</p>
          <p>Best regards,<br><strong>NakshatraOne Team</strong></p>
        </div>
      `,
      attachments: [
        {
          filename: pdfName || 'kundli-report.pdf',
          content: Buffer.from(pdfBuffer),
          contentType: 'application/pdf'
        }
      ]
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
