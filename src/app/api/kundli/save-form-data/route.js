import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./prisma/dev.db';
}
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      gender,
      month,
      day,
      year,
      hour,
      min,
      country,
      city,
      mobile,
      email,
      latitude,
      longitude,
      timezone
    } = body || {};

    // Only require minimal essentials; coerce the rest
    if (!name || !gender || !country || !city) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: name, gender, country, city required' },
        { status: 400 }
      );
    }

    const monthMap = {
      'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
      'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
    };

    const normalizeMonth = (m) => {
      if (typeof m === 'number') return Math.min(Math.max(m, 1), 12);
      if (!m) return 1;
      const trimmed = String(m).trim();
      if (/^\d+$/.test(trimmed)) {
        const num = parseInt(trimmed, 10);
        return num >= 1 && num <= 12 ? num : 1;
      }
      return monthMap[trimmed] || 1;
    };

    const safeMonth = normalizeMonth(month);
    const safeDay = parseInt(day, 10) || 1;
    const safeYear = parseInt(year, 10) || 2000;
    const safeHour = parseInt(hour, 10) || 0;
    const safeMin = parseInt(min, 10) || 0;

    const birthDate = new Date(Date.UTC(safeYear, safeMonth - 1, safeDay, safeHour, safeMin, 0));
    const birthTime = `${String(safeHour).padStart(2, '0')}:${String(safeMin).padStart(2, '0')}`;

    const fields = {
      name,
      gender,
      birthDate,
      birthTime,
      birthCountry: country,
      birthCity: city,
      mobile: mobile || null,
      latitude: typeof latitude === 'number' ? latitude : null,
      longitude: typeof longitude === 'number' ? longitude : null,
      timezone: typeof timezone === 'number' ? timezone : null,
    };

    const normalizedEmail = typeof email === 'string' && email.trim() !== '' ? email.trim() : null;

    let user;
    if (normalizedEmail) {
      user = await prisma.user.upsert({
        where: { email: normalizedEmail },
        update: fields,
        create: { ...fields, email: normalizedEmail }
      });
    } else {
      user = await prisma.user.create({
        data: { ...fields, email: null }
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('[save-form-data] Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


