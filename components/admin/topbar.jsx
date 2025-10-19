/**
 * HABS TECHNOLOGIES GROUP
 * Admin Topbar Component
 */

'use client';

import { useState } from 'react';
import './topbar.css';
import Button from '../ui/button';
import Notifications from './notifications';
import { useAuth } from '@/contexts/auth-context';

export default function Topbar({ title, subtitle }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="topbar">
      <div className="topbar__content">
        <div className="topbar__title-section">
          {title && <h1 className="topbar__title">{title}</h1>}
          {subtitle && <p className="topbar__subtitle">{subtitle}</p>}
        </div>

        <div className="topbar__actions">
          <Notifications />
          <div className="topbar__user">
            <span className="topbar__user-name">{user?.name || 'Admin User'}</span>
            <span className="topbar__user-role">{user?.role || 'Admin'}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}















