import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Check if the route is an admin route
  if (request.nextUrl.pathname.startsWith('/admin-desa-salamrejo-2026')) {
    // Check for the admin_token cookie
    const adminToken = request.cookies.get('admin_token')?.value;

    // If there is no token or it's invalid (we check validity simply by existence here, 
    // the actual verification is done when setting the cookie, or we can add a secret signature check)
    if (adminToken !== 'authorized') {
      // Redirect to the login page
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin-desa-salamrejo-2026', '/admin-desa-salamrejo-2026/:path*'],
};
