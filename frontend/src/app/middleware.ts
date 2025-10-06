import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login", "/web/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("🔍 Pathname:", pathname);

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    console.log("✅ Public path accessed:", pathname);
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get("token")?.value;
  console.log("🍪 Token from cookie:", token);
  console.log("🌐 MIDDLEWARE Token from cookie:", token);

  if (!token) {
  console.log("No token — redirecting");
  return NextResponse.redirect(new URL("/login", request.url));
}


  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    console.log("🧠 Payload decoded:", payload);

    // Role-based access control
    if (pathname.startsWith("/dashboard/admin") && payload.role !== "Admin") {
      console.warn("🚫 Unauthorized role for admin page:", payload.role);
      return NextResponse.redirect(new URL("/web/login", request.url));
    }

    if (pathname.startsWith("/dashboard/student") && payload.role !== "Student") {
      console.warn("🚫 Unauthorized role for student page:", payload.role);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("✅ Access granted to:", pathname);
    return NextResponse.next();

  } catch (err) {
    console.error("❌ JWT verification failed:", err);
    return NextResponse.redirect(new URL("/web/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
