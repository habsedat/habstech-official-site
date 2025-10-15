/**
 * HABS TECHNOLOGIES GROUP
 * Admin Users Page
 */

'use client';

export default function AdminUsersPage() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">User Management</h1>
        <p className="admin-page__subtitle">Manage users and permissions</p>
      </div>

      <div className="admin-page__content">
        <div className="admin-grid">
          <div className="admin-card">
            <h3>Admin Users</h3>
            <p>Manage admin user accounts</p>
            <button className="button button--primary" onClick={() => alert('Admin management coming soon!')}>Manage Admins</button>
          </div>
          
          <div className="admin-card">
            <h3>Client Users</h3>
            <p>Manage client user accounts</p>
            <button className="button button--primary" onClick={() => alert('Client management coming soon!')}>Manage Clients</button>
          </div>
          
          <div className="admin-card">
            <h3>Permissions</h3>
            <p>Manage user roles and permissions</p>
            <button className="button button--primary" onClick={() => alert('Permission management coming soon!')}>Manage Permissions</button>
          </div>
        </div>
      </div>
    </div>
  );
}
