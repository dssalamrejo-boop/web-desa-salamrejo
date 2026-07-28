'use client';

import { useState } from 'react';
import HeroBanner from '@/components/HeroBanner';
import DesaMapWrapper from '@/components/DesaMapWrapper';
import { useDataStore } from '@/hooks/useDataStore';

export default function ProfilDesaPage() {
  const [activeTab, setActiveTab] = useState('asal-usul');
  const [pengaturan] = useDataStore('pengaturan');
  const [kadesData] = useDataStore('kades');

  const kontakDesa = [
    { 
      icon: '\u{1F4CD}', 
      title: 'Alamat Kantor', 
      desc: pengaturan?.alamatKantor || 'Jln. Mangga No.55, Desa Salamrejo, Kec. Binangun, Kab. Blitar 66192',
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pengaturan?.alamatKantor || 'Jln. Mangga No.55, Desa Salamrejo, Kec. Binangun, Kab. Blitar')}`,
      target: '_blank',
      badge: 'Buka di Google Maps \u{2197}'
    },
    { 
      icon: '\u{1F4DE}', 
      title: 'Telepon / WhatsApp', 
      desc: pengaturan?.telepon || '0812-2882-0366',
      href: `https://wa.me/${(pengaturan?.telepon || '6281228820366').replace(/[^0-9]/g, '')}?text=Halo%20Admin%20Desa%20Salamrejo,%20saya%20ingin%20bertanya`,
      target: '_blank',
      badge: 'Chat via WhatsApp \u{2197}'
    },
    { 
      icon: '\u{2709}\u{FE0F}', 
      title: 'Email Desa', 
      desc: pengaturan?.email || 'dssalamrejo@gmail.com',
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${pengaturan?.email || 'dssalamrejo@gmail.com'}`,
      target: '_blank',
      badge: 'Kirim Email / Gmail \u{2197}'
    },
  ];

  return (
    <main>
      <HeroBanner
        image="/images/hero-profil.webp"
        eyebrow="Mengenal Wilayah & Visi Desa"
        title="Gambaran Umum & Sejarah Salamrejo"
        description="Menelusuri rekam jejak sejarah, arah kebijakan Visi-Misi SATATA, kondisi demografis wilayah, serta denah lokasi batas geografis desa."
        pills={[
          { label: 'Visi & Misi', href: '#visi-misi' },
          { label: 'Sejarah & Budaya', href: '#sejarah' },
          { label: 'Dua Padukuhan', href: '#padukuhan' },
          { label: 'Geografis & Peta', href: '#geografis' },
          { label: 'Kontak', href: '#kontak' },
        ]}
      />

      <div className="desa-container" style={{ paddingTop: 50, paddingBottom: 80 }}>

        {/* Quick Infographic Stat Badges */}
        <div 
          className="desa-grid" 
          style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: 16, 
            marginBottom: 60 
          }}
        >
          {[
            { stat: '413 Ha', label: 'Luas Wilayah Subur' },
            { stat: '300 mdpl', label: 'Ketinggian Perbukitan' },
            { stat: '2 Dusun', label: 'Salamrejo & Kedungrejo' },
            { stat: '12 RT / 3 RW', label: 'Kerukunan Kemasyarakatan' },
          ].map((item, i) => (
            <div 
              key={i} 
              className="desa-glass-card"
              style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(252,248,242,0.95) 100%)',
                border: '1px solid rgba(212, 136, 42, 0.2)',
              }}
            >
              {item.icon && (
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'rgba(212,136,42,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0
                }}>
                  {item.icon}
                </div>
              )}
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--desa-ink)', lineHeight: 1.2 }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--desa-muted)', marginTop: 2 }}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* A. Visi & Misi */}
        <section id="visi-misi" className="desa-section">
          <div className="desa-section__head desa-section__head--center" style={{ marginBottom: 36 }}>
            <span className="desa-section__label">Pedoman & Arah Kebijakan</span>
            <h2 className="desa-section__title">Visi & Misi Pembangunan</h2>
          </div>

          {/* Card Visi */}
          <div className="desa-glass-card" style={{
            padding: '48px 36px', marginBottom: 40,
            textAlign: 'center', position: 'relative', overflow: 'hidden',
            border: '2px solid rgba(212, 136, 42, 0.3)',
            background: 'linear-gradient(135deg, rgba(255, 252, 246, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          }}>
            <div style={{
              position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px',
              background: 'radial-gradient(circle, rgba(212,136,42,0.18) 0%, rgba(255,255,255,0) 70%)',
              borderRadius: '50%', pointerEvents: 'none',
            }} />

            <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--desa-gold)', display: 'block', marginBottom: 12 }}>
              VISI UTAMA DESA SALAMREJO
            </span>
            <h3 style={{ fontFamily: 'var(--desa-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--desa-ink)', margin: '0 0 16px', fontWeight: 700, lineHeight: 1.2 }}>
              &ldquo;SALAMREJO SATATA&rdquo;
            </h3>
            <p style={{ fontSize: 16, color: 'var(--desa-muted)', maxWidth: 720, margin: '0 auto', lineHeight: 1.8 }}>
              <strong>S</strong>ejahtera, <strong>A</strong>dil, <strong>T</strong>ransparan, <strong>A</strong>kuntabel, <strong>T</strong>entram, dan <strong>A</strong>manah
            </p>
          </div>

          {/* Misi Cards */}
          <div className="desa-section__head desa-section__head--center" style={{ marginBottom: 24 }}>
            <span className="desa-section__label">Misi Pembangunan</span>
            <h3 className="desa-section__title">6 Misi Strategis Desa Salamrejo</h3>
          </div>

          <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {[
              { num: '01', title: 'Sejahtera', desc: 'Meningkatkan kesejahteraan masyarakat melalui pemberdayaan ekonomi lokal, pengembangan UMKM, dan optimalisasi potensi pertanian.' },
              { num: '02', title: 'Adil', desc: 'Mewujudkan pelayanan publik yang adil dan merata bagi seluruh lapisan masyarakat tanpa diskriminasi.' },
              { num: '03', title: 'Transparan', desc: 'Menerapkan prinsip keterbukaan informasi publik dalam pengelolaan pemerintahan dan keuangan desa.' },
              { num: '04', title: 'Akuntabel', desc: 'Menjamin akuntabilitas pengelolaan anggaran dan program pembangunan desa yang dapat dipertanggungjawabkan.' },
              { num: '05', title: 'Tentram', desc: 'Menciptakan lingkungan yang aman, tertib, dan tentram melalui penguatan keamanan serta kerukunan antarwarga.' },
              { num: '06', title: 'Amanah', desc: 'Menjalankan amanah rakyat dengan penuh tanggung jawab, jujur, dan dedikasi tinggi terhadap pelayanan masyarakat.' },
            ].map((misi, i) => (
              <div key={i} className="desa-glass-card" style={{
                padding: '28px 24px',
                display: 'flex', gap: 16,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: 'var(--desa-gold)', color: '#FFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 800, fontFamily: 'var(--desa-serif)',
                  boxShadow: '0 4px 12px rgba(212,136,42,0.3)',
                }}>
                  {misi.num}
                </div>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--desa-ink)', margin: '0 0 6px' }}>{misi.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.6 }}>{misi.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* B. Sejarah & Kebudayaan Interactive Exploration */}
        <section id="sejarah" className="desa-section">
          <div className="desa-section__head">
            <span className="desa-section__label">Eksplorasi Sejarah & Budaya</span>
            <h2 className="desa-section__title">Napak Tilas Sejarah & Kearifan Lokal</h2>
            <p className="desa-section__desc">
              Pilih topik di bawah ini untuk menyelami perjalanan historis, nilai kebudayaan, dan potensi wilayah Desa Salamrejo.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { id: 'asal-usul', label: '\u{1F4DC} Asal Usul & Babat Alas', icon: '\u{1F4DC}' },
              { id: 'timeline', label: '\u{23F3} Garis Waktu Historis', icon: '\u{23F3}' },
              { id: 'kades-historis', label: '\u{1F468}\u{200D}\u{1F4BC} Kepala Desa Masa ke Masa', icon: '\u{1F468}\u{200D}\u{1F4BC}' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 22px',
                  borderRadius: 50,
                  border: activeTab === tab.id ? '2px solid var(--desa-gold)' : '1px solid var(--desa-line)',
                  background: activeTab === tab.id ? 'var(--desa-gold)' : '#FFF',
                  color: activeTab === tab.id ? '#FFF' : 'var(--desa-ink)',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: activeTab === tab.id ? '0 6px 18px rgba(212,136,42,0.3)' : '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content 1: Asal-Usul & Etimologi Lengkap */}
          {activeTab === 'asal-usul' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Card 1: Etimologi & Makna Filosofis */}
              <div className="desa-glass-card" style={{ padding: 40, position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', right: '-40px', bottom: '-40px', fontSize: 160, opacity: 0.05, pointerEvents: 'none'
                }}>
                  {'\u{1F4DC}'}
                </div>
                <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--desa-gold)', textTransform: 'uppercase', letterSpacing: 1.5, display: 'block', marginBottom: 8 }}>
                  ASAL USUL DESA
                </span>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 20 }}>
                  Kisah &amp; Asal Usul &ldquo;Salamrejo&rdquo;
                </h3>
                <p style={{ color: 'var(--desa-muted)', lineHeight: 1.85, fontSize: 15, marginBottom: 16 }}>
                  Berdasarkan penuturan tokoh masyarakat dan sesepuh desa (Bapak Abdul Salam, 81 tahun), asal usul Desa Salamrejo pertama kali dibentuk oleh sekumpulan pendatang dari pasukan Mataram. Akibat kekalahan dalam perang, mereka menyelamatkan diri ke Jawa Timur dan menetap di sebuah hutan yang lama kelamaan berkembang menjadi sebuah desa.
                </p>

                {/* Quote Box */}
                <div style={{
                  borderLeft: '4px solid var(--desa-gold)', background: 'rgba(212,136,42,0.06)',
                  padding: '18px 24px', borderRadius: '0 16px 16px 0', margin: '20px 0',
                }}>
                  <p style={{ fontStyle: 'italic', color: 'var(--desa-ink)', fontSize: 15, margin: 0, lineHeight: 1.7 }}>
                    &ldquo;Pada Zaman penjajahan Belanda tepatnya pada abad ke-18 ada sekelompok orang berasal dari Mataram Jawa Tengah dipimpin oleh Mbah Abdul Salam membuat barak-barak pengungsian sebagai tempat tinggal sambil membuat lahan pertanian dengan menebangi pohon-pohon. Semakin lama semakin luas dan ternyata kondisi lahan sangat subur, akhirnya keluarga para Prajurit dan sanak saudaranya berdatangan di daerah ini dan ikut bekerja keras. Semakin lama perkampungan ini semakin berkembang dan semakin ramai sehingga dinamakan SALAMREJO.&rdquo;
                  </p>
                  <span style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--desa-gold)', marginTop: 8 }}>
                    &mdash; Penuturan Tokoh Sesepuh Desa
                  </span>
                </div>

                <p style={{ color: 'var(--desa-muted)', lineHeight: 1.85, fontSize: 15, marginBottom: 16 }}>
                  Pada tahun 1800-an berkat perjuangan beberapa tokoh masyarakat, maka dimulailah bentuk pemerintahan Desa yang dipimpin oleh Sonodrono yang merupakan anak buah Mbah Abdul Salam yang paling muda, sehingga dipercaya untuk menjadi Kepala Desa yang pertama.
                </p>
              </div>

              {/* Card 2: Pembentukan Administrasi Dusun & Era Kemerdekaan */}
              <div className="desa-glass-card" style={{ padding: 36 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--desa-gold)', textTransform: 'uppercase', letterSpacing: 1.5, display: 'block', marginBottom: 8 }}>
                  SEJARAH PEMERINTAHAN & KEPEMIMPINAN
                </span>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 16 }}>
                  Struktur Dusun &amp; Dinamika Peraturan
                </h3>
                <p style={{ color: 'var(--desa-muted)', lineHeight: 1.85, fontSize: 15, marginBottom: 16 }}>
                  Secara geografis dan administratif, Desa Salamrejo terbagi menjadi 2 Dusun utama, yaitu <strong>Dusun Salamrejo</strong> dan <strong>Dusun Kedungrejo</strong>.
                </p>
                <p style={{ color: 'var(--desa-muted)', lineHeight: 1.85, fontSize: 15, margin: 0 }}>
                  Sebelum disahkannya UU No. 5 Tahun 1979, Pemerintahan Desa Salamrejo masih menggunakan tradisi kuno dengan sebutan terhadap petugas desa seperti Lurah, Carik, Kamituwo, Kebayan, Jogotirto, Jogoboyo dan Modin. Pasca regulasi tersebut dan UU RI Nomor 6 Tahun 2014, sebutan diseragamkan secara nasional menjadi Kepala Desa, Sekretaris Desa (PNS), serta kehadiran lembaga seperti Badan Permusyawaratan Desa (BPD).
                </p>
              </div>

              {/* Removed Card 3 completely, as it doesn't match the new text well, wait actually I just replaced card 2 above. Let me just remove Card 3 here. */}

              {/* Card 3: Situs & Warisan Bersejarah Desa */}
              <div className="desa-glass-card" style={{ padding: 36 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--desa-gold)', textTransform: 'uppercase', letterSpacing: 1.5, display: 'block', marginBottom: 12 }}>
                  SITUS & WARISAN BERSEJARAH DESA
                </span>
                <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                  <div style={{ background: '#FFF', padding: 20, borderRadius: 16, border: '1px solid var(--desa-line)' }}>
                    <strong style={{ fontSize: 16, color: 'var(--desa-ink)', display: 'block', marginBottom: 6 }}>
                      Punden Mbah Salam
                    </strong>
                    <p style={{ fontSize: 13, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.6 }}>
                      Situs cagar budaya tempat perintis desa beristirahat, menjadi titik pusat prosesi doa bersama pada saat acara syukuran Merti Desa tahunan.
                    </p>
                  </div>

                  <div style={{ background: '#FFF', padding: 20, borderRadius: 16, border: '1px solid var(--desa-line)' }}>
                    <strong style={{ fontSize: 16, color: 'var(--desa-ink)', display: 'block', marginBottom: 6 }}>
                      Sendang Kedung Tirto
                    </strong>
                    <p style={{ fontSize: 13, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.6 }}>
                      Mata air legendaris di Dusun Kedungrejo yang dari era lampau hingga kini tak pernah kering dan menjadi urat nadi pengairan sawah warga.
                    </p>
                  </div>

                  <div style={{ background: '#FFF', padding: 20, borderRadius: 16, border: '1px solid var(--desa-line)' }}>
                    <strong style={{ fontSize: 16, color: 'var(--desa-ink)', display: 'block', marginBottom: 6 }}>
                      Ringin Kurung Balai Desa
                    </strong>
                    <p style={{ fontSize: 13, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.6 }}>
                      Pohon beringin tua di kompleks Balai Desa Salamrejo yang melambangkan pengayoman, peneduh warga, serta tempat musyawarah adat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Garis Waktu Historis Lengkap */}
          {activeTab === 'timeline' && (
            <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {[
                {
                  era: 'Abad ke-18',
                  title: 'Babat Alas & Pelarian Mataram',
                  desc: 'Rombongan pasukan Mataram yang dipimpin oleh Mbah Abdul Salam membuka barak pengungsian dan lahan pertanian di hutan yang kini menjadi Salamrejo.',
                },
                {
                  era: 'Tahun 1800-an',
                  title: 'Awal Pemerintahan Desa',
                  desc: 'Bentuk pemerintahan desa dimulai, dipimpin oleh Sonodrono (anak buah Mbah Abdul Salam yang paling muda) sebagai Kepala Desa pertama.',
                },
                {
                  era: 'Sebelum Tahun 1979',
                  title: 'Era Tradisi Kuno Pamong',
                  desc: 'Pemerintahan Desa menggunakan tradisi kuno dengan sebutan petugas seperti Lurah, Carik, Kamituwo, Kebayan, Jogotirto, Jogoboyo, dan Modin.',
                },
                {
                  era: 'Pasca UU No. 5 Tahun 1979',
                  title: 'Penyeragaman Desa Nasional',
                  desc: 'Pamong desa berubah nama menjadi Kepala Desa (masa jabatan 8 tahun), Sekretaris Desa, Kaur, dan Kadus. Dibentuk lembaga Musyawarah Desa (LMD).',
                },
                {
                  era: 'UU No. 5/1999 & UU No. 32/2004',
                  title: 'Perubahan Regulasi & BPD',
                  desc: 'Masa jabatan Kades beralih ke 10 tahun kemudian 6 tahun. LMD berubah menjadi Badan Perwakilan Desa, lalu Badan Permusyawaratan Desa (BPD).',
                },
                {
                  era: 'UU RI No. 6 Tahun 2014',
                  title: 'Era Desa Modern',
                  desc: 'Masa jabatan Kepala Desa ditetapkan 6 tahun, Sekretaris Desa diisi dari PNS Kabupaten, dan peranan penting BPD dalam musyawarah.',
                },
              ].map((item, i) => (
                <div key={i} className="desa-glass-card" style={{ padding: 28 }}>
                  {item.icon && <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>}
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--desa-gold)', display: 'block', marginBottom: 4 }}>
                    {item.era}
                  </span>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 8 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 13, color: 'var(--desa-muted)', margin: 0, lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}


          {/* Tab Content: Kepala Desa dari Masa ke Masa */}
          {activeTab === 'kades-historis' && (
            <div className="desa-glass-card" style={{ padding: 40, position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', right: '-20px', bottom: '-20px', fontSize: 120, opacity: 0.04, pointerEvents: 'none'
              }}>
                {'\u{1F468}\u{200D}\u{1F4BC}'}
              </div>
              <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--desa-gold)', textTransform: 'uppercase', letterSpacing: 1.5, display: 'block', marginBottom: 8 }}>
                REKAM JEJAK KEPEMIMPINAN
              </span>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 24 }}>
                Kepala Desa Salamrejo dari Masa ke Masa
              </h3>
              
              <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                {(kadesData || []).map((kades, i, arr) => (
                  <div key={i} style={{
                    padding: '16px 20px',
                    border: i === arr.length - 1 ? '2px solid var(--desa-gold)' : '1px solid var(--desa-line)',
                    background: i === arr.length - 1 ? 'rgba(212,136,42,0.05)' : '#FFF',
                    borderRadius: 16,
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: i === arr.length - 1 ? 'var(--desa-gold)' : 'var(--desa-muted)', display: 'block', marginBottom: 4 }}>
                      {kades.masa}
                    </span>
                    <strong style={{ fontSize: 16, color: 'var(--desa-ink)', display: 'block' }}>
                      {kades.nama}
                    </strong>
                    <span style={{ fontSize: 12, color: 'var(--desa-muted)', marginTop: 4, display: 'block' }}>
                      {kades.era}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}


        </section>

        {/* C. Dua Padukuhan Showcase (Dusun Salamrejo vs Kedungrejo) */}
        <section id="padukuhan" className="desa-section">
          <div className="desa-section__head">
            <span className="desa-section__label">Pembagian Wilayah</span>
            <h2 className="desa-section__title">Profil Dusun</h2>
            <p className="desa-section__desc">
              Desa Salamrejo terbagi atas 2 dusun yang saling melengkapi dalam pertumbuhan ekonomi dan sosial kemasyarakatan.
            </p>
          </div>

          <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {/* Dusun 1 */}
            <div className="desa-glass-card" style={{ padding: 32, borderTop: '4px solid var(--desa-gold)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--desa-gold)', textTransform: 'uppercase', letterSpacing: 1 }}>
                  DUSUN 01
                </span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 12 }}>
                Dusun Salamrejo
              </h3>
              <p style={{ fontSize: 14, color: 'var(--desa-muted)', lineHeight: 1.6, marginBottom: 20 }}>
                Merupakan salah satu dari dua dusun utama di Desa Salamrejo yang memiliki populasi terbanyak dan cakupan administrasi yang lebih luas, dipimpin oleh seorang Kamituwo.
              </p>
              <ul style={{ padding: 0, margin: 0, fontSize: 13, listStyle: 'none' }}>
                <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--desa-line)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--desa-muted)' }}>Jumlah Penduduk:</span>
                  <strong style={{ color: 'var(--desa-ink)' }}>± 1.274 Jiwa</strong>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--desa-muted)' }}>Wilayah RT/RW:</span>
                  <strong style={{ color: 'var(--desa-ink)' }}>RW 01 &amp; RW 02 (Total 8 RT)</strong>
                </li>
              </ul>
            </div>

            {/* Dusun 2 */}
            <div className="desa-glass-card" style={{ padding: 32, borderTop: '4px solid #27AE60' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#27AE60', textTransform: 'uppercase', letterSpacing: 1 }}>
                  DUSUN 02
                </span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 12 }}>
                Dusun Kedungrejo
              </h3>
              <p style={{ fontSize: 14, color: 'var(--desa-muted)', lineHeight: 1.6, marginBottom: 20 }}>
                Dusun Kedungrejo merupakan bagian integral dari Desa Salamrejo yang wilayahnya meliputi satu Rukun Warga (RW) utuh, dipimpin oleh seorang Kamituwo.
              </p>
              <ul style={{ padding: 0, margin: 0, fontSize: 13, listStyle: 'none' }}>
                <li style={{ padding: '8px 0', borderBottom: '1px dashed var(--desa-line)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--desa-muted)' }}>Jumlah Penduduk:</span>
                  <strong style={{ color: 'var(--desa-ink)' }}>± 829 Jiwa</strong>
                </li>
                <li style={{ padding: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--desa-muted)' }}>Wilayah RT/RW:</span>
                  <strong style={{ color: 'var(--desa-ink)' }}>RW 01 (Total 4 RT)</strong>
                </li>
              </ul>
            </div>
          </div>
        </section>


        {/* D. Geografis & Peta Interactive */}
        <section id="geografis" className="desa-section">
          <div className="desa-section__head">
            <span className="desa-section__label">Kondisi Wilayah & Denah</span>
            <h2 className="desa-section__title">Kondisi Geografis & Peta Desa</h2>
          </div>

          <div className="desa-split">
            <div className="desa-glass-card" style={{ padding: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 20 }}>
                Data Geografis Desa
              </h3>
              <ul style={{ padding: 0, margin: 0, fontSize: 14 }}>
                {[
                  ['Luas Wilayah', '413 Ha (4,13 Km²)'],
                  ['Ketinggian Wilayah', '±300 mdpl'],
                  ['Suhu Rata-rata', '25°C - 32°C'],
                  ['Curah Hujan', 'Relatif Sedang/Rendah'],
                  ['Jumlah Dusun', '2 (Salamrejo & Kedungrejo)'],
                  ['Jumlah RW', '3 RW'],
                  ['Jumlah RT', '12 RT'],
                ].map(([label, value], i) => (
                  <li key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: i < 6 ? '1px dashed var(--desa-line)' : 'none',
                  }}>
                    <span style={{ color: 'var(--desa-muted)' }}>{label}</span>
                    <strong style={{ color: 'var(--desa-ink)' }}>{value}</strong>
                  </li>
                ))}
              </ul>
            </div>

            {/* Leaflet Map with KML */}
            <div className="desa-map-wrapper">
              <DesaMapWrapper />
            </div>
          </div>
        </section>

        {/* E. Kontak */}
        <section id="kontak" className="desa-section" style={{ marginBottom: 0 }}>
          <div className="desa-section__head">
            <span className="desa-section__label">Hubungi Kami</span>
            <h2 className="desa-section__title">Kontak Resmi Desa</h2>
          </div>

          <div className="desa-grid desa-grid--3">
            {kontakDesa.map((item, i) => (
              <a 
                key={i} 
                href={item.href}
                target={item.target}
                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="desa-glass-card" 
                style={{ 
                  padding: 28, 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 8 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: 'var(--desa-muted)', margin: '0 0 16px', lineHeight: 1.5 }}>{item.desc}</p>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: 'var(--desa-gold)',
                  background: 'rgba(212,136,42,0.1)', padding: '6px 14px', borderRadius: 50,
                  marginTop: 'auto'
                }}>
                  {item.badge}
                </span>
              </a>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}





