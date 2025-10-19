/**
 * HABS TECHNOLOGIES GROUP
 * Cookie Policy Page
 */

import './legal.css';

export default function CookiesPage() {
  return (
    <div className="legal">
      <div className="container legal-container">
        <h1 className="legal-title">Cookie Policy</h1>
        <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="legal-content">
          <section className="legal-section">
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files placed on your device when you visit our website. They help us provide a better user experience by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section className="legal-section">
            <h2>How We Use Cookies</h2>
            <p>
              Habs Technologies Group uses cookies for:
            </p>
            <ul>
              <li><strong>Essential Functions:</strong> Enabling core website functionality and security</li>
              <li><strong>Analytics:</strong> Understanding how visitors interact with our site to improve user experience</li>
              <li><strong>Performance:</strong> Measuring page load times and optimizing site speed</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Types of Cookies We Use</h2>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.
            </p>

            <h3>Analytics Cookies</h3>
            <p>
              We use Google Analytics to collect anonymous data about site usage, including:
            </p>
            <ul>
              <li>Pages visited</li>
              <li>Time spent on site</li>
              <li>Traffic sources</li>
              <li>Device and browser information</li>
            </ul>

            <h3>Performance Cookies</h3>
            <p>
              These cookies help us understand and improve site performance by tracking loading times and error rates.
            </p>
          </section>

          <section className="legal-section">
            <h2>Third-Party Cookies</h2>
            <p>
              We may use third-party services that set cookies:
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> For website analytics</li>
              <li><strong>Firebase:</strong> For authentication and hosting</li>
            </ul>
            <p>
              These services have their own privacy policies governing cookie use.
            </p>
          </section>

          <section className="legal-section">
            <h2>Managing Cookies</h2>
            <p>
              You can control and manage cookies in several ways:
            </p>

            <h3>Browser Settings</h3>
            <p>
              Most browsers allow you to:
            </p>
            <ul>
              <li>View and delete cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block third-party cookies</li>
              <li>Delete all cookies when closing the browser</li>
            </ul>

            <h3>Opt-Out Tools</h3>
            <p>
              You can opt out of Google Analytics tracking by installing the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>

            <p>
              <strong>Note:</strong> Blocking essential cookies may affect website functionality.
            </p>
          </section>

          <section className="legal-section">
            <h2>Cookie Duration</h2>
            <p>
              We use both session cookies (deleted when you close your browser) and persistent cookies (remain until deleted or expired). Analytics cookies typically expire after 2 years.
            </p>
          </section>

          <section className="legal-section">
            <h2>Changes to This Policy</h2>
            <p>
              We may update this cookie policy from time to time. Changes will be posted on this page with an updated "Last updated" date.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact:
            </p>
            <p>
              Email: <a href="mailto:privacy@habstechnologies.com">privacy@habstechnologies.com</a><br />
              Address: Habs Technologies Group, Freetown, Sierra Leone
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}





















