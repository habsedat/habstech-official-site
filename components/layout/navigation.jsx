/**
 * HABS TECHNOLOGIES GROUP
 * Navigation Component
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './navigation.css';
import clsx from 'clsx';
import Button from '../ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/divisions', label: 'Divisions' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation({ className, onLinkClick }) {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={clsx('navigation', className)}>
      <ul className="navigation__list">
        {navLinks.map((link) => (
          <li key={link.href} className="navigation__item">
            <Link
              href={link.href}
              className={clsx(
                'navigation__link',
                isActive(link.href) && 'navigation__link--active'
              )}
              onClick={() => {
                if (onLinkClick) {
                  onLinkClick();
                }
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="navigation__cta">
        <Link 
          href="/application" 
          onClick={() => {
            if (onLinkClick) {
              onLinkClick();
            }
          }}
          className={clsx(
            'navigation__cta-link',
            isActive('/application') && 'navigation__cta-link--active'
          )}
        >
          <Button 
            variant={isActive('/application') ? 'secondary' : 'primary'} 
            size="sm"
          >
            Start a Project
          </Button>
        </Link>
      </div>
    </nav>
  );
}


