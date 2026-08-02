'use client';
import HeroBanner from '@/components/HeroBanner';
import ProfileCard from '@/components/ProfileCard';
import { useDataStore } from '@/hooks/useDataStore';

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
          { label: 'Visi & Misi', href: '#visi-misi' },
          { label: 'Layanan & Alur', href: '#layanan' },
          { label: 'Tim & Kader', href: '#petugas' },
          { label: 'Lokasi & Jadwal', href: '#jadwal' },
        ]}
      />

      <div className="desa-container" style={{ paddingTop: 40, paddingBottom: 60 }}>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 1: Visi Misi & Tujuan (digabung dalam 1 blok) */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section id="visi-misi" className="desa-section">
          <div className="desa-section__head desa-section__head--center">
            <span className="desa-section__label">Landasan Pelayanan</span>
            <h2 className="desa-section__title">Visi &amp; Misi UPKD Salamrejo</h2>
          </div>

          {/* Visi + Tujuan side by side */}
          <div className="desa-split" style={{ gap: 24, marginBottom: 32, alignItems: 'stretch' }}>
            {/* Visi Card */}
            <div className="desa-glass-card" style={{
              padding: '40px 32px', flex: 1,
              textAlign: 'center', position: 'relative', overflow: 'hidden',
              border: '2px solid rgba(212, 136, 42, 0.3)',
              background: 'linear-gradient(135deg, rgba(255, 252, 246, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--desa-gold)', display: 'block', marginBottom: 10 }}>
                VISI
              </span>
              <h3 style={{ fontFamily: 'var(--desa-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--desa-ink)', margin: 0, fontWeight: 700, lineHeight: 1.3 }}>
                &ldquo;Kabupaten Blitar Berdaya dan Berjaya&rdquo;
              </h3>
            </div>

            {/* Tujuan ILP Card */}
            <div className="desa-glass-card" style={{
              padding: '32px 28px', flex: 1,
              border: '1px solid rgba(39, 174, 96, 0.2)',
              background: 'linear-gradient(135deg, rgba(39, 174, 96, 0.04) 0%, rgba(255,255,255,0.95) 100%)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: '#27AE60', display: 'block', marginBottom: 10 }}>
                TUJUAN POSYANDU ILP
              </span>
              <p style={{ fontSize: 15, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.8 }}>
                Mendekatkan akses layanan kesehatan dasar dan memperluas sasaran agar mencakup <strong style={{ color: 'var(--desa-ink)' }}>seluruh siklus hidup manusia</strong> — dari ibu hamil, bayi, remaja, dewasa, hingga lansia.
              </p>
            </div>
          </div>

          {/* Misi — compact horizontal list */}
          <div className="desa-glass-card" style={{ padding: '28px 32px' }}>
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--desa-gold)', display: 'block', marginBottom: 20 }}>
              3 MISI STRATEGIS
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { num: '01', title: 'Pelayanan Kesehatan Bermutu', desc: 'Memberikan pelayanan kesehatan masyarakat dan perorangan yang bermutu dan bernilai kompetensi tinggi.' },
                { num: '02', title: 'Kemitraan & Jejaring Faskes', desc: 'Mengembangkan kemitraan dan jejaring fasilitas pelayanan kesehatan dengan mengoptimalkan peran serta masyarakat dan swasta.' },
                { num: '03', title: 'Kapasitas SDM & Manajerial', desc: 'Meningkatkan kapasitas sumber daya manusia dan pengelolaan manajerial dengan mengoptimalkan potensi ganda.' },
              ].map((misi, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', paddingBottom: i < 2 ? 16 : 0, borderBottom: i < 2 ? '1px solid var(--desa-line)' : 'none' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: 'var(--desa-gold)', color: '#FFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, fontWeight: 800, fontFamily: 'var(--desa-serif)',
                  }}>{misi.num}</div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--desa-ink)', margin: '0 0 4px' }}>{misi.title}</h4>
                    <p style={{ fontSize: 13, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.6 }}>{misi.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 2: Sasaran, Alur 5 Meja & Layanan Pendukung   */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section id="layanan" className="desa-section">
          <div className="desa-section__head desa-section__head--center">
            <span className="desa-section__label">Program & Layanan</span>
            <h2 className="desa-section__title">Sasaran & Alur Pelayanan</h2>
          </div>

          {/* Sasaran berdasarkan Siklus Hidup — compact list inside 1 card */}
          <div className="desa-glass-card" style={{ padding: '28px 32px', marginBottom: 32 }}>
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--desa-gold)', display: 'block', marginBottom: 20 }}>
              SASARAN LAYANAN BERDASARKAN SIKLUS HIDUP
            </span>
            <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {[
                { emoji: '🤰', title: 'Ibu Hamil, Bersalin & Menyusui', desc: 'Pemeriksaan kehamilan, kelas ibu hamil, pemantauan gizi, dan pencegahan stunting.' },
                { emoji: '👶', title: 'Bayi dan Balita', desc: 'Penimbangan berat badan, imunisasi, pemantauan tumbuh kembang, dan deteksi dini masalah gizi.' },
                { emoji: '🎒', title: 'Anak Sekolah & Remaja', desc: 'Skrining kesehatan, edukasi gizi seimbang, pemeriksaan anemia, konseling kesehatan reproduksi.' },
                { emoji: '🧑', title: 'Usia Dewasa', desc: 'Skrining PTM: tekanan darah, gula darah, kolesterol, dan pengukuran lingkar perut.' },
                { emoji: '👴', title: 'Lansia', desc: 'Pemeriksaan berkala, deteksi penyakit degeneratif, senam lansia, dan konseling kesehatan jiwa.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{item.emoji}</span>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--desa-ink)', margin: '0 0 4px' }}>{item.title}</h4>
                    <p style={{ fontSize: 12.5, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alur 5 Meja — horizontal numbered steps */}
          <div className="desa-glass-card" style={{ padding: '28px 32px', marginBottom: 32 }}>
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--desa-gold)', display: 'block', marginBottom: 20 }}>
              ALUR 5 MEJA POSYANDU ILP
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {[
                { step: '1', title: 'Pendaftaran', desc: 'Mendaftarkan sasaran sesuai kelompok usia.' },
                { step: '2', title: 'Pengukuran', desc: 'Timbang BB, ukur TB, lingkar kepala & tekanan darah.' },
                { step: '3', title: 'Pencatatan & Skrining', desc: 'Catat hasil ke Buku KIA/KMS, skrining dasar.' },
                { step: '4', title: 'Pelayanan Kesehatan', desc: 'Imunisasi, vitamin A, tablet tambah darah.' },
                { step: '5', title: 'Penyuluhan & Validasi', desc: 'Edukasi kesehatan dan validasi data kunjungan.' },
              ].map((item, i) => (
                <div key={i} style={{
                  flex: '1 1 180px', padding: '16px 18px',
                  background: 'rgba(212,136,42,0.04)', borderRadius: 16,
                  border: '1px solid rgba(212,136,42,0.1)',
                  textAlign: 'center',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'var(--desa-gold)', color: '#FFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, fontWeight: 800, margin: '0 auto 10px',
                  }}>{item.step}</div>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 4 }}>{item.title}</h4>
                  <p style={{ fontSize: 11.5, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Peran Kader + Layanan Luar Gedung — side by side */}
          <div className="desa-split" style={{ gap: 24, alignItems: 'stretch' }}>
            {/* Peran Kader */}
            <div className="desa-glass-card" style={{ padding: '28px 24px', flex: 1 }}>
              <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: '#27AE60', display: 'block', marginBottom: 16 }}>
                PERAN & DUKUNGAN KADER
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>🎓</span>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--desa-ink)', margin: '0 0 4px' }}>Kompetensi Kader</h4>
                    <p style={{ fontSize: 13, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.6 }}>Pelatihan dasar 25 kompetensi kesehatan sesuai siklus hidup untuk petugas garda terdepan.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>🤝</span>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--desa-ink)', margin: '0 0 4px' }}>Penggerak Masyarakat</h4>
                    <p style={{ fontSize: 13, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.6 }}>Edukasi pola hidup bersih serta pemantauan kesehatan ibu, anak, dan lanjut usia secara berkala.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Layanan Luar Gedung */}
            <div className="desa-glass-card" style={{ padding: '28px 24px', flex: 1 }}>
              <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--desa-gold)', display: 'block', marginBottom: 16 }}>
                PENDUKUNG LAYANAN LUAR GEDUNG
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { emoji: '🤰', label: 'Kelas Ibu Hamil' },
                  { emoji: '👶', label: 'Kelas Ibu Balita' },
                  { emoji: '💉', label: 'Imunisasi' },
                  { emoji: '🏥', label: 'Kunjungan TBC, Gizi, Nifas, Bayi, Balita Stunting' },
                  { emoji: '🌿', label: 'TOGA (Tanaman Obat Keluarga)' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '8px 14px', borderRadius: 12,
                    background: 'rgba(212,136,42,0.04)',
                    border: '1px solid rgba(212,136,42,0.08)',
                  }}>
                    <span style={{ fontSize: 20 }}>{item.emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--desa-ink)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 3: Tim Kesehatan, Kader & Statistik            */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section id="petugas" className="desa-section">
          <div className="desa-section__head">
            <span className="desa-section__label">Tim Kesehatan</span>
            <h2 className="desa-section__title">Struktur UPKD & Tim Kesehatan</h2>
            <p className="desa-section__desc" style={{ maxWidth: 800 }}>
              Penanggung jawab teknis dari UPT Puskesmas Binangun serta jaringan Kader ILP di seluruh Posyandu.
            </p>
          </div>

          {/* Struktur Chart */}
          {strukturCharts?.posyandu ? (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
              <img
                src={strukturCharts.posyandu}
                alt="Struktur Posyandu dan Tim Kesehatan"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
              />
            </div>
          ) : (
            <div style={{
              width: '100%', minHeight: 300,
              background: 'rgba(0,0,0,0.03)', border: '2px dashed var(--desa-line)',
              borderRadius: 16, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--desa-muted)', marginBottom: 40
            }}>
              <span style={{ fontSize: 48, marginBottom: 16 }}>{'\u{1F4CA}'}</span>
              <h3 style={{ fontSize: 20, fontWeight: 700 }}>Placeholder Struktur Posyandu</h3>
              <p>Gambar chart struktur UPKD dan Posyandu akan diletakkan di sini.</p>
            </div>
          )}

          {/* Tim Kesehatan Profile Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24, marginBottom: 40
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

          {/* Kader ILP + Kader Khusus + Statistik — all in one flow */}
          <div className="desa-split" style={{ gap: 24, alignItems: 'flex-start' }}>
            {/* Left: Kader per Pos */}
            <div style={{ flex: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--desa-gold)', display: 'block', marginBottom: 16 }}>
                KADER ILP PER POS
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                {kaderPos?.map((item, idx) => (
                  <div key={idx} className="desa-glass-card" style={{ padding: '20px 22px' }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 6 }}>{item.pos}</h4>
                    <p style={{ color: 'var(--desa-muted)', fontSize: 13, marginBottom: 12 }}>📍 {item.lokasi}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {item.kader && item.kader.split(',').map((k, i) => (
                        <span key={i} style={{
                          background: 'rgba(211, 84, 0, 0.05)',
                          color: 'var(--desa-gold)',
                          padding: '3px 10px',
                          borderRadius: 16,
                          fontSize: 12.5,
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
            </div>

            {/* Right: Kader Khusus + Statistik */}
            <div style={{ flex: 1, minWidth: 260 }}>
              {/* Kader Khusus */}
              <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--desa-gold)', display: 'block', marginBottom: 16 }}>
                KADER LAYANAN KHUSUS
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                {kaderKhusus?.map((item, idx) => (
                  <div key={idx} style={{
                    padding: '10px 16px', borderRadius: 12,
                    background: 'rgba(212,136,42,0.04)',
                    border: '1px solid rgba(212,136,42,0.1)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--desa-gold)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {item.role}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--desa-ink)' }}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Statistik Sasaran */}
              <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--desa-gold)', display: 'block', marginBottom: 16 }}>
                STATISTIK SASARAN
              </span>
              {[
                { group: 'Balita (87 Anak)', data: ['Pos 1: 35', 'Pos 2: 14', 'Pos 3: 25', 'Pos 4: 13'] },
                { group: 'Lansia (690 Jiwa)', data: ['45-59: 310', '60-69: 227', '>70: 153'] },
              ].map((sasaran, i) => (
                <div key={i} style={{
                  padding: '14px 18px', borderRadius: 14, marginBottom: 10,
                  background: 'rgba(212,136,42,0.05)', border: '1px solid rgba(212,136,42,0.15)',
                }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: 'var(--desa-ink)' }}>{sasaran.group}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {sasaran.data.map((item, j) => (
                      <span key={j} style={{
                        fontSize: 12, fontWeight: 600, color: 'var(--desa-muted)',
                        background: '#FFF', padding: '3px 10px', borderRadius: 10,
                        border: '1px solid var(--desa-line)',
                      }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION 4: Lokasi & Jadwal (ringkas, 1 section saja)   */}
        {/* ═══════════════════════════════════════════════════════ */}
        <section id="jadwal" className="desa-section">
          <div className="desa-section__head desa-section__head--center">
            <span className="desa-section__label">Lokasi & Jadwal</span>
            <h2 className="desa-section__title">Lokasi Posyandu & Jadwal Rutin</h2>
          </div>

          <div className="desa-glass-card" style={{ padding: '28px 32px' }}>
            <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
              {[
                { pos: 'Pos 1', lokasi: 'Balai Dusun Salamrejo' },
                { pos: 'Pos 2', lokasi: 'Balai Desa' },
                { pos: 'Pos 3', lokasi: 'Rumah Bp. Slamet (Kader)' },
                { pos: 'Pos 4', lokasi: 'Rumah Bp. Misirawan' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px', borderRadius: 14,
                  background: 'rgba(212,136,42,0.04)',
                  border: '1px solid rgba(212,136,42,0.1)',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: 'var(--desa-gold)', color: '#FFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, fontWeight: 800,
                  }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--desa-ink)' }}>{item.pos}</div>
                    <div style={{ fontSize: 12, color: 'var(--desa-muted)', marginTop: 2 }}>📍 {item.lokasi}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: '16px 20px', borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(255, 252, 246, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
              border: '1px solid rgba(212, 136, 42, 0.15)',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <span style={{ fontSize: 28 }}>📅</span>
              <p style={{ fontSize: 14, color: 'var(--desa-muted)', lineHeight: 1.7, margin: 0 }}>
                Jadwal kegiatan Posyandu ILP dilaksanakan pada <strong style={{ color: 'var(--desa-ink)' }}>awal bulan</strong> dan akan diinformasikan melalui grup WhatsApp RT, Yasinan, dan media komunikasi desa lainnya.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
