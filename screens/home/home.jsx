/**
 * HABS TECHNOLOGIES GROUP
 * Home Page Screen
 */

import './home.css';
import Button from '@/components/ui/button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import DynamicImage, { DynamicBackgroundImage } from '@/components/dynamic-image';

export default function HomePage() {
  return (
    <div className="home">
      {/* Hero Section */}
      <DynamicBackgroundImage 
        sectionId="hero-bg" 
        page="homepage" 
        className="home-hero"
      >
        <div className="container">
          <div className="home-hero__content">
            <h1 className="home-hero__headline">
              Build boldly with AI.
            </h1>
            <p className="home-hero__subheadline">
              From concept to production, we craft intelligent products, websites, and applications your users love—and your business can scale.
            </p>
            <div className="home-hero__actions">
              <a 
                href="/application"
                className="button button--primary button--lg"
              >
                Start a Project
              </a>
              <a 
                href="/services"
                className="button button--secondary button--lg"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </DynamicBackgroundImage>

      {/* Credibility Row */}
      <section className="home-credibility">
        <div className="container">
          <div className="home-credibility__grid">
            <div className="home-credibility__item">
              <span className="home-credibility__icon">✓</span>
              <span className="home-credibility__text">Production-ready from day one</span>
            </div>
            <div className="home-credibility__item">
              <span className="home-credibility__icon">🌍</span>
              <span className="home-credibility__text">Global team, Africa-rooted</span>
            </div>
            <div className="home-credibility__item">
              <span className="home-credibility__icon">🔒</span>
              <span className="home-credibility__text">Security-first engineering</span>
            </div>
            <div className="home-credibility__item">
              <span className="home-credibility__icon">⚡</span>
              <span className="home-credibility__text">Rapid iteration & delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="home-services section">
        <div className="container">
          <h2 className="home-services__title">What We Do</h2>
          
          <div className="home-services__grid">
            <Card hover padding="lg">
              <CardHeader>
                <div className="home-services__icon">
                  <DynamicImage 
                    sectionId="service-ai" 
                    page="homepage" 
                    alt="AI Solutions Icon"
                    size="medium"
                    fallback={<span>🤖</span>}
                  />
                </div>
                <CardTitle>AI Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AI integrations, text-to-speech, image/video pipelines, workflow automation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card hover padding="lg">
              <CardHeader>
                <div className="home-services__icon">
                  <DynamicImage 
                    sectionId="service-web" 
                    page="homepage" 
                    alt="Web Development Icon"
                    size="medium"
                    fallback={<span>🌐</span>}
                  />
                </div>
                <CardTitle>Web & App Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Landing pages, corporate sites, dashboards, portals, e-commerce platforms.
                </CardDescription>
              </CardContent>
            </Card>

            <Card hover padding="lg">
              <CardHeader>
                <div className="home-services__icon">
                  <DynamicImage 
                    sectionId="service-creative" 
                    page="homepage" 
                    alt="Creative Tech Icon"
                    size="medium"
                    fallback={<span>🎨</span>}
                  />
                </div>
                <CardTitle>Creative Tech</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Media tooling, studio pipelines, content engines, and production workflows.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Divisions Snapshot */}
      <section className="home-divisions section">
        <div className="container">
          <h2 className="home-divisions__title">Our Divisions</h2>
          <p className="home-divisions__subtitle">
            Specialized teams delivering end-to-end solutions
          </p>

          <div className="home-divisions__grid">
            {divisions.map((division) => (
              <div key={division.name} className="home-division">
                <h3 className="home-division__name">{division.name}</h3>
                <p className="home-division__description">{division.description}</p>
              </div>
            ))}
          </div>

          <div className="home-divisions__cta">
            <a 
              href="/divisions"
              className="button button--ghost"
            >
              Learn More About Our Divisions →
            </a>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="home-featured section">
        <div className="container">
          <h2 className="home-featured__title">Featured Services</h2>

          <div className="home-featured__grid">
            {featuredServices.map((service) => (
              <Card key={service.title} hover padding="lg" className="home-featured__card">
                <CardHeader>
                  <div className="home-featured__icon">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="home-cta">
        <div className="container">
          <div className="home-cta__content">
            <h2 className="home-cta__title">Ready to move fast?</h2>
            <p className="home-cta__subtitle">
              Let's scope your project in 24 hours.
            </p>
            <a 
              href="/application"
              className="button button--accent button--lg"
            >
              Start a Project
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Data
const divisions = [
  {
    name: 'Habs AI Studio',
    description: 'Creator-grade tools for image, speech & video generation.',
  },
  {
    name: 'Habs AI Forge',
    description: 'Tailored AI workflows & business automations.',
  },
  {
    name: 'Habs Media',
    description: 'Content technology & production assets.',
  },
  {
    name: 'Habs Play',
    description: 'Interactive experiences & experimental apps.',
  },
  {
    name: 'Habs Motion',
    description: 'Video & animation production systems.',
  },
  {
    name: 'Habs Connect',
    description: 'Payments, auth, analytics, and storage integrations.',
  },
];

const featuredServices = [
  {
    icon: '🌐',
    title: 'Company Website in 10–20 Days',
    description: 'Professional, responsive websites that establish your online presence and drive results.',
  },
  {
    icon: '📊',
    title: 'Custom Dashboard & Admin',
    description: 'Powerful admin panels and dashboards tailored to your business workflows.',
  },
  {
    icon: '🤖',
    title: 'AI Image/Audio/Video Workflows',
    description: 'Integrate cutting-edge AI generation into your products and services.',
  },
  {
    icon: '🛒',
    title: 'Commerce & Subscriptions',
    description: 'Complete e-commerce solutions with payments, inventory, and subscription management.',
  },
];


