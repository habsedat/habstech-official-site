/**
 * HABS TECHNOLOGIES GROUP
 * Case Studies Page Screen
 */

'use client';

import './case-studies.css';

export default function CaseStudiesPage() {
  return (
    <div className="case-studies">
      {/* Hero */}
      <section className="case-studies-hero section">
        <div className="container">
          <h1 className="case-studies-hero__title">Case Studies</h1>
          <p className="case-studies-hero__subtitle">
            From idea to live product—outcomes that matter.
          </p>
        </div>
      </section>

      {/* Coming Soon Message */}
      <section className="case-studies-content section">
        <div className="container">
          <div className="case-studies-empty">
            <div className="case-studies-empty__icon">📋</div>
            <h2 className="case-studies-empty__title">Case Studies Coming Soon</h2>
            <p className="case-studies-empty__text">
              We're currently working on showcasing our latest projects. Check back soon to see real outcomes, metrics, and success stories from our clients.
            </p>
            <p className="case-studies-empty__text">
              In the meantime, we'd love to discuss how we can help with your project.
            </p>
            <a 
              href="/application"
              className="button button--primary button--lg"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}








