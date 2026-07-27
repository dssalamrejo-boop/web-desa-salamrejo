import { NextResponse } from 'next/server';

const ADMIN_PATH = (process.env.NEXT_PUBLIC_ADMIN_PATH || process.env.ADMIN_PATH || '/admin-desa-salamrejo-2026').replace(/\/$/, '');

function unauthorized() {
  return new NextResponse('Login admin diperlukan.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin Desa", charset="UTF-8"' },
  });
}

function isValidLogin(request) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) return false;

  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Basic ')) return false;

  try {
    const [inputUser, inputPass] = atob(auth.slice(6)).split(':');
    return inputUser === username && inputPass === password;
  } catch {
    return false;
  }
}

export default function proxy(request) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};


