import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Gunakan Service Key jika ada (lebih kuat), jika tidak gunakan Anon Key.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

// Sederhana in-memory rate limiting map
// Catatan: Pada Vercel (serverless), memory ini bisa ter-reset kapan saja tiap instance,
// namun cukup efektif untuk mencegah spam gila-gilaan pada waktu bersamaan.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 menit
const MAX_UPLOADS = 15; // Maksimal 15 upload per menit per IP

export async function POST(request) {
  try {
    // 1. Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;
    
    // Hapus data lama (Clean memory)
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.timestamp < windowStart) {
        rateLimitMap.delete(key);
      }
    }
    
    const userLimit = rateLimitMap.get(ip) || { count: 0, timestamp: now };
    if (userLimit.count >= MAX_UPLOADS) {
      return NextResponse.json({ error: 'Terlalu banyak unggahan (Rate Limit). Silakan tunggu sebentar sebelum mengunggah lagi.' }, { status: 429 });
    }
    rateLimitMap.set(ip, { count: userLimit.count + 1, timestamp: userLimit.timestamp });

    // 2. Parse Form Data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang diterima.' }, { status: 400 });
    }

    // 3. Validasi Ukuran File (Max 1MB)
    const MAX_SIZE = 1 * 1024 * 1024; // 1 MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Gagal! Ukuran gambar melebihi 1MB. Silakan kompres gambar Anda.' }, { status: 400 });
    }

    // 4. Siapkan File & Nama Unik
    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${safeName}`;
    
    // 5. Unggah ke Supabase Storage (Bucket "uploads")
    const { data, error } = await supabase
      .storage
      .from('uploads')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ error: 'Gagal mengunggah file ke Supabase. Pastikan Anda sudah membuat bucket "uploads" dan mengaturnya ke Public.' }, { status: 500 });
    }

    // 6. Ambil URL Publik
    const { data: publicUrlData } = supabase
      .storage
      .from('uploads')
      .getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan sistem internal.' }, { status: 500 });
  }
}
