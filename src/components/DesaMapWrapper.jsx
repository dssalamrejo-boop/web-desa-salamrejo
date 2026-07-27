'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./DesaMap'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', minHeight: 400, borderRadius: 24, background: 'var(--desa-paper)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--desa-muted)' }}>Memuat Peta Geospasial Desa...</p>
    </div>
  )
});

export default function DesaMapWrapper() {
  return <Map />;
}
