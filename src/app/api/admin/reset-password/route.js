import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

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
    const { token, password } = body;

    // Validation
    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: 'Token and password are required' },
        { status: 400 }
      );
    }

    // Find admin by reset token
    const admin = await prisma.admin.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date() // Token must not be expired
        }
      }
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update admin with new password and clear reset token
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    return NextResponse.json(
      { success: true, message: 'Password has been reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in reset password:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}