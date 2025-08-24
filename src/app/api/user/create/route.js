import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, gender, birthDate, birthTime, birthCountry, birthCity, email, mobile } = body;

    // Validation
    if (!name || !gender || !birthDate || !birthTime || !birthCountry || !birthCity || !mobile) {
      return new Response(JSON.stringify({ message: "All required fields must be provided" }), { status: 400 });
    }

    // Create User
    const newUser = await prisma.user.create({
      data: {
        name,
        gender,
        birthDate: new Date(birthDate), // Convert to Date object
        birthTime,
        birthCountry,
        birthCity,
        email: email || null,
        mobile,
      },
    });

    return new Response(JSON.stringify({ message: "User created successfully", user: newUser }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
