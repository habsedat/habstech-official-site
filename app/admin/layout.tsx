/**
 * HABS TECHNOLOGIES GROUP
 * Admin Layout
 */

import { Metadata } from 'next';
import Sidebar from '@/components/admin/sidebar';
import '@/styles/admin.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard — Habs Technologies Group',
  description: 'Admin dashboard for managing Habs Technologies Group website.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}





