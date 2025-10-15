/**
 * HABS TECHNOLOGIES GROUP
 * Admin Sidebar Component
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useState } from 'react';
import './sidebar.css';
import clsx from 'clsx';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/content', label: 'Content', icon: '📝' },
  { href: '/admin/services', label: 'Services', icon: '💼' },
  { href: '/admin/applications', label: 'Applications', icon: '📋' },
  { href: '/admin/contacts', label: 'Contacts', icon: '📧' },
  { href: '/admin/media', label: 'Media', icon: '🖼️' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {!isMobileMenuOpen && (
        <button 
          className="sidebar__mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className="hamburger-icon">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="sidebar__overlay"
          onClick={closeMobileMenu}
        ></div>
      )}

      <aside className={clsx('sidebar', isMobileMenuOpen && 'sidebar--mobile-open')}>
        <div className="sidebar__header">
          <Link href="/" className="sidebar__logo" onClick={closeMobileMenu}>
            <span className="sidebar__logo-text">Habs</span>
            <span className="sidebar__logo-badge">Admin</span>
          </Link>
          
          {/* Mobile Close Button */}
          <button 
            className="sidebar__close"
            onClick={closeMobileMenu}
            aria-label="Close mobile menu"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar__nav">
          <ul className="sidebar__menu">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx('sidebar__link', isActive(item.href) && 'sidebar__link--active')}
                  onClick={closeMobileMenu}
                >
                  <span className="sidebar__icon">{item.icon}</span>
                  <span className="sidebar__label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">{user?.name || 'Admin'}</span>
              <span className="sidebar__user-email">{user?.email}</span>
            </div>
          </div>

          <Link href="/" className="sidebar__exit" onClick={closeMobileMenu}>
            <span className="sidebar__icon">←</span>
            <span className="sidebar__label">Back to Site</span>
          </Link>

          <button onClick={logout} className="sidebar__logout">
            <span className="sidebar__icon">🚪</span>
            <span className="sidebar__label">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}











