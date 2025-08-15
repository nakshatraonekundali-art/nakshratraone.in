import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: { id: "asc" }, // oldest to newest
    });

    return new Response(JSON.stringify({ plans }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
