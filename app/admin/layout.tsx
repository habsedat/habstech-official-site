/**
 * HABS TECHNOLOGIES GROUP
 * Admin Layout
 */

import { Metadata } from 'next';
import Sidebar from '@/components/admin/sidebar';
import ProtectedRoute from '@/components/admin/protected-route';
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
    <ProtectedRoute>
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <div className="admin-content">
            {children}
          </div>
          <footer className="admin-footer">
            <div className="admin-footer__content">
              <p>&copy; {new Date().getFullYear()} Habs Technologies Group. All rights reserved.</p>
              <p>Admin Dashboard</p>
            </div>
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  );
}











