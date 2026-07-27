'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import SmoothScroller from './SmoothScroller';

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  // Check if current route is an admin route
  const isAdmin = pathname?.startsWith('/admin');

  // If admin route, do not render public Navbar, Footer, or SmoothScroller
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroller>
      <Navbar />
      {children}
      <Footer />
    </SmoothScroller>
  );
}
