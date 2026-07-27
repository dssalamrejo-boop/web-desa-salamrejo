import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { action, password } = await request.json();

    if (action === 'login') {
      const correctPassword = process.env.ADMIN_PASSWORD || 'salamrejo2026';
      
      if (password === correctPassword) {
        // Create response
        const response = NextResponse.json({ success: true });
        
        // Set HTTP-only cookie
        response.cookies.set({
          name: 'admin_token',
          value: 'authorized',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
        
        return response;
      } else {
        return NextResponse.json({ success: false, message: 'Kata sandi salah.' }, { status: 401 });
      }
    } 
    
    if (action === 'logout') {
      const response = NextResponse.json({ success: true });
      response.cookies.delete('admin_token');
      return response;
    }

    return NextResponse.json({ success: false, message: 'Aksi tidak valid.' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan.' }, { status: 500 });
  }
}
