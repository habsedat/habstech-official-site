/**
 * HABS TECHNOLOGIES GROUP
 * Admin Media Page
 */

'use client';

export default function AdminMediaPage() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Media Management</h1>
        <p className="admin-page__subtitle">Manage media files and assets</p>
      </div>

      <div className="admin-page__content">
        <div className="admin-grid">
          <div className="admin-card">
            <h3>Images</h3>
            <p>Upload and manage image assets</p>
            <button className="button button--primary" onClick={() => alert('Image management coming soon!')}>Manage Images</button>
          </div>
          
          <div className="admin-card">
            <h3>Videos</h3>
            <p>Manage video content and assets</p>
            <button className="button button--primary" onClick={() => alert('Video management coming soon!')}>Manage Videos</button>
          </div>
          
          <div className="admin-card">
            <h3>Documents</h3>
            <p>Manage document files and PDFs</p>
            <button className="button button--primary" onClick={() => alert('Document management coming soon!')}>Manage Documents</button>
          </div>
        </div>
      </div>
    </div>
  );
}
