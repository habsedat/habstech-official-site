/**
 * HABS TECHNOLOGIES GROUP
 * Admin Content Page
 */

'use client';

export default function AdminContentPage() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Content Management</h1>
        <p className="admin-page__subtitle">Manage website content and pages</p>
      </div>

      <div className="admin-page__content">
        <div className="admin-grid">
          <div className="admin-card">
            <h3>Pages</h3>
            <p>Manage website pages and content</p>
            <button className="button button--primary" onClick={() => alert('Pages management coming soon!')}>Manage Pages</button>
          </div>
          
          <div className="admin-card">
            <h3>Blog Posts</h3>
            <p>Create and manage blog content</p>
            <button className="button button--primary" onClick={() => alert('Blog management coming soon!')}>Manage Posts</button>
          </div>
          
          <div className="admin-card">
            <h3>Case Studies</h3>
            <p>Manage case study content</p>
            <button className="button button--primary" onClick={() => alert('Case studies management coming soon!')}>Manage Case Studies</button>
          </div>
        </div>
      </div>
    </div>
  );
}
