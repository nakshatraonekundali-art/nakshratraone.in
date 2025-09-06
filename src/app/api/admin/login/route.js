import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );

    // Remove password from response
    const { password: _, ...adminWithoutPassword } = admin;

    return NextResponse.json(
      { 
        success: true, 
        message: 'Login successful', 
        admin: adminWithoutPassword,
        token 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error logging in admin:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}