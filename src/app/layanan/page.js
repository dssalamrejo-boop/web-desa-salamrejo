'use client';
import { useDataStore } from '@/hooks/useDataStore';

export default function LayananSuratPage() {
  const [layananData] = useDataStore('layanan');
  const items = layananData || [];

  return (
    <main>
      <div className="desa-page-header" style={{
        background: 'linear-gradient(135deg, var(--desa-ink) 0%, #1A2530 100%)',
        borderBottom: '4px solid var(--desa-gold)',
        padding: '80px 20px 60px',
        textAlign: 'center',
        color: '#FFF'
      }}>
        <h1 style={{ fontSize: 36, fontFamily: 'var(--desa-serif)', marginBottom: 16 }}>
          Layanan Administrasi & Surat
        </h1>
        <p style={{ opacity: 0.9, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          Daftar layanan administrasi persuratan yang disediakan oleh Pemerintah Desa Salamrejo beserta estimasi waktu dan persyaratan yang dibutuhkan.
        </p>
      </div>

      <div className="desa-container" style={{ padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {items.map((item) => (
            <div key={item.id} className="desa-glass-card" style={{ padding: 30 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(212,136,42,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  {'\u{1F4C4}'}
                </div>
                <span style={{ background: 'rgba(212,136,42,0.1)', color: 'var(--desa-gold)', padding: '6px 14px', borderRadius: 50, fontSize: 12, fontWeight: 700 }}>
                  {item.estimasi}
                </span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--desa-ink)', marginBottom: 16, lineHeight: 1.3 }}>
                {item.nama}
              </h3>
              
              <div style={{ borderTop: '1px solid var(--desa-line)', paddingTop: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--desa-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Persyaratan Dokumen:
                </div>
                <ul style={{ paddingLeft: 20, margin: 0, color: 'var(--desa-ink)', lineHeight: 1.7, fontSize: 14 }}>
                  {item.syarat.split(',').map((syarat, idx) => {
                    const cleanSyarat = syarat.trim();
                    if (!cleanSyarat) return null;
                    return <li key={idx}>{cleanSyarat}</li>;
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--desa-muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{'\u{1F4C4}'}</div>
            <h3>Belum ada data layanan surat</h3>
          </div>
        )}
      </div>
    </main>
  );
}
