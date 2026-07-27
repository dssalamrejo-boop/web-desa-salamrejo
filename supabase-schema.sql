-- ============================================
-- DESA SALAMREJO — Database Schema
-- Run this SQL in Supabase SQL Editor
-- ============================================

-- 1. Pengaturan Umum Desa
CREATE TABLE IF NOT EXISTS site_settings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default settings
INSERT INTO site_settings (key, value, category) VALUES
  ('nama_desa', 'Salamrejo', 'general'),
  ('kecamatan', 'Binangun', 'general'),
  ('kabupaten', 'Blitar', 'general'),
  ('provinsi', 'Jawa Timur', 'general'),
  ('alamat', 'Jln. Mangga No.55', 'general'),
  ('telepon', '0812-2882-0366', 'general'),
  ('whatsapp', '6281228820366', 'general'),
  ('email', 'desakentosono@gmail.com', 'general'),
  ('visi_akronim', 'SALAMREJO SATATA', 'visi_misi'),
  ('visi_kepanjangan', 'Sejahtera, Adil, Transparan, Akuntabel, Tentram, dan Amanah', 'visi_misi'),
  ('nama_kades', 'FAUZI', 'pejabat'),
  ('sambutan_kades', 'Assalamualaikum Wr. Wb. Puji syukur kehadirat Allah SWT...', 'pejabat')
ON CONFLICT (key) DO NOTHING;

-- 2. Aparatur Desa
CREATE TABLE IF NOT EXISTS aparatur_desa (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  deskripsi_tugas TEXT,
  foto_url TEXT,
  badge_color TEXT DEFAULT '#D4882A',
  urutan INT DEFAULT 0,
  aktif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RT & RW
CREATE TABLE IF NOT EXISTS rt_rw (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  dusun TEXT NOT NULL,
  rw TEXT NOT NULL,
  rt TEXT,
  ketua_nama TEXT NOT NULL,
  jenis TEXT DEFAULT 'rt', -- 'rw' or 'rt'
  urutan INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Lembaga Kemasyarakatan
CREATE TABLE IF NOT EXISTS lembaga (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nama_lembaga TEXT NOT NULL,
  nama_lengkap TEXT,
  color TEXT DEFAULT '#D4882A',
  anggota JSONB DEFAULT '[]',
  deskripsi TEXT,
  alamat TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Pengumuman
CREATE TABLE IF NOT EXISTS pengumuman (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  judul TEXT NOT NULL,
  isi TEXT,
  tanggal DATE DEFAULT CURRENT_DATE,
  kategori TEXT DEFAULT 'Umum',
  gambar_url TEXT,
  status TEXT DEFAULT 'aktif',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Agenda / Kegiatan
CREATE TABLE IF NOT EXISTS agenda (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  judul TEXT NOT NULL,
  tanggal DATE NOT NULL,
  waktu TEXT,
  tempat TEXT,
  deskripsi TEXT,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Produk UMKM
CREATE TABLE IF NOT EXISTS produk_umkm (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nama TEXT NOT NULL,
  deskripsi TEXT,
  harga TEXT,
  foto_url TEXT,
  pemilik TEXT,
  kontak_wa TEXT,
  jenis TEXT DEFAULT 'umkm', -- 'umkm' or 'bumdes'
  aktif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Tim Kesehatan Posyandu
CREATE TABLE IF NOT EXISTS posyandu_tim (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  deskripsi_tugas TEXT,
  foto_url TEXT,
  badge_color TEXT DEFAULT '#D4882A',
  icon_color TEXT DEFAULT '#D4882A',
  kategori TEXT DEFAULT 'tim_kesehatan', -- 'tim_kesehatan' or 'kader'
  pos TEXT, -- 'Pos 1', 'Pos 2', etc (for kader)
  urutan INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Jadwal Posyandu
CREATE TABLE IF NOT EXISTS posyandu_jadwal (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  pos TEXT NOT NULL,
  tanggal DATE NOT NULL,
  jam TEXT,
  jenis_kegiatan TEXT,
  keterangan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Galeri Foto
CREATE TABLE IF NOT EXISTS galeri (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  judul TEXT NOT NULL,
  gambar_url TEXT NOT NULL,
  kategori TEXT DEFAULT 'umum',
  tanggal DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Video Desa
CREATE TABLE IF NOT EXISTS video (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  judul TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Layanan Surat
CREATE TABLE IF NOT EXISTS layanan (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nama_layanan TEXT NOT NULL,
  persyaratan TEXT,
  prosedur TEXT,
  ikon TEXT DEFAULT '📄',
  aktif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Pembangunan
CREATE TABLE IF NOT EXISTS pembangunan (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  judul TEXT NOT NULL,
  status TEXT DEFAULT 'proses', -- 'proses', 'selesai', 'rencana'
  anggaran TEXT,
  tahun INT DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  lokasi TEXT,
  deskripsi TEXT,
  foto_url TEXT,
  progress INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Dana Desa
CREATE TABLE IF NOT EXISTS dana_desa (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tahun INT NOT NULL,
  kategori TEXT NOT NULL,
  jumlah BIGINT DEFAULT 0,
  keterangan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Slide / Hero Banner
CREATE TABLE IF NOT EXISTS slide (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  halaman TEXT NOT NULL, -- 'beranda', 'profil', 'pemerintahan', etc
  gambar_url TEXT,
  judul TEXT,
  link TEXT,
  urutan INT DEFAULT 0,
  aktif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Konten Halaman Statis
CREATE TABLE IF NOT EXISTS pages_content (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  title TEXT,
  content TEXT,
  urutan INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_slug, section_key)
);

-- ============================================
-- Enable Row Level Security (RLS)
-- Public read, authenticated write
-- ============================================
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE aparatur_desa ENABLE ROW LEVEL SECURITY;
ALTER TABLE rt_rw ENABLE ROW LEVEL SECURITY;
ALTER TABLE lembaga ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengumuman ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda ENABLE ROW LEVEL SECURITY;
ALTER TABLE produk_umkm ENABLE ROW LEVEL SECURITY;
ALTER TABLE posyandu_tim ENABLE ROW LEVEL SECURITY;
ALTER TABLE posyandu_jadwal ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeri ENABLE ROW LEVEL SECURITY;
ALTER TABLE video ENABLE ROW LEVEL SECURITY;
ALTER TABLE layanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE pembangunan ENABLE ROW LEVEL SECURITY;
ALTER TABLE dana_desa ENABLE ROW LEVEL SECURITY;
ALTER TABLE slide ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages_content ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view)
CREATE POLICY "Public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read" ON aparatur_desa FOR SELECT USING (true);
CREATE POLICY "Public read" ON rt_rw FOR SELECT USING (true);
CREATE POLICY "Public read" ON lembaga FOR SELECT USING (true);
CREATE POLICY "Public read" ON pengumuman FOR SELECT USING (true);
CREATE POLICY "Public read" ON agenda FOR SELECT USING (true);
CREATE POLICY "Public read" ON produk_umkm FOR SELECT USING (true);
CREATE POLICY "Public read" ON posyandu_tim FOR SELECT USING (true);
CREATE POLICY "Public read" ON posyandu_jadwal FOR SELECT USING (true);
CREATE POLICY "Public read" ON galeri FOR SELECT USING (true);
CREATE POLICY "Public read" ON video FOR SELECT USING (true);
CREATE POLICY "Public read" ON layanan FOR SELECT USING (true);
CREATE POLICY "Public read" ON pembangunan FOR SELECT USING (true);
CREATE POLICY "Public read" ON dana_desa FOR SELECT USING (true);
CREATE POLICY "Public read" ON slide FOR SELECT USING (true);
CREATE POLICY "Public read" ON pages_content FOR SELECT USING (true);

-- Authenticated write policies (only logged-in admin can modify)
CREATE POLICY "Auth write" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON aparatur_desa FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON rt_rw FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON lembaga FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON pengumuman FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON agenda FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON produk_umkm FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON posyandu_tim FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON posyandu_jadwal FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON galeri FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON video FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON layanan FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON pembangunan FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON dana_desa FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON slide FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON pages_content FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- Create Storage Bucket for uploads
-- ============================================
-- Run this separately in Supabase Dashboard → Storage
-- Bucket name: "uploads"
-- Public: Yes
