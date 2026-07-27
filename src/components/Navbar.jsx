'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Profil Desa', href: '/profil-desa',
    children: [
      { label: 'Visi & Misi', href: '/profil-desa#visi-misi' },
      { label: 'Sejarah Desa', href: '/profil-desa#sejarah' },
      { label: 'Kondisi Geografis', href: '/profil-desa#geografis' },
      { label: 'Kontak Desa', href: '/profil-desa#kontak' },
    ],
  },
  {
    label: 'Pemerintahan', href: '/pemerintahan',
    children: [
      { label: 'Struktur Organisasi', href: '/pemerintahan#struktur' },
      { label: 'Daftar RT/RW', href: '/pemerintahan#rt-rw' },
      { label: 'Kelembagaan', href: '/pemerintahan#kelembagaan' },
      { label: 'Dana Desa', href: '/dana-desa' },
    ],
  },
  {
    label: 'Potensi Desa', href: '/umkm',
    children: [
      { label: 'Wisata Alam', href: '/umkm#wisata-alam' },
      { label: 'Situs Sejarah', href: '/umkm#situs-sejarah' },
      { label: 'Kerajinan Khas', href: '/umkm#kerajinan' },
    ],
  },
  {
    label: 'Posyandu', href: '/posyandu',
    children: [
      { label: 'Profil ILP', href: '/posyandu#profil' },
      { label: 'Tim Kesehatan', href: '/posyandu#petugas' },
      { label: 'Jadwal Kegiatan', href: '/posyandu#jadwal' },
    ],
  },
  { label: 'Layanan', href: '/layanan' },
  { label: 'Galeri', href: '/galeri' },
];

// Pages that have full-height hero banners (transparent navbar)
const heroPages = ['/', '/profil-desa', '/pemerintahan', '/umkm', '/posyandu', '/galeri', '/layanan', '/dana-desa'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const hasHero = heroPages.includes(pathname);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = hasHero && !scrolled && !mobileOpen;

  const navClass = [
    'desa-navbar',
    isTransparent ? 'desa-navbar--transparent' : 'desa-navbar--scrolled',
  ].filter(Boolean).join(' ');

  return (
    <header className={navClass}>
      <nav className="desa-navbar__inner">
        {/* Logo */}
        <Link href="/" className="desa-navbar__logo">
          <img 
            src="/images/logo-desa.png" 
            alt="Logo Desa Salamrejo" 
            style={{ width: 36, height: 36, objectFit: 'contain' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          />
          <span>Desa Salamrejo</span>
        </Link>

        {/* Desktop Menu */}
        <ul className={`desa-navbar__menu ${mobileOpen ? 'desa-navbar__menu--open' : ''}`}>
          {menuItems.map((item) => (
            <li key={item.href} className="desa-navbar__item">
              <Link
                href={item.href}
                className={`desa-navbar__link ${pathname === item.href ? 'desa-navbar__link--active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
                {item.children && (
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: 2 }}>
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </Link>
              {item.children && (
                <div className="desa-navbar__dropdown">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className="desa-navbar__dropdown-link" onClick={() => setMobileOpen(false)}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger (Mobile) */}
        <button
          className="desa-navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileOpen}
        >
          <span style={mobileOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
          <span style={mobileOpen ? { opacity: 0 } : {}} />
          <span style={mobileOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
        </button>
      </nav>
    </header>
  );
}
