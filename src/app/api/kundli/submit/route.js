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
      minute, 
      birthPlace,
      email,
      planId,
      mobile,
      latitude,
      longitude,
      timezone 
    } = body;

    // Validation
    if (!name || !gender || !month || !day || !year || !hour || !minute || !birthPlace || !mobile) {
      return new Response(JSON.stringify({ 
        message: "All required fields must be provided" 
      }), { status: 400 });
    }

    // Create birth date string
    const birthDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const birthTime = `${hour}:${minute}`;
    
    // Parse birth place
    const [birthCity, birthCountry] = birthPlace.split(',').map(s => s.trim());
    const finalBirthCity = birthCity || birthPlace;
    const finalBirthCountry = birthCountry || 'India';

    // Create User
    const newUser = await prisma.user.create({
      data: {
        name,
        gender,
        birthDate: new Date(birthDate),
        birthTime,
        birthCountry: finalBirthCountry,
        birthCity: finalBirthCity,
        email: email || null,
        mobile,
        latitude: latitude || null,
        longitude: longitude || null,
        timezone: timezone || 5.5,
      },
    });

    // If planId is provided, create UserPlan
    let userPlan = null;
    if (planId) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1); // 1 year plan

      userPlan = await prisma.userPlan.create({
        data: {
          userId: newUser.id,
          planId: parseInt(planId),
          startDate,
          endDate,
        },
      });
    }

    return new Response(JSON.stringify({ 
      message: "Kundli analysis submitted successfully", 
      user: newUser,
      userPlan: userPlan,
      analysisId: `KUNDLI_${newUser.id}_${Date.now()}`
    }), { status: 201 });

  } catch (error) {
    console.error('Error in kundli submission:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}