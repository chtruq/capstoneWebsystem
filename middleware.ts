import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (token) {
    const decoded = jwtDecode<{ sub: string; role: string }>(token);

    // Define role-based access control
    const role = decoded.role;

    // Example: Only allow "admin" role to access /admin pages
    if (req.nextUrl.pathname.startsWith("/admin") && role !== "Admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } else {
    // Redirect to login if token is missing
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
