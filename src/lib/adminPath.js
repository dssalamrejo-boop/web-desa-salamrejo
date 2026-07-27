export const ADMIN_PATH = (process.env.NEXT_PUBLIC_ADMIN_PATH || '/admin-desa-salamrejo-2026').replace(/\/$/, '');

export function adminHref(path = '') {
  return `${ADMIN_PATH}${path.startsWith('/') ? path : `/${path}`}`;
}
