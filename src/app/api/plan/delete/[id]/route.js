import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    // Delete Plan
    await prisma.plan.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ message: "Plan deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
} 