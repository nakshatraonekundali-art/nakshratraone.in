import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define protected routes that require admin authentication
  const isAdminRoute = path.startsWith('/admin') && path !== '/admin/login';

  // Get the token from cookies
  const token = request.cookies.get('adminToken')?.value;

  // If trying to access protected route without token, redirect to login
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};