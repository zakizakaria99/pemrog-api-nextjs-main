// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // ✅ 1. BYPASS AUTH ROUTES (INI KUNCINYA)
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // 2. Ambil token
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, error: "Unauthorized", code: 401 },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // 3. Verifikasi token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // 4. ADMIN only route
    if (pathname.startsWith("/api/users")) {
      if (payload.role !== "ADMIN") {
        return NextResponse.json(
          { success: false, error: "Forbidden: Admin only", code: 403 },
          { status: 403 }
        );
      }
    }

    return NextResponse.next();

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid token", code: 401 },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
