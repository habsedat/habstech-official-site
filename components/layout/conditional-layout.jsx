/**
 * HABS TECHNOLOGIES GROUP
 * Conditional Layout Component
 */

'use client';

import { usePathname } from 'next/navigation';
import Header from './header';
import Footer from './footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/login' || pathname === '/admin/login';

  if (isLoginPage) {
    // For login page, render with header and footer (no admin layout)
    return (
      <>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </>
    );
  }

  if (isAdminPage) {
    // For other admin pages, only render children (admin layout handles the rest)
    return <>{children}</>;
  }

  // For regular pages, render with header and footer
  return (
    <>
      <Header />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
