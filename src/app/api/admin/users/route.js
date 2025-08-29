import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://postgres.msduudmjcwojdkurqtln:Om@123456789@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true';
}
const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


