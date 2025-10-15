/**
 * HABS TECHNOLOGIES GROUP
 * Admin Login Layout
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login — Habs Technologies Group',
  description: 'Admin login for Habs Technologies Group.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="login-layout">
      {children}
    </div>
  );
}




