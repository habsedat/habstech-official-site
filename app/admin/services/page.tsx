/**
 * HABS TECHNOLOGIES GROUP
 * Admin Services Page
 */

'use client';

export default function AdminServicesPage() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Services Management</h1>
        <p className="admin-page__subtitle">Manage company services and offerings</p>
      </div>

      <div className="admin-page__content">
        <div className="admin-grid">
          <div className="admin-card">
            <h3>AI Solutions</h3>
            <p>Manage AI service offerings</p>
            <button className="button button--primary" onClick={() => alert('AI Services management coming soon!')}>Manage AI Services</button>
          </div>
          
          <div className="admin-card">
            <h3>Web Development</h3>
            <p>Manage web development services</p>
            <button className="button button--primary" onClick={() => alert('Web Services management coming soon!')}>Manage Web Services</button>
          </div>
          
          <div className="admin-card">
            <h3>Creative Tech</h3>
            <p>Manage creative technology services</p>
            <button className="button button--primary" onClick={() => alert('Creative Services management coming soon!')}>Manage Creative Services</button>
          </div>
        </div>
      </div>
    </div>
  );
}
