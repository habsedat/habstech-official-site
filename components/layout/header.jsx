/**
 * HABS TECHNOLOGIES GROUP
 * Header Component
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './header.css';
import clsx from 'clsx';
import Navigation from './navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={clsx('header', isScrolled && 'header--scrolled')}>
      <div className="header__container container">
        <Link href="/" className="header__logo">
          <img 
            src="/logo.png" 
            alt="Habs Technologies Group" 
            className="header__logo-image"
            style={{
              height: '40px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <Navigation className="header__nav--desktop" />

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={clsx('header__menu-button', mobileMenuOpen && 'header__menu-button--active')}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          style={{
            background: mobileMenuOpen ? '#6C63FF' : '#0E3A8A', 
            width: '32px', 
            height: '32px', 
            borderRadius: '4px', 
            border: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 1px 2px rgba(14, 58, 138, 0.1)',
            position: 'relative',
            zIndex: '60',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            padding: '1px'
          }}
        >
          <div className={clsx('hamburger', mobileMenuOpen && 'hamburger--active')} style={{
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            width: '14px', 
            height: '10px',
            cursor: 'pointer'
          }}>
            <div className="hamburger__line" style={{
              width: '100%', 
              height: '1px', 
              background: 'white', 
              borderRadius: '1px',
              transition: 'all 0.2s ease'
            }}></div>
            <div className="hamburger__line" style={{
              width: '100%', 
              height: '1px', 
              background: 'white', 
              borderRadius: '1px',
              transition: 'all 0.2s ease'
            }}></div>
            <div className="hamburger__line" style={{
              width: '100%', 
              height: '1px', 
              background: 'white', 
              borderRadius: '1px',
              transition: 'all 0.2s ease'
            }}></div>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={clsx('header__mobile-menu', mobileMenuOpen && 'header__mobile-menu--open')}>
        <div className="header__mobile-menu-content">
          <Navigation 
            className="header__nav--mobile" 
            onLinkClick={() => setMobileMenuOpen(false)}
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="header__mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}


