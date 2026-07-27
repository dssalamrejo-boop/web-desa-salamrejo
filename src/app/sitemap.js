export default function sitemap() {
  const baseUrl = 'https://web-desa-salamrejo.vercel.app';

  // Daftar rute statis yang ingin diindeks oleh Google
  const routes = [
    '',
    '/profil-desa',
    '/pemerintahan',
    '/layanan',
    '/dana-desa',
    '/posyandu',
    '/umkm',
    '/galeri',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
