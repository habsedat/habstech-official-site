/**
 * HABS TECHNOLOGIES GROUP
 * Privacy Policy Page
 */

import './legal.css';

export default function PrivacyPage() {
  return (
    <div className="legal">
      <div className="container legal-container">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="legal-content">
          <section className="legal-section">
            <h2>Introduction</h2>
            <p>
              Habs Technologies Group ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>Information We Collect</h2>
            <p>We collect only the minimum necessary information to respond to your inquiries and deliver our services:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
              <li><strong>Project Information:</strong> Project details, budget range, timeline, and brief descriptions you provide</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage analytics</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Respond to your inquiries and project applications</li>
              <li>Deliver our services and fulfill contractual obligations</li>
              <li>Improve our website and user experience</li>
              <li>Send important updates about your projects</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Data Storage and Security</h2>
            <p>
              Your data is stored securely using Firebase (Google Cloud Platform) with industry-standard encryption and security measures. We implement strict access controls and regularly review our security practices.
            </p>
          </section>

          <section className="legal-section">
            <h2>Data Sharing</h2>
            <p>
              We do not sell your data. We only share your information with:
            </p>
            <ul>
              <li>Service providers necessary for project delivery (under strict confidentiality agreements)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Analytics and Cookies</h2>
            <p>
              We use standard analytics tools (Google Analytics) and performance cookies to understand how visitors use our site. You can manage cookie preferences through your browser settings.
            </p>
          </section>

          <section className="legal-section">
            <h2>Your Rights (GDPR Compliance)</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>To exercise these rights, contact us at <a href="mailto:privacy@habstechnologies.com">privacy@habstechnologies.com</a></p>
          </section>

          <section className="legal-section">
            <h2>Data Retention</h2>
            <p>
              We retain your data for 12–24 months or as required by active contracts. After this period, data is securely deleted unless legal obligations require longer retention.
            </p>
          </section>

          <section className="legal-section">
            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be posted on this page with an updated "Last updated" date.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us:
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





