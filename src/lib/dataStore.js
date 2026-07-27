import { supabase } from './supabase';

const DEFAULTS = {
  aparatur: [
    { id: 1, nama: 'FAUZI', jabatan: 'Kepala Desa', nip: '-', foto: '/images/lurah.webp', status: 'Aktif', tugas: 'Menyelenggarakan Pemerintahan Desa, melaksanakan Pembangunan Desa, pembinaan kemasyarakatan Desa, dan pemberdayaan masyarakat Desa.' },
    { id: 2, nama: 'DIDIK HARIYANTO, SE.', jabatan: 'Sekretaris Desa', nip: '19780512 200501 1 003', foto: '/images/carik.webp', status: 'Aktif', tugas: 'Membantu Kepala Desa dalam bidang administrasi pemerintahan dan mengoordinasikan urusan perangkat desa lainnya.' },
    { id: 3, nama: 'WAHYU SANDHI F., S.Pd.', jabatan: 'Kaur TU & Umum', nip: '-', foto: '', status: 'Aktif', tugas: 'Melaksanakan urusan ketatausahaan, arsip, inventarisasi aset desa, dan administrasi umum lainnya.' },
    { id: 4, nama: 'SULISWANTO', jabatan: 'Kaur Keuangan', nip: '-', foto: '', status: 'Aktif', tugas: 'Melaksanakan pengelolaan keuangan desa, mulai dari penerimaan, pengeluaran, hingga penatausahaan pembukuan.' },
    { id: 5, nama: 'IMAM ROPINGI, S.P.', jabatan: 'Kaur Perencanaan', nip: '-', foto: '', status: 'Aktif', tugas: 'Menyusun rancangan RPJMDes, RKPDes, APBDes, serta mengevaluasi program pembangunan desa.' },
    { id: 6, nama: 'GUNAWAN WIBISONO, S.Pd.', jabatan: 'Kasi Pemerintahan', nip: '-', foto: '', status: 'Aktif', tugas: 'Membantu Kepala Desa dalam urusan tata praja, administrasi kependudukan, pertanahan, dan ketertiban desa.' },
    { id: 7, nama: 'MISIRAWAN', jabatan: 'Kasi Kesejahteraan', nip: '-', foto: '', status: 'Aktif', tugas: 'Melaksanakan pembangunan sarana prasarana perdesaan, pembinaan sosial, kesehatan, dan kesejahteraan masyarakat.' },
    { id: 8, nama: 'DEDI IRAWAN, S.A.P.', jabatan: 'Kasi Pelayanan', nip: '-', foto: '', status: 'Aktif', tugas: 'Melaksanakan penyuluhan masyarakat, pembinaan keagamaan, serta urusan administrasi pelayanan kemasyarakatan.' },
    { id: 9, nama: 'ERFENDI DWI SURIPNO', jabatan: 'Kamituwo Salamrejo', nip: '-', foto: '', status: 'Aktif', tugas: 'Membantu Kepala Desa dalam pembinaan dan pelayanan masyarakat di wilayah Dusun Salamrejo.' },
    { id: 10, nama: 'SUTOWO, S.Sos., M.A.P.', jabatan: 'Kamituwo Kedungrejo', nip: '-', foto: '', status: 'Aktif', tugas: 'Membantu Kepala Desa dalam pembinaan dan pelayanan masyarakat di wilayah Dusun Kedungrejo.' },
  ],

  kades: [
    { id: 1, nama: 'SONO DRONO', masa: '1872 – 1901', era: 'Era Orde Lama / Perintisan' },
    { id: 2, nama: 'MUSTARI', masa: '1901 – 1907', era: 'Era Orde Lama' },
    { id: 3, nama: 'WONO KARSO', masa: '1907 – 1911', era: 'Era Orde Lama' },
    { id: 4, nama: 'KARYO SETRO', masa: '1911 – 1914', era: 'Era Orde Lama' },
    { id: 5, nama: 'KARSO REDJO', masa: '1914 – 1917', era: 'Era Orde Lama' },
    { id: 6, nama: 'H. KASAN BOLAWI', masa: '1917 – 1919', era: 'Era Orde Lama' },
    { id: 7, nama: 'TOREDJO', masa: '1919 – 1920', era: 'Era Orde Lama' },
    { id: 8, nama: 'KS. BONAWI', masa: '1920 – 1924', era: 'Era Orde Lama' },
    { id: 9, nama: 'KS. BADERI', masa: '1924 – 1932', era: 'Era Orde Lama' },
    { id: 10, nama: 'ADMO SENTONO', masa: '1932 – 1950', era: 'Era Orde Lama' },
    { id: 11, nama: 'MARTO SARDJONO', masa: '1950 – 1974', era: 'Era Orde Baru' },
    { id: 12, nama: 'S. ALI MUSTOFA', masa: '1974 – 1978', era: 'Era Orde Baru' },
    { id: 13, nama: 'SOEPRAPTO', masa: '1978 – 1983', era: 'Era Orde Baru' },
    { id: 14, nama: 'SUHARDI', masa: '1983 – 1985', era: 'Era Orde Baru' },
    { id: 15, nama: 'S. YUDI EFFENDI', masa: '1985 – 1993', era: 'Era Orde Baru' },
    { id: 16, nama: 'SUHARDI', masa: '1993 – 1995', era: 'Era Orde Baru' },
    { id: 17, nama: 'WAGISO', masa: '1995 – 2003', era: 'Era Reformasi' },
    { id: 18, nama: 'S. SAMIDJIANTO', masa: '2003 – 2013', era: 'Era Reformasi' },
    { id: 19, nama: 'SUPRIYANTO', masa: '2013 – 2019', era: 'Era Reformasi' },
    { id: 20, nama: 'MUHDI ASTOMO, S.Sos.', masa: '2019 – 2019', era: 'Era Reformasi' },
    { id: 21, nama: 'FAUZI', masa: '2019 – 2025', era: 'Era Reformasi (Petahana)' },
  ],

  rtRw: [
    { id: 1, wilayah: 'Dusun Salamrejo', rt: '01', rw: '01', ketua: 'Bapak A' },
    { id: 2, wilayah: 'Dusun Salamrejo', rt: '02', rw: '01', ketua: 'Bapak B' },
    { id: 3, wilayah: 'Dusun Kedungrejo', rt: '01', rw: '02', ketua: 'Bapak C' },
    { id: 4, wilayah: 'Dusun Kedungrejo', rt: '02', rw: '02', ketua: 'Bapak D' },
  ],

  lembaga: [
    { id: 1, nama: 'BPD', kepanjangan: 'Badan Permusyawaratan Desa', color: '#16A085', anggota: ['Supriyanto (Ketua)', 'Ahmad (Wakil)', 'Budi (Anggota)'] },
    { id: 2, nama: 'LPMD', kepanjangan: 'Lembaga Pemberdayaan Masyarakat Desa', color: '#2980B9', anggota: ['Suryadi (Ketua)', 'Wawan (Anggota)'] },
    { id: 3, nama: 'PKK', kepanjangan: 'Pemberdayaan Kesejahteraan Keluarga', color: '#8E44AD', anggota: ['Ibu Ani (Ketua)', 'Ibu Ina (Anggota)'] },
    { id: 4, nama: 'Karang Taruna', kepanjangan: 'Karang Taruna Satya Bhakti', color: '#E67E22', anggota: ['Rizky (Ketua)', 'Deni (Anggota)'] },
  ],

  pengumuman: [
    { id: 1, tanggal: '2026-07-20', judul: 'Kerja Bakti Rutin Bulanan', isi: 'Dimohon seluruh warga hadir pada hari Minggu pagi di Balai Desa.' },
    { id: 2, tanggal: '2026-07-15', judul: 'Jadwal Posyandu Balita', isi: 'Posyandu diadakan serentak pada tanggal 18.' },
    { id: 3, tanggal: '2026-07-10', judul: 'Pencairan BLT Dana Desa', isi: 'Pencairan akan dilaksanakan di Balai Desa pada hari Kamis.' },
  ],

  agenda: [
    { id: 1, tanggal: '2026-08-17', waktu: '07:00', judul: 'Upacara Kemerdekaan RI ke-81', tempat: 'Lapangan Desa Salamrejo', status: 'Akan Datang' },
    { id: 2, tanggal: '2026-08-20', waktu: '19:00', judul: 'Malam Tirakatan Warga', tempat: 'Balai Desa Salamrejo', status: 'Akan Datang' },
  ],

  layanan: [
    { id: 1, nama: 'Surat Pengantar KTP', syarat: 'FC KK, Surat Pengantar RT/RW', ikon: '📄' },
    { id: 2, nama: 'Surat Keterangan Usaha (SKU)', syarat: 'FC KTP, FC KK, Foto Usaha', ikon: '🏢' },
    { id: 3, nama: 'Surat Keterangan Tidak Mampu', syarat: 'Surat Pengantar RT, FC KK', ikon: '🤝' },
    { id: 4, nama: 'Surat Keterangan Domisili', syarat: 'FC KTP Asal, Pengantar RT', ikon: '🏠' },
  ],

  pembangunan: [
    { id: 1, judul: 'Pengaspalan Jalan Dusun Kedungrejo', tahun: 2026, status: 'Proses 75%', sumber: 'Dana Desa', progres: 75 },
    { id: 2, judul: 'Rehabilitasi Saluran Irigasi', tahun: 2025, status: 'Selesai', sumber: 'Bantuan Kabupaten', progres: 100 },
    { id: 3, judul: 'Pembangunan Pagar Balai Desa', tahun: 2026, status: 'Rencana', sumber: 'Pendapatan Asli Desa', progres: 0 },
  ],

  danaDesa: [
    { id: 1, tahun: 2026, kategori: 'Penyelenggaraan Pemerintahan', jumlah: 350000000 },
    { id: 2, tahun: 2026, kategori: 'Pembangunan Desa', jumlah: 450000000 },
    { id: 3, tahun: 2026, kategori: 'Pembinaan Kemasyarakatan', jumlah: 120000000 },
    { id: 4, tahun: 2026, kategori: 'Pemberdayaan Masyarakat', jumlah: 180000000 },
    { id: 5, tahun: 2026, kategori: 'Penanggulangan Bencana', jumlah: 50000000 },
  ],

  umkm: [
    { id: 1, nama: 'Keripik Tempe Bu Susi', pemilik: 'Ibu Susi', produk: 'Keripik Tempe Aneka Rasa', kontak: '081234567890' },
    { id: 2, nama: 'Kopi Bubuk Salamrejo', pemilik: 'Pak Joko', produk: 'Kopi Bubuk Robusta Asli', kontak: '085678912345' },
    { id: 3, nama: 'Kerajinan Bambu', pemilik: 'Pak Wanto', produk: 'Tampah, Anyaman Bambu', kontak: '081987654321' },
  ],

  posyanduTimKesehatan: [
    { id: 1, role: 'Kepala UPT Puskesmas', name: 'Nanik Sri Suryati, S.ST.', badgeColor: '#F39C12', iconColor: '#F1C40F', desc: 'Memimpin penyelenggaraan pelayanan.' },
    { id: 2, role: 'Bidan Desa', name: 'Lutfiana D, A.Md.Keb.', badgeColor: '#27AE60', iconColor: '#2ECC71', desc: 'Memberikan pelayanan kesehatan ibu dan anak.' },
    { id: 3, role: 'Perawat Desa', name: 'Indah Susiani, A.Md.Kep.', badgeColor: '#2980B9', iconColor: '#3498DB', desc: 'Memberikan pelayanan keperawatan.' },
    { id: 4, role: 'Tim Bina Wilayah', name: 'Niko Prasetyo, S.Farm.Apt.', badgeColor: '#8E44AD', iconColor: '#9B59B6', desc: 'Pembinaan dan pendampingan kader.' },
    { id: 5, role: 'Tim Bina Wilayah', name: 'Wuri Tri Ariani', badgeColor: '#8E44AD', iconColor: '#9B59B6', desc: 'Pembinaan dan pendampingan kader.' },
  ],

  posyanduKaderPos: [
    { id: 1, pos: 'Pos 1 — Balaidusun Salamrejo', lokasi: 'Balaidusun Salamrejo', kader: 'Sri W., Mala, Ratna, Endra, Suprihaten' },
    { id: 2, pos: 'Pos 2 — Balaidesa Salamrejo', lokasi: 'Balaidesa Salamrejo', kader: 'Astutik, Hindana, Tika, Dewi, Ti\\'ah' },
    { id: 3, pos: 'Pos 3 — Rumah Bp. Slamet', lokasi: 'Rumah Bp. Slamet', kader: 'Rindang, Semiati, Enik, Tri Y., Pipik' },
    { id: 4, pos: 'Pos 4 — Rumah Bp. Misirawan', lokasi: 'Rumah Bp. Misirawan', kader: 'Erna, Sulikah, Ana, Liana, Wiyanti' },
  ],

  posyanduKaderKhusus: [
    { id: 1, role: 'Kader TBC', name: 'Niken' },
    { id: 2, role: 'Kader Stunting', name: 'Binti, Miraten' },
    { id: 3, role: 'Kader PPKBD', name: 'Wiji' },
    { id: 4, role: 'Kader Jumantik', name: 'Sri Aseh' },
    { id: 5, role: 'Kader Jiwa', name: 'Misirawan' },
  ],

  galeri: [
    { id: 1, judul: 'Pembangunan Jalan', src: '/images/hero-beranda.webp' },
    { id: 2, judul: 'Musrenbang 2026', src: '/images/hero-pemerintah.webp' },
    { id: 3, judul: 'Posyandu Balita', src: '/images/hero-posyandu.webp' },
    { id: 4, judul: 'Kegiatan UMKM', src: '/images/hero-umkm.webp' },
  ],

  infoDesa: {
    namaDesa: 'Salamrejo',
    kecamatan: 'Binangun',
    kabupaten: 'Blitar',
    provinsi: 'Jawa Timur',
    kepalaDesa: 'FAUZI',
    alamatKantor: 'Jln. Mangga No.55, Desa Salamrejo, Kec. Binangun, Kab. Blitar 66192',
    telepon: '0812-2882-0366',
    email: 'dssalamrejo@gmail.com',
    jamKerja: 'Senin - Jumat (08:00 - 15:30 WIB)',
    facebook: 'https://facebook.com/desasalamrejo',
    instagram: 'https://instagram.com/desasalamrejo',
    youtube: 'https://youtube.com/@desasalamrejo',
  },

  strukturCharts: {
    pemerintahan: '/images/struktur-pemerintahan.png',
    posyandu: '',
  },
};

const STORAGE_PREFIX = 'desa_salamrejo_';

// Synchronous local storage fallback (for initial render and backwards compatibility)
export function getDataSync(key) {
  if (typeof window === 'undefined') return DEFAULTS[key] || [];
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn(`[dataStore] Error reading ${key}:`, e);
  }
  return DEFAULTS[key] || [];
}

// Asynchronous fetch from Supabase
export async function getDataAsync(key) {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'store_' + key)
      .single();
    
    if (error) {
      if (error.code !== 'PGRST116') { // not found
        console.warn(`[Supabase] Error reading ${key}:`, error);
      }
      return getDataSync(key); // fallback
    }
    
    if (data?.value) {
      // Also cache to localstorage
      localStorage.setItem(STORAGE_PREFIX + key, data.value);
      return JSON.parse(data.value);
    }
  } catch (e) {
    console.error(`[Supabase] Catch error ${key}:`, e);
  }
  
  return getDataSync(key);
}

// Save data async to Supabase (and localstorage)
export async function saveData(key, data) {
  if (typeof window === 'undefined') return;
  
  const stringified = JSON.stringify(data);
  
  // 1. Save locally for instant UI update
  try {
    localStorage.setItem(STORAGE_PREFIX + key, stringified);
    window.dispatchEvent(new CustomEvent('desa-data-change', { detail: { key } }));
  } catch (e) {
    console.warn(`[dataStore] Error saving ${key}:`, e);
  }
  
  // 2. Save to Supabase in background
  try {
    await supabase.from('site_settings').upsert({
      key: 'store_' + key,
      value: stringified,
      category: 'datastore'
    }, { onConflict: 'key' });
  } catch (e) {
    console.error(`[Supabase] Error uploading ${key}:`, e);
  }
}

export function resetData(key) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_PREFIX + key);
  window.dispatchEvent(new CustomEvent('desa-data-change', { detail: { key } }));
}

export function resetAllData() {
  if (typeof window === 'undefined') return;
  Object.keys(DEFAULTS).forEach(key => {
    localStorage.removeItem(STORAGE_PREFIX + key);
  });
  window.dispatchEvent(new CustomEvent('desa-data-change', { detail: { key: '*' } }));
}

export function getStoreKeys() {
  return Object.keys(DEFAULTS);
}

export { DEFAULTS };
