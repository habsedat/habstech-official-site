/**
 * HABS TECHNOLOGIES GROUP
 * Footer Component
 */

import Link from 'next/link';
import './footer.css';

const quickLinks = [
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/legal/privacy', label: 'Privacy Policy' },
  { href: '/legal/terms', label: 'Terms of Service' },
  { href: '/legal/cookies', label: 'Cookie Policy' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__top">
          {/* Brand Section */}
          <div className="footer__section footer__section--brand">
            <Link href="/" className="footer__logo">
              <span className="footer__logo-text">Habs</span>
              <span className="footer__logo-tagline">Technologies Group</span>
            </Link>
            <p className="footer__tagline">Imagination in Motion</p>
            <p className="footer__description">
              We design, build, and deploy modern AI and software solutions—fast, secure, and production-ready.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h3 className="footer__heading">Quick Links</h3>
            <ul className="footer__links">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="footer__section">
            <h3 className="footer__heading">Legal</h3>
            <ul className="footer__links">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer__section">
            <h3 className="footer__heading">Contact</h3>
            <ul className="footer__contact">
              <li>
                <a href="mailto:contact@habstechnologies.com" className="footer__link">
                  contact@habstechnologies.com
                </a>
              </li>
              <li className="footer__address">
                Freetown, Sierra Leone
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Habs Technologies Group. All rights reserved.
          </p>
          <div className="footer__social">
            {/* Social links will be added when available */}
            <p className="footer__note">Building the future from Sierra Leone to the world.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}


