'use client';
import HeroBanner from '@/components/HeroBanner';
import ProfileCard from '@/components/ProfileCard';
import { useDataStore } from '@/hooks/useDataStore';

// Dynamic data loaded from store

const sasaranData = [
  { group: 'Balita (Total: 87 Anak)', data: ['Pos 1: 35 Anak', 'Pos 2: 14 Anak', 'Pos 3: 25 Anak', 'Pos 4: 13 Anak'] },
  { group: 'Lansia (Total: 690 Jiwa)', data: ['Usia 45-59: 310 Jiwa', 'Usia 60-69: 227 Jiwa', 'Usia >70: 153 Jiwa'] },
];

const siklus5Meja = [
  { icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ), title: 'Meja 1 — Pendaftaran', desc: 'Kader mencatat identitas anak/ibu dalam register dan KMS.' },
  { icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ), title: 'Meja 2 — Penimbangan', desc: 'Pengukuran berat badan, tinggi badan, dan lingkar lengan atas.' },
  { icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ), title: 'Meja 3 — Pencatatan', desc: 'Kader mencatat hasil pengukuran ke dalam buku register dan KMS.' },
  { icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ), title: 'Meja 4 — Penyuluhan', desc: 'Kader memberikan edukasi gizi, PHBS, dan penyuluhan kesehatan.' },
  { icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M12 8v4" />
        <path d="M10 10h4" />
      </svg>
    ), title: 'Meja 5 — Pelayanan Kesehatan', desc: 'Petugas kesehatan memberikan imunisasi, vitamin, dan pemeriksaan.' },
];

// metadata removed because this is a client component

export default function PosyanduPage() {
  const [strukturCharts] = useDataStore('strukturCharts');
  const [timKesehatan] = useDataStore('posyanduTimKesehatan');
  const [kaderPos] = useDataStore('posyanduKaderPos');
  const [kaderKhusus] = useDataStore('posyanduKaderKhusus');
  return (
    <main>
      <HeroBanner
        image="/images/hero-posyandu.webp"
        eyebrow="Layanan Kesehatan Masyarakat"
        title="Integrasi Layanan Primer (ILP) Posyandu"
        description="Fasilitas pelayanan kesehatan balita, remaja, usia produktif hingga lansia yang dikelola oleh tim medis UPT Puskesmas Binangun dan jaringan kader kesehatan desa."
        pills={[
          { label: 'Visi & Misi ILP', href: '#visi-misi' },
          { label: '5 Siklus ILP', href: '#profil' },
          { label: 'Tim Kesehatan & Kader', href: '#petugas' },
          { label: 'Jadwal Kegiatan', href: '#jadwal' },
        ]}
      />

      <div className="desa-container" style={{ paddingTop: 40, paddingBottom: 60 }}>

        {/* A0. Visi & Misi UPKD Salamrejo */}
        <section id="visi-misi" className="desa-section">
          <div className="desa-section__head desa-section__head--center">
            <span className="desa-section__label">Landasan Pelayanan</span>
            <h2 className="desa-section__title">Visi &amp; Misi UPKD Salamrejo</h2>
            <p className="desa-section__desc">Arah kebijakan dan komitmen pelayanan Unit Pelayanan Kesehatan Desa (UPKD) Salamrejo.</p>
          </div>

          {/* Visi Card */}
          <div className="desa-glass-card" style={{
            padding: '40px 32px', marginBottom: 32,
            textAlign: 'center', position: 'relative', overflow: 'hidden',
            border: '2px solid rgba(212, 136, 42, 0.3)',
            background: 'linear-gradient(135deg, rgba(255, 252, 246, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          }}>
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--desa-gold)', display: 'block', marginBottom: 10 }}>
              VISI UPKD SALAMREJO
            </span>
            <h3 style={{ fontFamily: 'var(--desa-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--desa-ink)', margin: 0, fontWeight: 700, lineHeight: 1.3 }}>
              &ldquo;Kabupaten Blitar Berdaya dan Berjaya&rdquo;
            </h3>
          </div>

          {/* Misi Grid */}
          <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {[
              {
                num: '01',
                title: 'Pelayanan Kesehatan Bermutu',
                desc: 'Memberikan Pelayanan Kesehatan masyarakat dan perorangan dalam rangka meningkatkan taraf hidup masyarakat yang bermutu dan bernilai kompetensi tinggi.'
              },
              {
                num: '02',
                title: 'Kemitraan & Jejaring Faskes',
                desc: 'Mengembangkan kemitraan dan jejaring fasilitas pelayanan kesehatan dengan mengoptimalkan peran serta masyarakat dan swasta dalam pelayanan kesehatan potensi generasi muda.'
              },
              {
                num: '03',
                title: 'Kapasitas SDM & Manajerial',
                desc: 'Meningkatkan kapasitas sumber daya manusia dan pengelolaan manajerial dengan mengoptimalkan potensi ganda.'
              },
            ].map((misi, i) => (
              <div key={i} className="desa-glass-card" style={{ padding: 28, display: 'flex', gap: 18 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: 'var(--desa-gold)', color: '#FFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 800, fontFamily: 'var(--desa-serif)',
                  boxShadow: '0 4px 14px rgba(212,136,42,0.3)',
                }}>
                  {misi.num}
                </div>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--desa-ink)', margin: '0 0 8px' }}>Misi {i + 1}: {misi.title}</h4>
                  <p style={{ fontSize: 13.5, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.65 }}>{misi.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="profil" className="desa-section">
          <div className="desa-section__head desa-section__head--center">
            <span className="desa-section__label">Alur Pelayanan</span>
            <h2 className="desa-section__title">5 Siklus Meja Posyandu ILP</h2>
            <p className="desa-section__desc">Setiap kegiatan Posyandu mengikuti alur pelayanan 5 meja yang terstandar.</p>
          </div>

          <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {siklus5Meja.map((meja, i) => (
              <div key={i} style={{
                background: '#FFF', border: '1px solid var(--desa-line)',
                borderRadius: 20, padding: '28px 20px', textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                transition: 'all 0.3s ease',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: 'rgba(212,136,42,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, margin: '0 auto 14px',
                }}>
                  {meja.icon}
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 8 }}>{meja.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--desa-muted)', lineHeight: 1.6, margin: 0 }}>{meja.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* B. Struktur UPKD & Tim Kesehatan */}
        <section id="petugas" className="desa-section">
          <div className="desa-section__head">
            <span className="desa-section__label">Tim Kesehatan</span>
            <h2 className="desa-section__title">Struktur UPKD & Tim Kesehatan Desa Salamrejo</h2>
            <p className="desa-section__desc" style={{ maxWidth: 800 }}>
              Penanggung jawab teknis dari UPT Puskesmas Binangun serta jaringan Kader ILP di seluruh Posyandu.
            </p>
          </div>

          {strukturCharts?.posyandu ? (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
              <img 
                src={strukturCharts.posyandu} 
                alt="Struktur Posyandu dan Tim Kesehatan" 
                style={{ maxWidth: 800, width: '100%', height: 'auto', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} 
              />
            </div>
          ) : (
            <div style={{
              width: '100%',
              minHeight: 400,
              background: 'rgba(0,0,0,0.03)',
              border: '2px dashed var(--desa-line)',
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--desa-muted)',
              marginBottom: 40
            }}>
              <span style={{ fontSize: 48, marginBottom: 16 }}>{'\u{1F4CA}'}</span>
              <h3 style={{ fontSize: 20, fontWeight: 700 }}>Placeholder Struktur Posyandu</h3>
              <p>Gambar chart struktur UPKD dan Posyandu akan diletakkan di sini.</p>
            </div>
          )}

          {/* Profil Tim Kesehatan (UPT Puskesmas, Bidan, Perawat) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            marginBottom: 40
          }}>
            {timKesehatan?.map((item, idx) => (
              <ProfileCard 
                key={idx}
                role={item.role}
                name={item.name}
                badgeColor={item.badgeColor || '#2980B9'}
                iconColor={item.iconColor || '#3498DB'}
                desc={item.desc}
                photoUrl={item.foto}
              />
            ))}
          </div>

        </section>

        {/* C. Daftar Kader Posyandu */}
        <section className="desa-section">
          <div className="desa-section__head">
            <span className="desa-section__label">Kader Posyandu</span>
            <h2 className="desa-section__title">Daftar Kader ILP</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {kaderPos?.map((item, idx) => (
              <div key={idx} className="desa-glass-card" style={{ padding: 24 }}>
                <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 8 }}>{item.pos}</h4>
                <p style={{ color: 'var(--desa-muted)', fontSize: 14, marginBottom: 16 }}>📍 {item.lokasi}</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {item.kader && item.kader.split(',').map((k, i) => (
                    <span key={i} style={{ 
                      background: 'rgba(211, 84, 0, 0.05)', 
                      color: 'var(--desa-gold)', 
                      padding: '4px 12px', 
                      borderRadius: 20, 
                      fontSize: 13, 
                      fontWeight: 600,
                      border: '1px solid rgba(211, 84, 0, 0.1)'
                    }}>
                      {k.trim()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Kader Khusus / Tambahan dari Admin */}
          <div className="desa-section__head" style={{ marginTop: 40 }}>
            <h3 className="desa-section__title" style={{ fontSize: 22 }}>Kader Layanan Khusus & Tambahan</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {kaderKhusus?.map((item, idx) => (
              <div key={idx} className="desa-glass-card" style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--desa-gold)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {item.role}
                </span>
                <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--desa-ink)' }}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          {/* Statistik Sasaran */}
          <div className="desa-section__head" style={{ marginTop: 60 }}>
            <h3 className="desa-section__title" style={{ fontSize: 22 }}>Statistik Sasaran ILP</h3>
          </div>
          <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {sasaranData.map((sasaran, i) => (
              <div key={i} style={{
                background: 'rgba(212,136,42,0.05)', border: '1px solid var(--desa-gold)',
                borderRadius: 20, padding: 24,
              }}>
                <h4 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700, color: 'var(--desa-ink)' }}>{sasaran.group}</h4>
                <ul style={{ padding: 0, margin: 0, fontSize: 15, color: 'var(--desa-muted)' }}>
                  {sasaran.data.map((item, j) => (
                    <li key={j} style={{
                      padding: '8px 0',
                      borderBottom: j < sasaran.data.length - 1 ? '1px dashed var(--desa-gold)' : 'none',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <span style={{ color: 'var(--desa-gold)' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* D. Jadwal Posyandu */}
        <section id="jadwal" className="desa-section">
          <div className="desa-section__head desa-section__head--center">
            <span className="desa-section__label">Jadwal Kegiatan</span>
            <h2 className="desa-section__title">Jadwal Posyandu ILP Rutin</h2>
            <p className="desa-section__desc">Jadwal kegiatan posyandu rutin dilaksanakan pada awal bulan dan akan dishare melalui grup WhatsApp RT dan Yasinan.</p>
          </div>
        </section>

      </div>
    </main>
  );
}
