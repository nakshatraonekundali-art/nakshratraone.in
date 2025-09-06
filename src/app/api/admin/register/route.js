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
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    // Check if admin with this email already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: 'Admin with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    // Remove password from response
    const { password: _, ...adminWithoutPassword } = admin;

    return NextResponse.json(
      { success: true, message: 'Admin registered successfully', admin: adminWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering admin:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}