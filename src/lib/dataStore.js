/**
 * dataStore.js - Shared localStorage-based data store
 * 
 * Central data store that connects Admin Dashboard <-> Public Website.
 * Admin pages WRITE data here, Public pages READ data from here.
 * Data persists in browser localStorage (survives refresh).
 * 
 * When Supabase is ready, replace these functions with Supabase calls.
 */

// ==========================================
// DEFAULT DATA (Fallback when localStorage is empty)
// ==========================================

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

  galeri: [
    { id: 1, judul: 'Musyawarah Desa RPJMDes 2025-2030', kategori: 'Pemerintahan', url: '/images/hero-pemerintah.webp', tanggal: '2026-07-20' },
    { id: 2, judul: 'Kegiatan Posyandu Integrasi Layanan Primer', kategori: 'Posyandu', url: '/images/hero-posyandu.webp', tanggal: '2026-07-15' },
    { id: 3, judul: 'Bazar UMKM & Produk Olahan Tempe Warga', kategori: 'UMKM', url: '/images/hero-umkm.webp', tanggal: '2026-07-10' },
    { id: 4, judul: 'Pembangunan Jalan Tani Dusun Kedungrejo', kategori: 'Pembangunan', url: '/images/hero-profil.webp', tanggal: '2026-07-05' },
    { id: 5, judul: 'Gotong Royong Kebersihan Saluran Irigasi', kategori: 'Kegiatan Warga', url: '/images/hero-beranda.webp', tanggal: '2026-06-28' },
    { id: 6, judul: 'Penyaluran Bantuan Sosial Lansia', kategori: 'Pemerintahan', url: '/images/hero-posyandu.webp', tanggal: '2026-06-20' },
  ],

  potensiDesa: [
    {
      id: 1,
      nama: 'Sumber Preih',
      link: 'SUMBER PREH',
      kategori: 'Wisata Alam',
      deskripsi: 'Sumber Preih merupakan sebuah sumber mata air tersembunyi di Desa Salamrejo, Kabupaten Blitar yang menyuguhkan keasrian alam nan menyejukkan di bawah naungan rindangnya pohon preih, kenanga, dan pronojiwo yang telah kokoh berdiri menjaga sumber ini sejak sekitar satu setengah abad yang lalu. Di bawah kepungan pepohonan purba tersebut, mengalir sumber mata air jernih dan melimpah yang tidak hanya dimanfaatkan oleh warga untuk mandi sehari-hari, tetapi juga dialirkan langsung menuju rumah-rumah penduduk sekitar sebagai tumpuan kehidupan. Perpaduan antara keharuman dan keasrian pepohonan bernilai sejarah ini dengan kejernihan air alaminya menjadikan Sumber Preih sebuah ikon pedesaan yang memikat, terus mengalirkan kesegaran sekaligus menjaga kelestarian alam masyarakat Desa Salamrejo dari generasi ke generasi.',
    },
    {
      id: 2,
      nama: 'Sumber Petilasan',
      link: 'SUMBER KEDUNG KENDIL',
      kategori: 'Situs Sejarah',
      deskripsi: 'Petilasan Desa Salamrejo, Kabupaten Blitar, berdiri sebagai saksi bisu dan penanda sejarah kelam saat wilayah desa tersebut pernah tenggelam oleh luapan air di masa lampau. Didirikan tak lama setelah air surut, situs bersejarah ini tidak hanya berfungsi sebagai peringatan akan peristiwa monumental tersebut, tetapi juga berbatasan langsung dengan alir sungai yang menyimpan potensi besar untuk pengembangan konservasi batuan kali. Keberadaan petilasan ini menjadi jembatan antara memori kolektif masyarakat dan upaya pelestarian lingkungan, menjadikannya destinasi yang sarat akan nilai historis, edukasi geologi, serta pemeliharaan ekosistem sungai bagi Desa Salamrejo.',
    },
    {
      id: 3,
      nama: 'SDN Salamrejo',
      link: 'SDN SALAMREJO',
      kategori: 'Pendidikan',
      deskripsi: 'UPT SD Negeri Salamrejo merupakan lembaga pendidikan dasar negeri yang berdiri sejak 25 September 1974 dan terletak di Dusun Salamrejo, Desa Salamrejo, Kecamatan Binangun, Kabupaten Blitar, Jawa Timur. Sebagai salah satu pusat pendidikan formal tertua di tingkat desa, sekolah ini berkomitmen untuk menyelenggarakan proses pembelajaran yang inklusif, membina karakter peserta didik, serta mendukung pembentukan generasi muda yang berpengetahuan, dan berakhlak mulia. Didukung oleh tenaga pendidik yang berdedikasi serta lingkungan belajar pedesaan yang asri dan kondusif, UPT SD Negeri Salamrejo terus berperan aktif dalam mencerdaskan kehidupan anak bangsa dan menjadi fondasi utama pendidikan dasar bagi warga Desa Salamrejo dan sekitarnya.',
    },
    {
      id: 4,
      nama: 'Punden Jomblang',
      link: 'PUNDEN JOMBLANG',
      kategori: 'Spiritual',
      deskripsi: 'Punden Jomblang merupakan salah satu situs bernilai spiritual tinggi di Desa Salamrejo, Kabupaten Blitar yang sangat disakralkan dan dihormati oleh masyarakat setempat. Di area situs ini, berdiri kokoh pepohonan rindang seperti pohon preih dan kenanga yang menaungi sebuah sumur katrol tradisional, tempat warga sekitar kerap mengambil air untuk berbagai kebutuhan. Keberadaan tempat ini tidak hanya menjadi simbol penghormatan terhadap tradisi leluhur, tetapi juga berperan penting sebagai benteng alami dalam menjaga kelestarian lingkungan sekitarnya. Melalui kearifan lokal yang dijaga secara turun-temurun, Punden Jomblang berhasil menyatukan nilai spiritualitas, keasrian alam, dan warisan budaya yang terus lestari di Desa Salamrejo.',
    },
    {
      id: 5,
      nama: 'Petilasan Kiai Haji Salam',
      link: 'PETILASAN KIAI ABDUL SALAM',
      kategori: 'Spiritual',
      deskripsi: 'Petilasan Kyai Haji merupakan sebuah tempat bersejarah di Desa Salamrejo yang diawali dari kisah Kyai Haji Salam, sosok yang pertama kali membangun lokasi ini sebagai tempat persinggahan para pendahulu saat membuka lahan dan menebang tumbuhan di wilayah tersebut. Setelah Kyai Haji Salam berpindah, pengelolaan lahan ini diserahkan kepada Pak Imam dan kini berkembang menjadi pusat kegiatan keagamaan serta kebudayaan masyarakat setempat. Selain dimanfaatkan sebagai tempat beribadah dan lokasi rutin kegiatan spiritual setiap malam Jumat Pon, Petilasan Kyai Haji juga menjadi pusat penyelenggaraan tradisi bersih desa, menjadikannya simbol rasa syukur, penghormatan kepada leluhur, serta penguat tali silaturahmi warga Desa Salamrejo.',
    },
    {
      id: 6,
      nama: 'Kerajinan Batik & Wayang Golek',
      link: 'KERAJINAN BATIK DAN WAYANG GOLEK BAMBU KHAS SALAMREJO',
      kategori: 'Kerajinan',
      deskripsi: 'Kerajinan batik dan wayang golek menjadi salah satu identitas seni bernilai tinggi di Desa Salamrejo yang mengandung akan warisan sejarah dan kearifan lokal. Motif-motif batiknya diangkat langsung dari kisah nyata masa lalu yang dituangkan di atas lembaran kain, seperti Motif Mbah Yusuf yang telah berusia sekitar 50 tahun serta Motif Rakseso yang melambangkan mahkota, di mana keduanya membentuk satu kesatuan utuh karena keterikatan sejarahnya dan disertai Motif Gada sebagai simbol senjata peninggalan. Tak kalah unik, keahlian warga Desa Salamrejo juga terwujud dalam pembuatan wayang golek ramah lingkungan yang tidak dirakit menggunakan paku, melainkan memanfaatkan limbah kain dan bambu alami, menegaskan perpaduan sempurna antara pelestarian nilai historis dan kreativitas seni yang terus dijaga kelestariannya.',
    },
  ],

  agenda: [
    { id: 1, judul: 'Gotong Royong Bersih Desa', tanggal: '2026-08-05', jam: '07:00 WIB', lokasi: 'Seluruh Padukuhan', status: 'Akan Datang' },
    { id: 2, judul: 'Rapat Koordinasi RT/RW Triwulan', tanggal: '2026-08-12', jam: '19:30 WIB', lokasi: 'Balai Desa Salamrejo', status: 'Akan Datang' },
    { id: 3, judul: 'Pelatihan Kewirausahaan UMKM', tanggal: '2026-07-28', jam: '09:00 WIB', lokasi: 'Aula Kebudayaan', status: 'Selesai' },
  ],

  pengumuman: [
    { id: 1, judul: 'Musyawarah Desa Pembahasan RPJMDes 2025-2030', tanggal: '2026-07-20', kategori: 'Pemerintahan', status: 'Aktif', isi: '' },
    { id: 2, judul: 'Penyaluran BLT Dana Desa Tahap II Tahun 2026', tanggal: '2026-07-15', kategori: 'Sosial', status: 'Aktif', isi: '' },
    { id: 3, judul: 'Posyandu ILP Rutin Bulan Juli 2026', tanggal: '2026-07-10', kategori: 'Kesehatan', status: 'Aktif', isi: '' },
  ],

  danaDesa: [
    { id: 1, bidang: 'Pendapatan Asli Desa (PADes)', jenis: 'Pendapatan', jumlah: 'Rp 85.000.000', tahun: '2026' },
    { id: 2, bidang: 'Dana Desa (DD)', jenis: 'Pendapatan', jumlah: 'Rp 1.150.000.000', tahun: '2026' },
    { id: 3, bidang: 'Alokasi Dana Desa (ADD)', jenis: 'Pendapatan', jumlah: 'Rp 650.000.000', tahun: '2026' },
    { id: 4, bidang: 'Bidang Pembangunan Desa', jenis: 'Belanja', jumlah: 'Rp 920.000.000', tahun: '2026' },
    { id: 5, bidang: 'Bidang Penyelenggaraan Pemerintahan', jenis: 'Belanja', jumlah: 'Rp 540.000.000', tahun: '2026' },
  ],

  pembangunan: [
    { id: 1, proyek: 'Pengaspalan Jalan Dusun Salam', anggaran: 'Rp 350.000.000', progres: '85%', sumber: 'Dana Desa 2026' },
    { id: 2, proyek: 'Pembangunan Drainase RW 02 Karang', anggaran: 'Rp 120.000.000', progres: '100%', sumber: 'APBDes 2026' },
    { id: 3, proyek: 'Renovasi Posyandu Melati', anggaran: 'Rp 45.000.000', progres: '40%', sumber: 'Swadaya Masyarakat' },
  ],

  layanan: [
    { id: 1, nama: 'Surat Keterangan Usaha (SKU)', estimasi: '1 Hari Kerja', syarat: 'KTP, KK, Surat Pengantar RT/RW, Foto Tempat Usaha' },
    { id: 2, nama: 'Surat Keterangan Tidak Mampu (SKTM)', estimasi: '1 Hari Kerja', syarat: 'KTP, KK, Surat Pengantar RT/RW, Pernyataan Tidak Mampu' },
    { id: 3, nama: 'Surat Keterangan Domisili', estimasi: '1 Hari Kerja', syarat: 'KTP, KK, Surat Pengantar RT/RW' },
    { id: 4, nama: 'Pengantar SKCK', estimasi: '1 Hari Kerja', syarat: 'KTP, KK, Pas Foto 4x6 (2 lembar), Surat Pengantar RT/RW' },
  ],

  posyanduTimKesehatan: [
    { id: 1, role: 'Kepala UPT Puskesmas', name: 'Nanik Sri Suryati, S.ST.', badgeColor: '#F39C12', iconColor: '#F1C40F', desc: 'Memimpin penyelenggaraan pelayanan kesehatan masyarakat di wilayah UPT Puskesmas Binangun.' },
    { id: 2, role: 'Bidan Desa', name: 'Lutfiana D, A.Md.Keb.', badgeColor: '#27AE60', iconColor: '#2ECC71', desc: 'Memberikan pelayanan kesehatan ibu dan anak, KB, serta pendampingan kesehatan masyarakat desa.' },
    { id: 3, role: 'Perawat Desa', name: 'Indah Susiani, A.Md.Kep.', badgeColor: '#2980B9', iconColor: '#3498DB', desc: 'Memberikan pelayanan keperawatan, pertolongan pertama, serta mendukung program kesehatan desa.' },
    { id: 4, role: 'Tim Bina Wilayah', name: 'Niko Prasetyo, S.Farm.Apt.', badgeColor: '#8E44AD', iconColor: '#9B59B6', desc: 'Melakukan pembinaan, penyuluhan, dan pendampingan terpadu terhadap kader dan masyarakat.' },
    { id: 5, role: 'Tim Bina Wilayah', name: 'Wuri Tri Ariani', badgeColor: '#8E44AD', iconColor: '#9B59B6', desc: 'Melakukan pembinaan, penyuluhan, dan pendampingan terpadu terhadap kader dan masyarakat.' },
  ],

  posyanduKaderPos: [
    { id: 1, pos: 'Pos 1 — Balaidusun Salamrejo', lokasi: 'Balaidusun Salamrejo', kader: 'Sri W., Mala, Ratna, Endra, Suprihaten' },
    { id: 2, pos: 'Pos 2 — Balaidesa Salamrejo', lokasi: 'Balaidesa Salamrejo', kader: 'Astutik, Hindana, Tika, Dewi, Ti\'ah' },
    { id: 3, pos: 'Pos 3 — Rumah Bp. Slamet', lokasi: 'Rumah Bp. Slamet (Kader)', kader: 'Rindang, Semiati, Enik, Tri Y., Pipik' },
    { id: 4, pos: 'Pos 4 — Rumah Bp. Misirawan', lokasi: 'Rumah Bp. Misirawan', kader: 'Erna, Sulikah, Ana, Liana, Wiyanti' },
  ],

  posyanduKaderKhusus: [
    { id: 1, role: 'Kader TBC', name: 'Niken' },
    { id: 2, role: 'Kader Stunting', name: 'Binti, Miraten' },
    { id: 3, role: 'Kader PPKBD', name: 'Wiji' },
    { id: 4, role: 'Kader Jumantik', name: 'Sri Aseh' },
    { id: 5, role: 'Kader Jiwa', name: 'Misirawan' },
  ],

  kelembagaan: [
    { id: 1, nama: 'BPD (Badan Permusyawaratan Desa)', ketua: 'Drs. H. Mulyono', anggota: 9, bidang: 'Pengawasan & Peraturan Desa' },
    { id: 2, nama: 'LPMD (Lembaga Pemberdayaan Masyarakat Desa)', ketua: 'H. Sunardi', anggota: 12, bidang: 'Pembangunan Swadaya' },
    { id: 3, nama: 'PKK Desa Salamrejo', ketua: 'Hj. Endang Sukardi', anggota: 25, bidang: 'Kesejahteraan Keluarga' },
    { id: 4, nama: 'Karang Taruna Tunas Muda', ketua: 'Rian Hidayat', anggota: 30, bidang: 'Kepemudaan & Olahraga' },
  ],

  rtRw: [
    { id: 1, dukuh: 'Dusun Salamrejo', rw: '01', rt: '01', ketua: 'SUCIPTO', kontak: '' },
    { id: 2, dukuh: 'Dusun Salamrejo', rw: '01', rt: '02', ketua: 'ISNANTO', kontak: '' },
    { id: 3, dukuh: 'Dusun Salamrejo', rw: '01', rt: '03', ketua: 'AGUS SLAMET', kontak: '' },
    { id: 4, dukuh: 'Dusun Salamrejo', rw: '01', rt: '04', ketua: 'SUTAR WIYANTO', kontak: '' },
    { id: 5, dukuh: 'Dusun Salamrejo', rw: '02', rt: '01', ketua: 'HARTOKO', kontak: '' },
    { id: 6, dukuh: 'Dusun Salamrejo', rw: '02', rt: '02', ketua: 'MUHAIMIN', kontak: '' },
    { id: 7, dukuh: 'Dusun Salamrejo', rw: '02', rt: '03', ketua: 'SUGENG PURNOMO', kontak: '' },
    { id: 8, dukuh: 'Dusun Salamrejo', rw: '02', rt: '04', ketua: 'SUGENG ADIONO', kontak: '' },
    { id: 9, dukuh: 'Dusun Kedungrejo', rw: '01', rt: '01', ketua: 'M. ZAINAL ABIDIN', kontak: '' },
    { id: 10, dukuh: 'Dusun Kedungrejo', rw: '01', rt: '02', ketua: 'SUTIKNO', kontak: '' },
    { id: 11, dukuh: 'Dusun Kedungrejo', rw: '01', rt: '03', ketua: 'ZAINAL ABIDIN', kontak: '' },
    { id: 12, dukuh: 'Dusun Kedungrejo', rw: '01', rt: '04', ketua: 'SUGITO', kontak: '' },
  ],

  hero: {
    tagline: 'Selamat Datang di Portal Resmi',
    judulUtama: 'Desa Salamrejo',
    subJudul: 'Kapanewon Binangun, Kabupaten Blitar, Jawa Timur. Wujud transparansi, pelayanan publik cepat, serta sarana informasi terpadu masyarakat.',
    gambarBg: '/images/hero-beranda.webp',
    tombol1Text: 'Jelajahi Profil Desa',
    tombol1Link: '/profil-desa',
    tombol2Text: 'Layanan Mandiri',
    tombol2Link: '/layanan',
  },

  pengaturan: {
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


// ==========================================
// CORE FUNCTIONS
// ==========================================

const STORAGE_PREFIX = 'desa_salamrejo_';

/**
 * Get data for a specific store key.
 * Returns data from localStorage if available, otherwise returns default data.
 */
export function getData(key) {
  if (typeof window === 'undefined') return DEFAULTS[key] || [];
  
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn(`[dataStore] Error reading ${key}:`, e);
  }
  
  return DEFAULTS[key] || [];
}

/**
 * Save data for a specific store key to localStorage.
 */
export function saveData(key, data) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    // Dispatch custom event so other tabs/components can react
    window.dispatchEvent(new CustomEvent('desa-data-change', { detail: { key } }));
  } catch (e) {
    console.warn(`[dataStore] Error saving ${key}:`, e);
  }
}

/**
 * Reset a specific store key back to defaults.
 */
export function resetData(key) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_PREFIX + key);
  window.dispatchEvent(new CustomEvent('desa-data-change', { detail: { key } }));
}

/**
 * Reset ALL data back to defaults.
 */
export function resetAllData() {
  if (typeof window === 'undefined') return;
  Object.keys(DEFAULTS).forEach(key => {
    localStorage.removeItem(STORAGE_PREFIX + key);
  });
  window.dispatchEvent(new CustomEvent('desa-data-change', { detail: { key: '*' } }));
}

/**
 * Get all default keys.
 */
export function getStoreKeys() {
  return Object.keys(DEFAULTS);
}

export { DEFAULTS };

