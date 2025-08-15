import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { planName, description, price } = body;

    // Validation
    if (!planName || !description || !price) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    // Create Plan
    const newPlan = await prisma.plan.create({
      data: { planName, description, price: Number(price) },
    });

    return new Response(JSON.stringify({ message: "Plan created successfully", plan: newPlan }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
