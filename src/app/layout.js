import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export const metadata = {
  title: 'Desa Salamrejo — Portal Resmi Pemerintahan Desa',
  description: 'Portal Resmi Pemerintahan Desa Salamrejo, Kecamatan Binangun, Kabupaten Blitar. Mewujudkan tata kelola desa yang Sejahtera, Adil, Transparan, Akuntabel, Tentram, dan Amanah.',
  keywords: 'Desa Salamrejo, Binangun, Blitar, Pemerintah Desa, Portal Desa',
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
