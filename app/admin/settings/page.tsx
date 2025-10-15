/**
 * HABS TECHNOLOGIES GROUP
 * Admin Settings Page
 */

'use client';

import PasswordChange from '@/components/admin/password-change';

export default function AdminSettingsPage() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Settings</h1>
        <p className="admin-page__subtitle">Configure system settings and preferences</p>
      </div>

      <div className="admin-page__content">
        <div className="admin-grid">
          <div className="admin-card">
            <h3>General Settings</h3>
            <p>Configure general website settings</p>
            <button className="button button--primary" onClick={() => alert('General settings coming soon!')}>General Settings</button>
          </div>
          
          <div className="admin-card">
            <h3>Email Settings</h3>
            <p>Configure email notifications and templates</p>
            <button className="button button--primary" onClick={() => alert('Email settings coming soon!')}>Email Settings</button>
          </div>
          
          <div className="admin-card">
            <h3>Security</h3>
            <p>Manage security settings and access controls</p>
            <button className="button button--primary" onClick={() => alert('Security settings coming soon!')}>Security Settings</button>
          </div>
        </div>

        <div className="admin-section">
          <PasswordChange />
        </div>
      </div>
    </div>
  );
}
