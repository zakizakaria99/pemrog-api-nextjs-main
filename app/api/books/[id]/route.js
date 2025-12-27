export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET book by ID
export async function GET(request, { params }) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid book ID", code: 400 },
        { status: 400 }
      );
    }

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found", code: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch book", code: 500 },
      { status: 500 }
    );
  }
}
