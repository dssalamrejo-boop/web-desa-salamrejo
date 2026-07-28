'use client';
import HeroBanner from '@/components/HeroBanner';
import Link from 'next/link';
import { useDataStore } from '@/hooks/useDataStore';

const statistikDesa = [
  { label: 'Jumlah Penduduk', value: '1.889', sub: 'Jiwa Warga Desa' },
  { label: 'Jumlah Kepala Keluarga', value: '700', sub: 'KK Terdaftar' },
  { label: 'Luas Wilayah', value: '413 Ha', sub: 'Lahan Kering & Sawah' },
  { label: 'Wilayah RT / RW', value: '12 / 3', sub: '12 RT & 3 RW' },
];

const quickAccessItems = [
  {
    label: 'Layanan Surat', href: '/layanan', color: '#E67E22',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: 'Pemerintahan', href: '/pemerintahan', color: '#2980B9',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="22" x2="21" y2="22" />
        <line x1="6" y1="18" x2="6" y2="11" />
        <line x1="10" y1="18" x2="10" y2="11" />
        <line x1="14" y1="18" x2="14" y2="11" />
        <line x1="18" y1="18" x2="18" y2="11" />
        <polygon points="12 2 20 7 4 7 12 2" />
      </svg>
    ),
  },
  {
    label: 'Potensi Desa', href: '/umkm', color: '#27AE60',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22c1.25-1.25 2.5-2 4-2 2.5 0 3 2 5.5 2s3.5-2 6-2c1.5 0 2.75.75 4 2" />
        <path d="M12 2s3 3.5 3 8a3 3 0 0 1-6 0c0-4.5 3-8 3-8z" />
      </svg>
    ),
  },
  {
    label: 'Posyandu', href: '/posyandu', color: '#E74C3C',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: 'Profil Desa', href: '/profil-desa', color: '#8E44AD',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    label: 'Galeri Desa', href: '/galeri', color: '#16A085',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [heroData] = useDataStore('hero');
  const [pengumumanData] = useDataStore('pengumuman');
  const [pengaturanData] = useDataStore('pengaturan');

  // Map pengumuman data
  const beritaTerbaru = (pengumumanData || [])
    .filter(item => item.status !== 'Selesai')
    .slice(0, 3) // Get top 3 items
    .map(item => ({
      id: item.id,
      title: item.judul,
      date: item.tanggal,
      category: item.kategori,
      excerpt: item.isi ? item.isi.substring(0, 90) + '...' : 'Tidak ada keterangan.',
    }));

  return (
    <main>
      {/* 1. Hero Banner Fullwidth */}
      <HeroBanner
        variant="full"
        image={heroData?.gambarBg || "/images/hero-beranda.webp"}
        eyebrow={heroData?.tagline || "Portal Resmi \u{2022} Kec. Binangun, Kab. Blitar"}
        title={heroData?.judulUtama || "Portal Informasi & Pelayanan Desa Salamrejo"}
        description={heroData?.subJudul || "Pusat layanan publik digital, transparansi tata kelola pemerintahan, dan wadah informasi resmi bagi seluruh warga masyarakat Desa Salamrejo."}
        showVideoPreview={true}
        videoTitle="Profil Desa"
        actions={[
          { label: heroData?.tombol1Text || 'Ajukan Layanan Surat', href: heroData?.tombol1Link || '/layanan', variant: 'primary' },
          { label: heroData?.tombol2Text || 'Jelajahi Profil Desa \u{2192}', href: heroData?.tombol2Link || '/profil-desa', variant: 'secondary' },
        ]}
      />

      <div className="desa-container" style={{ paddingTop: 50 }}>

        {/* 2. Sambutan Kepala Desa */}
        <section id="sambutan-kades" className="desa-section">
          <div className="desa-glass-card" style={{
            padding: 48,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Ambient decorative glow */}
            <div style={{
              position: 'absolute', top: -60, right: -60,
              width: 260, height: 260,
              background: 'radial-gradient(circle, rgba(212, 136, 42, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
              borderRadius: '50%', pointerEvents: 'none',
            }} />

            <div className="desa-split">
              {/* Left: Sambutan */}
              <div>
                <span className="desa-section__label">Sambutan Kepala Desa</span>
                <h2 className="desa-section__title" style={{ marginBottom: 20 }}>
                  Selamat Datang di Portal Desa Salamrejo
                </h2>
                <p style={{ color: 'var(--desa-muted)', lineHeight: 1.8, fontSize: 15, marginBottom: 20 }}>
                  Assalamualaikum Wr. Wb. Puji syukur kehadirat Allah SWT, atas segala rahmat dan hidayah-Nya
                  sehingga Portal Resmi Desa Salamrejo dapat hadir sebagai media informasi dan komunikasi
                  yang transparan bagi seluruh warga masyarakat.
                </p>
                <p style={{ color: 'var(--desa-muted)', lineHeight: 1.8, fontSize: 15 }}>
                  Semoga kehadiran portal ini dapat menjadi jembatan informasi yang bermanfaat bagi
                  kemajuan dan kesejahteraan Desa Salamrejo.
                </p>

                {/* Profil Kades */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  marginTop: 28, paddingTop: 20,
                  borderTop: '1px dashed var(--desa-line)',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: 'var(--desa-gold)', color: '#FFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, fontWeight: 800, fontFamily: 'var(--desa-serif)',
                    boxShadow: '0 4px 12px rgba(212,136,42,0.3)',
                  }}>
                    {pengaturanData?.kepalaDesa ? pengaturanData.kepalaDesa.charAt(0).toUpperCase() : 'F'}
                  </div>
                  <div>
                    <strong style={{ fontSize: 16, color: 'var(--desa-ink)', display: 'block', textTransform: 'uppercase' }}>
                      {pengaturanData?.kepalaDesa || 'FAUZI'}
                    </strong>
                    <span style={{ fontSize: 12, color: 'var(--desa-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                      Kepala Desa Salamrejo
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Embedded Video / Visual Banner */}
              <div className="desa-glass-card" style={{
                aspectRatio: '16/9',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url(/images/hero-posyandu.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 12px 32px rgba(18, 10, 5, 0.15)',
                border: '2px solid rgba(212, 136, 42, 0.3)',
              }}>
                {/* Overlay to darken image */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
                }} />
                
                {/* Play Button */}
                <button 
                  onClick={() => {
                    if (pengaturanData?.videoProfil) {
                      window.open(pengaturanData.videoProfil, '_blank');
                    } else {
                      alert('Video profil desa belum ditambahkan oleh Admin.');
                    }
                  }}
                  style={{
                  position: 'relative', zIndex: 2,
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(212, 136, 42, 0.9)',
                  color: '#FFF', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(212, 136, 42, 0.4), 0 0 0 8px rgba(212, 136, 42, 0.2)',
                  cursor: 'pointer', transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(212, 136, 42, 0.5), 0 0 0 12px rgba(212, 136, 42, 0.2)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 136, 42, 0.4), 0 0 0 8px rgba(212, 136, 42, 0.2)'; }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 4 }}>
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </button>

                <div style={{
                  position: 'absolute', bottom: 20, left: 24, zIndex: 2, textAlign: 'left'
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--desa-gold)', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 4 }}>Tonton Video</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#FFF' }}>Profil Desa Salamrejo (2026)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Statistik Desa */}
        <section className="desa-section">
          <div className="desa-grid--4 desa-grid" style={{ gap: 20 }}>
            {statistikDesa.map((stat, i) => (
              <div key={i} className="desa-glass-card" style={{ padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--desa-gold)', fontFamily: 'var(--desa-serif)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--desa-ink)', marginTop: 4 }}>{stat.label}</div>
                <div style={{ fontSize: 12, color: 'var(--desa-muted)', marginTop: 2 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Berita & Pengumuman Terbaru */}
        <section className="desa-section">
          <div className="desa-section__head">
            <span className="desa-section__label">Informasi Terkini</span>
            <h2 className="desa-section__title">Berita & Pengumuman Desa</h2>
          </div>

          <div className="desa-grid desa-grid--3">
            {beritaTerbaru.length === 0 ? (
               <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: 'var(--desa-muted)' }}>
                  Belum ada informasi terbaru.
               </div>
            ) : beritaTerbaru.map((item) => (
              <article key={item.id} className="desa-post-card">
                <div className="desa-post-card__body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--desa-gold)', letterSpacing: 1 }}>
                      {(item.category || 'PENGUMUMAN').toUpperCase()}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--desa-muted)' }}>{item.date}</span>
                  </div>
                  <h3 className="desa-post-card__title">{item.title}</h3>
                  <p className="desa-post-card__excerpt">{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>

        </section>

        {/* 5. Quick Access Menu */}
        <section className="desa-section">
          <div className="desa-section__head desa-section__head--center">
            <span className="desa-section__label">Akses Cepat</span>
            <h2 className="desa-section__title">Layanan & Informasi</h2>
          </div>

          <div className="desa-grid desa-grid--3" style={{ gap: 20 }}>
            {quickAccessItems.map((item, i) => (
              <Link key={i} href={item.href} className="desa-glass-card" style={{
                padding: '24px 20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
              }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: `${item.color}15`,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--desa-ink)' }}>{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. Peta Lokasi Desa (Google Maps) */}
        <section className="desa-section">
          <div className="desa-section__head desa-section__head--center">
            <span className="desa-section__label">Peta Lokasi</span>
            <h2 className="desa-section__title">Lokasi Administratif Desa Salamrejo</h2>
            <p className="desa-section__desc">Peta navigasi menuju lokasi balai desa dan wilayah sekitarnya.</p>
          </div>
          <div className="desa-glass-card" style={{ padding: 12, borderRadius: 28 }}>
            <iframe
              title="Peta Desa Salamrejo Binangun Blitar"
              src="https://maps.google.com/maps?q=Desa%20Salamrejo%20Binangun%20Blitar&t=&z=14&ie=UTF8&iwloc=&output=embed"
              style={{ width: '100%', height: 450, borderRadius: 20, border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>

        {/* 7. CTA WhatsApp */}
        <section className="desa-section" style={{ marginBottom: 0 }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--desa-green) 0%, #7B3A1E 100%)',
            borderRadius: 28, padding: '48px 40px',
            textAlign: 'center', color: '#FFF',
          }}>
            <h2 style={{ fontFamily: 'var(--desa-serif)', fontSize: 32, marginBottom: 12 }}>
              Butuh Bantuan Pelayanan?
            </h2>
            <p style={{ fontSize: 16, opacity: 0.9, maxWidth: 500, margin: '0 auto 24px' }}>
              Hubungi kami melalui WhatsApp untuk informasi lebih lanjut mengenai layanan dan administrasi desa.
            </p>
            <a
              href={`https://wa.me/${(() => { const t = (pengaturanData?.telepon || '0812-2882-0366').replace(/[^0-9]/g, ''); return t.startsWith('0') ? '62' + t.slice(1) : t; })()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="desa-btn-primary"
              style={{ background: '#25D366', boxShadow: '0 6px 20px rgba(37,211,102,0.35)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 6 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.84L0 24l6.328-1.482C8.003 23.468 9.946 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.819 0-3.556-.475-5.076-1.306l-.364-.199-3.766.882.896-3.666-.226-.375C2.569 15.79 2 13.948 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
              Hubungi via WhatsApp
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}

