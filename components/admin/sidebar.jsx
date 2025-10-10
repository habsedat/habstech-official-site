/**
 * HABS TECHNOLOGIES GROUP
 * Admin Sidebar Component
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './sidebar.css';
import clsx from 'clsx';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/content', label: 'Content', icon: '📝' },
  { href: '/admin/services', label: 'Services', icon: '💼' },
  { href: '/admin/applications', label: 'Applications', icon: '📋' },
  { href: '/admin/media', label: 'Media', icon: '🖼️' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <Link href="/" className="sidebar__logo">
          <span className="sidebar__logo-text">Habs</span>
          <span className="sidebar__logo-badge">Admin</span>
        </Link>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__menu">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx('sidebar__link', isActive(item.href) && 'sidebar__link--active')}
              >
                <span className="sidebar__icon">{item.icon}</span>
                <span className="sidebar__label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <Link href="/" className="sidebar__exit">
          <span className="sidebar__icon">←</span>
          <span className="sidebar__label">Back to Site</span>
        </Link>
      </div>
    </aside>
  );
}





