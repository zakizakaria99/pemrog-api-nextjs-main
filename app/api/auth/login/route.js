export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", code: 400 },
        { status: 400 }
      );
    }

    // 2. Cari user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", code: 401 },
        { status: 401 }
      );
    }

    // 3. Cek password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", code: 401 },
        { status: 401 }
      );
    }

    // 4. Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5. Success response
    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Unauthorized", code: 500 },
      { status: 500 }
    );
  }
}
