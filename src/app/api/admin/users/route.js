import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

let prisma;

function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

export async function GET() {
  try {
    const prisma = getPrisma();

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
