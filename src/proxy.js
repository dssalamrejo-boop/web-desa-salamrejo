import { NextResponse } from 'next/server';

export default function proxy(request) {
  // Check if the route is an admin route
  if (request.nextUrl.pathname.startsWith('/admin-desa-salamrejo-2026')) {
    // Check for the admin_token cookie
    const adminToken = request.cookies.get('admin_token')?.value;

    // If there is no token or it's invalid
    if (adminToken !== 'authorized') {
      // Redirect to the login page
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-desa-salamrejo-2026', '/admin-desa-salamrejo-2026/:path*'],
};
