'use client';
import { useState } from 'react';
import HeroBanner from '@/components/HeroBanner';
import { useDataStore } from '@/hooks/useDataStore';

const categories = ['Semua', 'Pemerintahan', 'Posyandu', 'UMKM', 'Pembangunan', 'Kegiatan Warga'];

export default function GaleriPage() {
  const [galeriData] = useDataStore('galeri');
  const [activeTab, setActiveTab] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState(null);

  // Map admin data format to public page format
  const galeri = (galeriData || []).map(item => ({
    id: item.id,
    title: item.judul,
    category: item.kategori,
    date: item.tanggal,
    image: item.url,
  }));

  const filteredGaleri = activeTab === 'Semua'
    ? galeri
    : galeri.filter((g) => g.category === activeTab);

  return (
    <main>
      <HeroBanner
        image="/images/hero-galeri.webp"
        eyebrow="Arsip Dokumentasi Kegiatan"
        title="Galeri Foto & Momen Penting"
        description="Rekaman peradaban, potret gotong royong warga, kegiatan keagamaan, serta rekapitulasi progres pembangunan infrastruktur di Desa Salamrejo."
        pills={[
          { label: 'Semua Album', href: '#album' },
          { label: 'Kegiatan Warga', href: '#album' },
        ]}
      />

      <div className="desa-container" style={{ paddingTop: 50, paddingBottom: 80 }} id="album">
        {/* Header & Tabs */}
        <div className="desa-section__head desa-section__head--center">
          <span className="desa-section__label">Dokumentasi Terkini</span>
          <h2 className="desa-section__title">Album Foto Kegiatan Desa</h2>
          <p className="desa-section__desc">Pilih kategori untuk memfilter galeri foto sesuai jenis kegiatan.</p>
        </div>

        {/* Category Pill Filters */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                background: activeTab === cat ? 'var(--desa-gold)' : '#FFF',
                color: activeTab === cat ? '#FFF' : 'var(--desa-ink)',
                border: '1px solid var(--desa-line)',
                padding: '10px 22px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: activeTab === cat ? '0 6px 20px rgba(212,136,42,0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="desa-grid desa-grid--3" style={{ gap: 24 }}>
          {filteredGaleri.map((item) => (
            <div
              key={item.id}
              className="desa-glass-card"
              onClick={() => setSelectedImage(item)}
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16/10',
                  backgroundImage: `url('${item.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.4s ease',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    background: 'rgba(20,12,8,0.75)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFF',
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: 50,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  {item.category}
                </span>
              </div>
              <div style={{ padding: 20 }}>
                <span style={{ fontSize: 12, color: 'var(--desa-muted)', display: 'block', marginBottom: 4 }}>
                  {item.date}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--desa-ink)', margin: 0, lineHeight: 1.4 }}>
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFF',
                borderRadius: 24,
                maxWidth: 800,
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div
                style={{
                  aspectRatio: '16/9',
                  backgroundImage: `url('${selectedImage.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div style={{ padding: 28 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--desa-gold)', letterSpacing: 1 }}>
                  {selectedImage.category.toUpperCase()} • {selectedImage.date}
                </span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--desa-ink)', margin: '8px 0 16px' }}>
                  {selectedImage.title}
                </h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="desa-btn-primary"
                  style={{ background: 'var(--desa-ink)', fontSize: 13, padding: '10px 22px' }}
                >
                  Tutup Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
