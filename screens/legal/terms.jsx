/**
 * HABS TECHNOLOGIES GROUP
 * Terms of Service Page
 */

import './legal.css';

export default function TermsPage() {
  return (
    <div className="legal">
      <div className="container legal-container">
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-updated">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="legal-content">
          <section className="legal-section">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using the Habs Technologies Group website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>Services</h2>
            <p>
              Habs Technologies Group provides software development, AI integration, web development, and creative technology services. Specific project terms, scope, timeline, and payment are defined in separate Master Services Agreements (MSA) or project contracts.
            </p>
          </section>

          <section className="legal-section">
            <h2>Website Content</h2>
            <p>
              All content on this website is provided "as is" for informational purposes. While we strive for accuracy, we make no warranties about the completeness, reliability, or accuracy of information.
            </p>
          </section>

          <section className="legal-section">
            <h2>Intellectual Property</h2>
            <p>
              All website content, including text, graphics, logos, and software, is the property of Habs Technologies Group and protected by copyright and trademark laws. Intellectual property rights for delivered projects are specified in individual project contracts.
            </p>
          </section>

          <section className="legal-section">
            <h2>Project Agreements</h2>
            <p>
              Formal projects are governed by separate Master Services Agreements that include:
            </p>
            <ul>
              <li>Detailed scope of work and deliverables</li>
              <li>Timeline and milestones</li>
              <li>Payment terms and schedule</li>
              <li>Intellectual property ownership</li>
              <li>Confidentiality provisions</li>
              <li>Warranties and liability limitations</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Payment Terms</h2>
            <p>
              Payment terms for services are outlined in project-specific agreements. Generally:
            </p>
            <ul>
              <li>Projects require an upfront deposit (typically 30-50%)</li>
              <li>Milestone payments may apply for larger projects</li>
              <li>Final payment is due upon project completion</li>
              <li>Late payments may incur interest charges</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Confidentiality</h2>
            <p>
              We treat all client information and project details as confidential. Both parties agree not to disclose proprietary information without written consent, except as required by law.
            </p>
          </section>

          <section className="legal-section">
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Habs Technologies Group shall not be liable for any indirect, incidental, consequential, or punitive damages arising from use of our services.
            </p>
          </section>

          <section className="legal-section">
            <h2>Warranties</h2>
            <p>
              We warrant that services will be performed in a professional and workmanlike manner. Specific warranties for delivered software or products are outlined in project contracts.
            </p>
          </section>

          <section className="legal-section">
            <h2>Termination</h2>
            <p>
              Either party may terminate a project agreement according to terms specified in the contract. Early termination may result in fees for work completed.
            </p>
          </section>

          <section className="legal-section">
            <h2>Governing Law</h2>
            <p>
              These terms are governed by the laws of Sierra Leone. Disputes will be resolved through negotiation or, if necessary, binding arbitration.
            </p>
          </section>

          <section className="legal-section">
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>Contact Us</h2>
            <p>
              For questions about these terms, please contact:
            </p>
            <p>
              Email: <a href="mailto:legal@habstechnologies.com">legal@habstechnologies.com</a><br />
              Address: Habs Technologies Group, Freetown, Sierra Leone
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}













