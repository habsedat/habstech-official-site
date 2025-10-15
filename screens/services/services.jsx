/**
 * HABS TECHNOLOGIES GROUP
 * Services & Pricing Page Screen
 */

'use client';

import './services.css';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export default function ServicesPage() {
  return (
    <div className="services">
      {/* Hero */}
      <section className="services-hero section">
        <div className="container">
          <h1 className="services-hero__title">Services & Pricing</h1>
          <p className="services-hero__subtitle">
            Transparent tiers. Clear deliverables. Flexible add-ons.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="services-pricing section">
        <div className="container">
          <div className="services-pricing__grid">
            {pricingTiers.map((tier) => (
              <Card key={tier.name} hover padding="lg" className="services-tier">
                <CardHeader>
                  <div className="services-tier__badge">{tier.badge}</div>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.bestFor}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="services-tier__price">
                    <span className="services-tier__currency">€</span>
                    <span className="services-tier__amount">{tier.price.toLocaleString()}</span>
                    <span className="services-tier__period">starting</span>
                  </div>

                  <div className="services-tier__timeline">
                    <strong>Timeline:</strong> {tier.timeline}
                  </div>

                  <div className="services-tier__includes">
                    <h4>Includes:</h4>
                    <ul>
                      {tier.includes.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {tier.addons && tier.addons.length > 0 && (
                    <div className="services-tier__addons">
                      <h4>Add-ons:</h4>
                      <p>{tier.addons.join(', ')}</p>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  <a 
                    href="/application" 
                    className="button button--primary button--full services-tier__cta"
                  >
                    Select This Tier
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote CTA */}
      <section className="services-cta section">
        <div className="container">
          <div className="services-cta__content">
            <h2 className="services-cta__title">Not sure which tier fits you?</h2>
            <p className="services-cta__text">
              Every project is unique. Let's discuss your needs and create a custom proposal.
            </p>
            <a 
              href="/application"
              className="button button--accent button--lg"
            >
              Get a Custom Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

const pricingTiers = [
  {
    name: 'Starter Landing',
    badge: 'One-Page',
    bestFor: 'Best for: New brands, launches, campaigns',
    price: 1250,
    timeline: '7–10 days',
    includes: [
      'Responsive single page (hero, features, CTA, contact)',
      'Basic SEO, analytics, cookie banner',
      'Contact form with spam protection',
    ],
    addons: ['Copywriting', 'Illustrations', 'Motion', 'Language variants'],
  },
  {
    name: 'Multi-Page Site',
    badge: '3–8 Pages',
    bestFor: 'Best for: Company sites with richer content',
    price: 2800,
    timeline: '2–3 weeks',
    includes: [
      'All Starter features',
      'Pages like About, Services, Case Studies, Blog/News',
      'Performance & accessibility pass',
    ],
    addons: ['CMS blog', 'Advanced SEO', 'Animations', 'Localization'],
  },
  {
    name: 'Site with Backend',
    badge: 'Custom',
    bestFor: 'Best for: Dashboards, portals, protected content',
    price: 5500,
    timeline: '3–6+ weeks',
    includes: [
      'Auth, roles, private Admin',
      'Data models (content, submissions), audit logs',
      'API integrations (payments, storage, analytics)',
    ],
    addons: ['Complex workflows', 'Multi-tenant', 'SSO', 'Reporting'],
  },
  {
    name: 'Online Store',
    badge: 'E-commerce',
    bestFor: 'Best for: Products, subscriptions, digital goods',
    price: 4500,
    timeline: '3–5 weeks',
    includes: [
      'Product CMS, cart, checkout',
      'Payment processing (Stripe/PayPal)',
      'Order emails, taxes/VAT setup',
    ],
    addons: ['Multi-currency', 'Subscriptions', 'Marketplace', 'Custom fulfillment'],
  },
];








