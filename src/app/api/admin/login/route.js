import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Find admin by email
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 400 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 400 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: "1d" });

    return new Response(JSON.stringify({ message: "Login successful", token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
