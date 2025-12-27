export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET book by ID
export async function GET(request, { params }) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", code: 400 },
        { status: 400 }
      );
    }

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", code: 404 },
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
      { success: false, error: "Unauthorized", code: 500 },
      { status: 500 }
    );
  }
}

// UPDATE book
export async function PUT(request, { params }) {
  try {
    const id = Number(params.id);
    const body = await request.json();
    const { title, author, year } = body;

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", code: 400 },
        { status: 400 }
      );
    }

    const existingBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", code: 404 },
        { status: 404 }
      );
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title: title ?? existingBook.title,
        author: author ?? existingBook.author,
        year: year ?? existingBook.year,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", code: 500 },
      { status: 500 }
    );
  }
}

// DELETE book (ADMIN only)
export async function DELETE(request, { params }) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", code: 400 },
        { status: 400 }
      );
    }

    const existingBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", code: 404 },
        { status: 404 }
      );
    }

    await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", code: 500 },
      { status: 500 }
    );
  }
}
