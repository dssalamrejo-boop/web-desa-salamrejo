'use client';
import Link from 'next/link';
import { adminHref } from '@/lib/adminPath';
import { usePathname, useRouter } from 'next/navigation';

const sidebarMenu = [
  { icon: '', label: 'Dashboard', href: adminHref('') },
  { icon: '️', label: 'Pengaturan Umum', href: adminHref('/pengaturan') },
  { icon: '👥', label: 'Aparatur Desa', href: adminHref('/aparatur') },
  { icon: '👨‍💼', label: 'Riwayat Kades', href: adminHref('/kades') },
  { icon: '🏘️', label: 'RT & RW', href: adminHref('/rt-rw') },
  { icon: '️', label: 'Kelembagaan', href: adminHref('/kelembagaan') },
  { icon: '', label: 'Pengumuman', href: adminHref('/pengumuman') },
  { icon: '', label: 'Agenda', href: adminHref('/agenda') },
  { icon: '', label: 'Potensi Desa', href: adminHref('/umkm') },
  { icon: '', label: 'Posyandu', href: adminHref('/posyandu') },
  { icon: '️', label: 'Galeri', href: adminHref('/galeri') },
  { icon: '', label: 'Layanan Surat', href: adminHref('/layanan') },
  { icon: '', label: 'Pembangunan', href: adminHref('/pembangunan') },
  { icon: '️', label: 'Hero Banner', href: adminHref('/hero') },
  { icon: '🖼️', label: 'Gambar Struktur', href: adminHref('/struktur-chart') },
  { icon: '💰', label: 'Dana Desa', href: adminHref('/dana-desa') },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    if (confirm('Yakin ingin keluar dari dasbor admin?')) {
      await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' })
      });
      router.push('/login');
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <Link href={adminHref()}>️ Admin Desa</Link>
        </div>
        <nav className="admin-sidebar__nav">
          {sidebarMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-sidebar__link ${pathname === item.href ? 'admin-sidebar__link--active' : ''}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '16px 0', paddingTop: 16 }}>
            <button 
              onClick={handleLogout} 
              className="admin-sidebar__link" 
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: '#E74C3C', fontWeight: 600 }}
            >
              🚪 Keluar (Logout)
            </button>
            <Link href="/" className="admin-sidebar__link" style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
              ← Kembali ke Website
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
