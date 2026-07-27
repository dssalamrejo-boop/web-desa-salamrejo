'use client';
import Link from 'next/link';
import { useDataStore } from '@/hooks/useDataStore';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [pengaturan] = useDataStore('pengaturan');

  const telepon = pengaturan?.telepon || '0812-2882-0366';
  const email = pengaturan?.email || 'dssalamrejo@gmail.com';
  const alamat = pengaturan?.alamatKantor || 'Jln. Mangga No.55, Desa Salamrejo, Kec. Binangun, Kab. Blitar 66192';
  const waNumber = telepon.replace(/[^0-9]/g, '');
  const waNumberFull = waNumber.startsWith('0') ? '62' + waNumber.slice(1) : waNumber;

  return (
    <footer className="desa-footer">
      <div className="desa-container">
        <div className="desa-footer__grid">
          {/* Brand */}
          <div>
            <div className="desa-footer__brand" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img 
                src="/images/logo-desa.png" 
                alt="Logo Desa Salamrejo" 
                style={{ width: 40, height: 40, objectFit: 'contain' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
              <span>Desa Salamrejo</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 360 }}>
              Portal Resmi Pemerintahan Desa Salamrejo, Kecamatan Binangun, Kabupaten Blitar.
              Mewujudkan tata kelola desa yang Sejahtera, Adil, Transparan, Akuntabel, Tentram, dan Amanah.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <a href={`https://wa.me/${waNumberFull}`} target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'background 0.2s' }}>
                {'\u{1F4DE}'}
              </a>
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'background 0.2s' }}>
                {'\u{2709}\u{FE0F}'}
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <div className="desa-footer__heading">Navigasi</div>
            <Link href="/" className="desa-footer__link">Beranda</Link>
            <Link href="/profil-desa" className="desa-footer__link">Profil Desa</Link>
            <Link href="/pemerintahan" className="desa-footer__link">Pemerintahan</Link>
            <Link href="/umkm" className="desa-footer__link">Potensi Desa</Link>
            <Link href="/posyandu" className="desa-footer__link">Posyandu</Link>
          </div>

          {/* Informasi */}
          <div>
            <div className="desa-footer__heading">Informasi</div>
            <Link href="/#pengumuman" className="desa-footer__link">Pengumuman</Link>
            <Link href="/#agenda" className="desa-footer__link">Agenda</Link>
            <Link href="/galeri" className="desa-footer__link">Galeri</Link>
            <Link href="/layanan" className="desa-footer__link">Layanan Surat</Link>
            <Link href="/dana-desa" className="desa-footer__link">Dana Desa</Link>
          </div>

          {/* Kontak */}
          <div>
            <div className="desa-footer__heading">Kontak Desa</div>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(alamat)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="desa-footer__link"
              style={{ display: 'block', height: 'auto', marginBottom: 10, lineHeight: 1.6 }}
            >
              {'\u{1F4CD}'} {alamat} &rarr;
            </a>
            <a 
              href={`https://wa.me/${waNumberFull}?text=Halo%20Admin%20Desa%20Salamrejo`}
              target="_blank" 
              rel="noopener noreferrer"
              className="desa-footer__link"
              style={{ display: 'block', marginBottom: 6 }}
            >
              {'\u{1F4DE}'} {telepon} (WhatsApp) &rarr;
            </a>
            <a 
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank" rel="noopener noreferrer" 
              className="desa-footer__link"
              style={{ display: 'block' }}
            >
              {'\u{2709}\u{FE0F}'} {email} &rarr;
            </a>
          </div>
        </div>

        <div className="desa-footer__bottom">
          &copy; {currentYear} Pemerintah Desa Salamrejo. Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  );
}
