import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export const metadata = {
  title: {
    default: 'Desa Salamrejo — Portal Resmi Pemerintahan Desa',
    template: '%s | Desa Salamrejo'
  },
  description: 'Portal Resmi Pemerintahan Desa Salamrejo, Kecamatan Binangun, Kabupaten Blitar. Mewujudkan tata kelola desa yang Sejahtera, Adil, Transparan, Akuntabel, Tentram, dan Amanah.',
  keywords: ['Desa Salamrejo', 'Binangun', 'Blitar', 'Pemerintah Desa', 'Portal Desa', 'Jawa Timur', 'Desa Digital'],
  authors: [{ name: 'Pemerintah Desa Salamrejo' }],
  creator: 'Pemerintah Desa Salamrejo',
  openGraph: {
    title: 'Desa Salamrejo — Portal Resmi Pemerintahan Desa',
    description: 'Portal Resmi Pemerintahan Desa Salamrejo, Kecamatan Binangun, Kabupaten Blitar.',
    url: 'https://web-desa-salamrejo.vercel.app',
    siteName: 'Website Desa Salamrejo',
    images: [
      {
        url: 'https://web-desa-salamrejo.vercel.app/images/hero-beranda.webp', // Gunakan gambar hero utama
        width: 1200,
        height: 630,
        alt: 'Pemandangan Desa Salamrejo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
