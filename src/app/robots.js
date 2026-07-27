export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/admin-desa-salamrejo-2026/', '/login/'],
    },
    sitemap: 'https://web-desa-salamrejo.vercel.app/sitemap.xml',
  };
}
