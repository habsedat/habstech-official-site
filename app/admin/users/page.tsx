/**
 * HABS TECHNOLOGIES GROUP
 * Admin Users Page
 */

'use client';

import { useState } from 'react';
import UserManager from '@/components/admin/user-manager';
import PermissionsManager from '@/components/admin/permissions-manager';
import './users.css';

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState('admin');

  const tabs = [
    { id: 'admin', label: 'Admin Users', icon: '👨‍💼' },
    { id: 'client', label: 'Client Users', icon: '👥' },
    { id: 'permissions', label: 'Permissions', icon: '🔐' },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">User Management</h1>
        <p className="admin-page__subtitle">Manage users and permissions</p>
      </div>

      <div className="admin-page__content">
        {/* Tab Navigation */}
        <div className="users-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`users-tab ${activeTab === tab.id ? 'users-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="users-tab__icon">{tab.icon}</span>
              <span className="users-tab__label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="users-content">
          {activeTab === 'admin' && <UserManager userType="admin" />}
          {activeTab === 'client' && <UserManager userType="client" />}
          {activeTab === 'permissions' && <PermissionsManager />}
        </div>
      </div>
    </div>
  );
}
