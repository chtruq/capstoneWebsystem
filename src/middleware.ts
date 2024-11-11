import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("tokenaaaa", token);

  if (token) {
    const decoded = jwtDecode<{
      sub: string;
      [key: string]: any;
    }>(token);
    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    console.log(role);
    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin") && role !== "Admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    if (path.startsWith("/manager") && role !== "Management") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    if (path.startsWith("/staff") && role !== "Staff") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } else {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/manager/:path*", "/staff/:path*"],
};
