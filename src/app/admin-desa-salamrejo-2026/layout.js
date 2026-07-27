'use client';
import Link from 'next/link';
import { adminHref } from '@/lib/adminPath';
import { usePathname } from 'next/navigation';

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
            <Link href="/" className="admin-sidebar__link" style={{ color: 'rgba(255,255,255,0.5)' }}>
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
