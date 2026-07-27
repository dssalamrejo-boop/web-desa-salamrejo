'use client';
import { useState } from 'react';
import HeroBanner from '@/components/HeroBanner';
import { useDataStore } from '@/hooks/useDataStore';

export default function PotensiDesaPage() {
  const [potensiData] = useDataStore('potensiDesa');
  const [activeId, setActiveId] = useState(null);

  const items = potensiData || [];

  // Category badge colors
  const categoryColors = {
    'Wisata Alam': { bg: '#E8F5E9', text: '#2E7D32', icon: '\u{1F3DE}\u{FE0F}' },
    'Situs Sejarah': { bg: '#FFF3E0', text: '#E65100', icon: '\u{1F3DB}\u{FE0F}' },
    'Pendidikan': { bg: '#E3F2FD', text: '#1565C0', icon: '\u{1F393}' },
    'Spiritual': { bg: '#F3E5F5', text: '#7B1FA2', icon: '\u{1F54C}' },
    'Kebudayaan': { bg: '#FCE4EC', text: '#C62828', icon: '\u{1F3AD}' },
    'Kerajinan': { bg: '#FFF8E1', text: '#F57F17', icon: '\u{1F3A8}' },
  };

  const getColor = (kat) => categoryColors[kat] || { bg: 'rgba(212,136,42,0.1)', text: 'var(--desa-gold)', icon: '\u{2B50}' };

  return (
    <main>
      <HeroBanner
        image="/images/hero-umkm.webp"
        eyebrow="Jelajahi Kekayaan Desa"
        title="Potensi Wisata & Kebudayaan"
        description="Temukan pesona alam, situs bersejarah, kearifan lokal, dan kerajinan khas yang menjadi kebanggaan warga Desa Salamrejo."
        pills={[
          { label: 'Wisata Alam', href: '#wisata-alam' },
          { label: 'Situs Sejarah', href: '#situs-sejarah' },
          { label: 'Kerajinan', href: '#kerajinan' },
        ]}
      />
      <div className="desa-container" style={{ paddingTop: 40, paddingBottom: 60 }}>

        {/* Quick Stats */}
        <div
          className="desa-grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 50,
          }}
        >
          {[
            { stat: items.length.toString(), label: 'Destinasi & Potensi', icon: '\u{1F3AF}' },
            { stat: '150+', label: 'Tahun Warisan Sejarah', icon: '\u{1F3DB}\u{FE0F}' },
            { stat: '2', label: 'Sumber Mata Air Alami', icon: '\u{1F4A7}' },
            { stat: '50+', label: 'Tahun Motif Batik Tertua', icon: '\u{1F3A8}' },
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
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'rgba(212,136,42,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0
              }}>
                {item.icon}
              </div>
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

        {/* Main Content */}
        <section id="potensi" className="desa-section">
          <div className="desa-section__head">
            <span className="desa-section__label">Destinasi & Warisan Budaya</span>
            <h2 className="desa-section__title">Potensi Unggulan Desa Salamrejo</h2>
            <p className="desa-section__desc">
              Klik pada setiap kartu untuk membaca deskripsi lengkap mengenai potensi wisata, situs bersejarah, dan kearifan lokal Desa Salamrejo.
            </p>
          </div>

          <div className="desa-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {items.map((item, i) => {
              const color = getColor(item.kategori);
              const isOpen = activeId === item.id;
              const hasImage = !!item.gambar;

              return (
                <div
                  key={item.id || i}
                  className="desa-glass-card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: isOpen ? '0 12px 40px rgba(0,0,0,0.12)' : undefined,
                  }}
                  onClick={() => setActiveId(isOpen ? null : item.id)}
                >
                  {/* Card Image */}
                  <div style={{
                    width: '100%',
                    height: 200,
                    background: hasImage
                      ? `url(${item.gambar}) center/cover no-repeat`
                      : `linear-gradient(135deg, ${color.bg} 0%, #FFF 100%)`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {/* Category Badge (overlay) */}
                    <div style={{
                      position: 'absolute', top: 14, left: 14,
                      background: 'rgba(255,255,255,0.92)',
                      backdropFilter: 'blur(8px)',
                      padding: '5px 14px', borderRadius: 50,
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <span style={{ fontSize: 14 }}>{color.icon}</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: color.text }}>
                        {item.kategori}
                      </span>
                    </div>

                    {/* Expand indicator */}
                    <div style={{
                      position: 'absolute', bottom: 14, right: 14,
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFF',
                      padding: '5px 12px', borderRadius: 50,
                      fontSize: 11, fontWeight: 700,
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      {isOpen ? 'Tutup' : 'Baca Selengkapnya'}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                        style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>

                    {/* Placeholder icon when no image */}
                    {!hasImage && (
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 56, opacity: 0.3,
                      }}>
                        {color.icon}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '20px 24px 16px' }}>
                    <h3 style={{
                      fontSize: 19, fontWeight: 700, color: 'var(--desa-ink)',
                      margin: '0 0 4px', lineHeight: 1.3,
                    }}>
                      {item.nama}
                    </h3>
                    {item.link && (
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        color: 'var(--desa-gold)',
                        textTransform: 'uppercase', letterSpacing: 1,
                      }}>
                        {item.link}
                      </span>
                    )}
                  </div>

                  {/* Expandable Description */}
                  <div style={{
                    maxHeight: isOpen ? 600 : 0,
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease',
                    padding: isOpen ? '0 24px 24px' : '0 24px 0',
                  }}>
                    <div style={{
                      borderTop: '1px solid var(--desa-line)',
                      paddingTop: 16,
                    }}>
                      <p style={{
                        fontSize: 14, color: 'var(--desa-muted)',
                        lineHeight: 1.8, margin: 0,
                        textAlign: 'justify',
                      }}>
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="desa-section" style={{ marginBottom: 0 }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--desa-green) 0%, #7B3A1E 100%)',
            borderRadius: 28, padding: '48px 40px',
            textAlign: 'center', color: '#FFF',
          }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 2, display: 'block', marginBottom: 12 }}>
              EKSPLORASI LEBIH LANJUT
            </span>
            <h2 style={{ fontFamily: 'var(--desa-serif)', fontSize: 28, marginBottom: 16 }}>
              Tertarik Mengunjungi Desa Salamrejo?
            </h2>
            <p style={{ opacity: 0.85, maxWidth: 600, margin: '0 auto 28px', lineHeight: 1.7 }}>
              Hubungi kami untuk informasi lebih lanjut mengenai destinasi wisata, situs sejarah, dan kerajinan khas Desa Salamrejo.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/profil-desa#sejarah"
                className="desa-btn-primary"
                style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}
              >
                {'\u{1F4DC}'} Baca Sejarah Desa
              </a>
              <a
                href="/galeri"
                className="desa-btn-primary"
                style={{ background: 'var(--desa-gold)', boxShadow: '0 6px 20px rgba(212,136,42,0.35)' }}
              >
                {'\u{1F4F7}'} Lihat Galeri Foto
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
