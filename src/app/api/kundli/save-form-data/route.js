import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
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
      latitude,
      longitude,
      timezone,
      email,
      mobile
    } = body;

    // Validation
    if (!name || !gender || month === 'MM' || day === 'DD' || year === 'YYYY' || 
        hour === 'HH' || min === 'MM') {
      return new Response(JSON.stringify({ 
        message: "All required fields must be provided",
        missingFields: {
          name: !name,
          gender: !gender,
          month: month === 'MM',
          day: day === 'DD',
          year: year === 'YYYY',
          hour: hour === 'HH',
          min: min === 'MM'
        }
      }), { status: 400 });
    }

    // Convert month name to number
    const monthMap = {
      'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
      'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
    };
    
    // Create birth date string
    const monthNum = monthMap[month] || 1;
    const birthDate = `${year}-${monthNum.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const birthTime = `${hour}:${min}`;
    
    // Parse birth place
    const birthCity = city || 'Unknown';
    const birthCountry = country || 'India';

    // Create User
    const newUser = await prisma.user.create({
      data: {
        name,
        gender,
        birthDate: new Date(birthDate),
        birthTime,
        birthCountry,
        birthCity,
        email: email || null,
        mobile: mobile || null,
        latitude: latitude || null,
        longitude: longitude || null,
        timezone: timezone || 5.5,
      },
    });

    return new Response(JSON.stringify({ 
      message: "Form data saved successfully", 
      user: newUser,
      analysisId: `KUNDLI_${newUser.id}_${Date.now()}`
    }), { status: 201 });

  } catch (error) {
    console.error('Error saving form data:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}