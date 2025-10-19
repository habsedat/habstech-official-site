/**
 * HABS TECHNOLOGIES GROUP
 * Admin Media Page
 */

'use client';

import MediaManager from '@/components/admin/media-manager';

export default function AdminMediaPage() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Media Management</h1>
        <p className="admin-page__subtitle">Upload and manage images for your website</p>
      </div>

      <div className="admin-page__content">
        <MediaManager />
      </div>
    </div>
  );
}
