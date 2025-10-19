/**
 * HABS TECHNOLOGIES GROUP
 * Navigation Component
 */

'use client';

import { useState, useEffect } from 'react';
import './navigation.css';
import clsx from 'clsx';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/divisions', label: 'Divisions' },
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation({ className, onLinkClick }) {
  const [currentPath, setCurrentPath] = useState('/');

  // Update path on mount and when it changes
  useEffect(() => {
    const updatePath = () => {
      let path = window.location.pathname;
      
      // Handle static export routing - remove .html extension if present
      if (path.endsWith('.html')) {
        path = path.replace('.html', '');
      }
      
      // Handle root path
      if (path === '' || path === '/') {
        path = '/';
      }
      
      setCurrentPath(path);
    };
    
    // Initial path
    updatePath();
    
    // Listen for navigation changes
    window.addEventListener('popstate', updatePath);
    
    // Listen for hash changes (for single-page navigation)
    window.addEventListener('hashchange', updatePath);
    
    return () => {
      window.removeEventListener('popstate', updatePath);
      window.removeEventListener('hashchange', updatePath);
    };
  }, []);

  // Function to check if current page matches the link
  const isActive = (href) => {
    // Normalize current path
    let normalizedCurrentPath = currentPath;
    if (normalizedCurrentPath === '/' || normalizedCurrentPath === '') {
      normalizedCurrentPath = '/';
    } else {
      normalizedCurrentPath = normalizedCurrentPath.replace(/\/$/, '');
    }
    
    // Normalize href
    let normalizedHref = href;
    if (normalizedHref === '/') {
      normalizedHref = '/';
    } else {
      normalizedHref = normalizedHref.replace(/\/$/, '');
    }
    
    return normalizedCurrentPath === normalizedHref;
  };

  return (
    <nav className={clsx('navigation', className)}>
      <ul className="navigation__list">
        {navLinks.map((link) => (
          <li key={link.href} className="navigation__item">
            <a
              href={link.href}
              className={clsx(
                'navigation__link',
                isActive(link.href) && 'navigation__link--active'
              )}
              onClick={(e) => {
                // Close mobile menu if open
                if (onLinkClick) {
                  onLinkClick();
                }
                
                // Update the current path immediately for better UX
                setCurrentPath(link.href);
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="navigation__cta">
        <a 
          href="/application" 
          className="navigation__cta-link button button--primary button--sm"
        >
          Start a Project
        </a>
      </div>
    </nav>
  );
}


