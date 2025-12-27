export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all books
export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", code: 500 },
      { status: 500 }
    );
  }
}

// CREATE book
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, author, year } = body;

    if (!title || !author || !year) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", code: 400 },
        { status: 400 }
      );
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        year: Number(year),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", code: 500 },
      { status: 500 }
    );
  }
}
