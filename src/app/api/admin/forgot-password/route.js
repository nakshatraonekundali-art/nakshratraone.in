import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

let prismaSingleton = null;

function getPrismaClient() {
  if (prismaSingleton) return prismaSingleton;
  prismaSingleton = new PrismaClient();
  return prismaSingleton;
}

export async function POST(request) {
  try {
    const prisma = getPrismaClient();
    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'No account found with this email' },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Save token to database
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });

    // Create reset URL
    // Use window.location.origin from client or fallback to hardcoded URL
    const baseUrl = 'https://nakshatraone.in'; // Replace with your frontend URL
    const resetUrl = `${baseUrl}/admin/reset-password?token=${resetToken}`;

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nakshatraonekundali@gmail.com',
        pass: 'gbpt jcpz fuyg unds' // Gmail App Password
      }
    });

    // Email options
    const mailOptions = {
      from: 'nakshatraonekundali@gmail.com',
      to: email,
      subject: 'Password Reset Request - Nakshatra One Admin',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          <p>Hello ${admin.name},</p>
          <p>We received a request to reset your password for your Nakshatra One Admin account. Please click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #0f172a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Reset Password</a>
          </div>
          <p>This link will expire in 1 hour for security reasons.</p>
          <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
          <p>Best regards,<br>Nakshatra One Team</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
            &copy; 2024 Nakshatra One. All rights reserved.
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Password reset link sent to your email' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in forgot password:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}