'use client';
import HeroBanner from '@/components/HeroBanner';
import ProfileCard from '@/components/ProfileCard';

import { useDataStore } from '@/hooks/useDataStore';

export default function PemerintahanPage() {
  const [aparaturData] = useDataStore('aparatur');
  const [rtRwData] = useDataStore('rtRw');
  const [kelembagaanData] = useDataStore('kelembagaan');
  const [strukturCharts] = useDataStore('strukturCharts');

  // Helper to map and find aparatur by role keywords
  const getAparatur = (roleKeywords, defaultColor) => {
    const item = (aparaturData || []).find(a => 
      roleKeywords.some(keyword => a.jabatan.toLowerCase().includes(keyword.toLowerCase()))
    );
    return item ? { role: item.jabatan, name: item.nama, badgeColor: defaultColor, desc: '' } : null;
  };

  const kades = getAparatur(['kepala desa', 'lurah'], 'var(--desa-green)');
  const sekdes = getAparatur(['sekretaris', 'carik'], 'var(--desa-gold)');
  const kaurTu = getAparatur(['tu & umum', 'tata usaha'], '#F39C12');
  const kaurKeu = getAparatur(['keuangan'], '#27AE60');
  const kaurPer = getAparatur(['perencanaan'], '#2980B9');
  const kasiPem = getAparatur(['pemerintahan'], '#8E44AD');
  const kasiKes = getAparatur(['kesejahteraan'], '#E67E22');
  const kasiPel = getAparatur(['pelayanan'], '#16A085');
  const kamiSalam = getAparatur(['salamrejo'], '#34495E');
  const kamiKedung = getAparatur(['kedungrejo'], '#34495E');

  // Map RT/RW data
  const rwData = [];
  (rtRwData || []).forEach(item => {
    const title = `RW ${item.rw} ${item.dukuh}`;
    let rwGroup = rwData.find(g => g.title === title);
    if (!rwGroup) {
      rwGroup = {
        title, 
        badge: `RW ${item.rw}`, 
        badgeBg: item.dukuh.toLowerCase().includes('salamrejo') ? 'var(--desa-gold)' : 'var(--desa-green)',
        ketua: '-', // RW head not explicitly in data format, defaulting
        rt: []
      };
      rwData.push(rwGroup);
    }
    rwGroup.rt.push({ label: `RT ${item.rt} RW ${item.rw}`, ketua: item.ketua });
  });

  // Map Kelembagaan data
  const lembagaData = (kelembagaanData || []).map(item => {
    // Extract acronym if possible (e.g. "BPD (Badan...)")
    const match = item.nama.match(/^([A-Z]+)\s*\((.*)\)$/);
    return {
      title: match ? match[1] : item.nama,
      subtitle: match ? match[2] : item.bidang,
      color: 'var(--desa-gold)',
      members: [
        { role: 'Ketua', name: item.ketua },
        { role: 'Anggota', name: `${item.anggota} Orang` }
      ]
    };
  });

  return (
    <main>
      <HeroBanner
        image="/images/hero-pemerintah.webp"
        eyebrow="Tata Kelola & Kelembagaan"
        title="Aparatur & Pengurus Desa Salamrejo"
        description="Mengenal jajaran pamong desa, bagan hirarki SOTK, pengurus Rukun Tetangga (RT), Rukun Warga (RW), serta mitra lembaga pembangunan kemasyarakatan."
        pills={[
          { label: 'Struktur Organisasi (SOTK)', href: '#struktur' },
          { label: 'Pengurus RT & RW', href: '#rt-rw' },
          { label: 'Lembaga Kemasyarakatan', href: '#kelembagaan' },
        ]}
      />

      <div className="desa-container" style={{ paddingTop: 40, paddingBottom: 60 }}>

        {/* A. Interactive SOTK Hierarchy Tree */}
        <section id="struktur" className="desa-section">
          <div className="desa-section__head desa-section__head--center">
            <span className="desa-section__label">Bagan Tata Kerja</span>
            <h2 className="desa-section__title">Struktur Organisasi (SOTK) Desa</h2>
            <p className="desa-section__desc">Hirarki kepemimpinan dan pembagian wewenang aparatur Pemerintah Desa Salamrejo.</p>
          </div>

          <div className="desa-glass-card" style={{ padding: '40px 24px', overflowX: 'auto', marginBottom: 50 }}>
            {strukturCharts?.pemerintahan ? (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <img 
                  src={strukturCharts.pemerintahan} 
                  alt="Struktur Organisasi Pemerintahan Desa" 
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: 12 }} 
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
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>Placeholder Struktur Organisasi</h3>
                <p>Gambar chart struktur pemerintahan akan diletakkan di sini.</p>
              </div>
            )}
          </div>

          {/* Profil Aparatur Cards */}
          <div className="desa-section__head desa-section__head--center" style={{ marginBottom: 36 }}>
            <span className="desa-section__label">Jajaran Aparatur</span>
            <h3 className="desa-section__title">Profil & Tugas Pokok Aparatur Desa</h3>
            <p className="desa-section__desc">Rincian tugas dan fungsi masing-masing pengurus Pemerintah Desa Salamrejo.</p>
          </div>

          <div className="desa-grid desa-grid--auto">
            {aparaturData && aparaturData.map((item, i) => (
              <ProfileCard
                key={i}
                name={item.nama}
                role={item.jabatan}
                category="APARATUR DESA"
                description={item.tugas}
                badgeColor={'var(--desa-gold)'}
              />
            ))}
          </div>
        </section>

        {/* B. Daftar RT/RW */}
        <section id="rt-rw" className="desa-section desa-section--dark">
          <div className="desa-section__head">
            <span className="desa-section__label">Kepengurusan Lingkungan</span>
            <h2 className="desa-section__title">Daftar Ketua RT & RW Desa Salamrejo</h2>
            <p className="desa-section__desc">
              Struktur pengurus Rukun Tetangga (RT) dan Rukun Warga (RW) di wilayah Dusun Salamrejo & Kedungrejo.
            </p>
          </div>

          <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {rwData.map((rw, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 20, padding: 28,
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 16, paddingBottom: 12,
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                }}>
                  <h4 style={{ color: '#FFF', margin: 0, fontSize: 18, fontWeight: 700 }}>{rw.title}</h4>
                  <span style={{
                    background: rw.badgeBg, color: '#FFF', fontSize: 11,
                    fontWeight: 800, padding: '4px 10px', borderRadius: 50,
                  }}>
                    {rw.badge}
                  </span>
                </div>
                <p style={{ color: 'var(--desa-gold)', fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
                  Ketua RW: {rw.ketua}
                </p>
                <ul style={{ padding: 0, fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>
                  {rw.rt.map((rt, j) => (
                    <li key={j} style={{
                      padding: '8px 0',
                      borderBottom: j < rw.rt.length - 1 ? '1px dashed rgba(255,255,255,0.1)' : 'none',
                      display: 'flex', justifyContent: 'space-between',
                    }}>
                      <span>{rt.label}</span>
                      <strong>{rt.ketua}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* C. Kelembagaan */}
        <section id="kelembagaan" className="desa-section" style={{ marginTop: 60 }}>
          <div className="desa-section__head">
            <span className="desa-section__label">Mitra Pembangunan</span>
            <h2 className="desa-section__title">Lembaga Kemasyarakatan Desa</h2>
            <p className="desa-section__desc" style={{ maxWidth: 800 }}>
              Lembaga atau institusi desa merupakan wadah untuk mengemban tugas dan fungsi pemerintahan desa
              dalam rangka memberikan pelayanan, pemberdayaan, serta meningkatkan kesejahteraan masyarakat Desa Salamrejo.
            </p>
          </div>

          <div className="desa-grid desa-grid--auto">
            {lembagaData.map((org, i) => (
              <div key={i} className="desa-lembaga-card">
                <h3 className="desa-lembaga-card__title" style={{ color: org.color }}>{org.title}</h3>
                <p className="desa-lembaga-card__subtitle">{org.subtitle}</p>
                <ul className="desa-lembaga-card__list">
                  {org.members.map((m, j) => (
                    <li key={j}>
                      <span style={{ fontSize: 13 }}>{m.role}</span>
                      <strong>{m.name}</strong>
                    </li>
                  ))}
                </ul>
                {org.alamat && (
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--desa-line)' }}>
                    <p style={{ fontSize: 12, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.5 }}>
                      <strong>Alamat Sekretariat:</strong><br />{org.alamat}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
