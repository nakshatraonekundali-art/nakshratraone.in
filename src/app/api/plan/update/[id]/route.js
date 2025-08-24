import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { planName, description, price } = body;

    // Validation
    if (!planName || !description || !price) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    // Update Plan
    const updatedPlan = await prisma.plan.update({
      where: { id: parseInt(id) },
      data: { 
        planName, 
        description, 
        price: Number(price) 
      },
    });

    return new Response(JSON.stringify({ message: "Plan updated successfully", plan: updatedPlan }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
} 