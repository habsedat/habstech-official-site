/**
 * HABS TECHNOLOGIES GROUP
 * Divisions Page Screen
 */

import './divisions.css';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DivisionsPage() {
  return (
    <div className="divisions">
      {/* Hero */}
      <section className="divisions-hero section">
        <div className="container">
          <h1 className="divisions-hero__title">Our Divisions</h1>
          <p className="divisions-hero__subtitle">
            One group. Specialized teams. End-to-end delivery.
          </p>
        </div>
      </section>

      {/* Divisions Grid */}
      <section className="divisions-list section">
        <div className="container">
          <div className="divisions-list__grid">
            {divisions.map((division) => (
              <Card key={division.name} hover padding="lg" className="divisions-card">
                <CardHeader>
                  <div className="divisions-card__icon">{division.icon}</div>
                  <CardTitle>{division.name}</CardTitle>
                  <CardDescription>{division.focus}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="divisions-card__details">
                    <h4 className="divisions-card__label">Example Use:</h4>
                    <p className="divisions-card__text">{division.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const divisions = [
  {
    name: 'Habs AI Studio',
    focus: 'Creator-grade tools for AI image, audio & video generation',
    example: 'Media generation, creative automation, content production',
    icon: '🎨',
  },
  {
    name: 'Habs AI Forge',
    focus: 'Custom AI pipelines & business automation',
    example: 'Business AI solutions, workflow automation, intelligent systems',
    icon: '⚙️',
  },
  {
    name: 'Habs Media',
    focus: 'Content technology & template systems',
    example: 'Branding assets, media management, production tools',
    icon: '📸',
  },
  {
    name: 'Habs Play',
    focus: 'Interactive experiments & digital concepts',
    example: 'Games, interactive experiences, experimental applications',
    icon: '🎮',
  },
  {
    name: 'Habs Motion',
    focus: 'Video and animation production systems',
    example: 'Video editors, animation tools, post-production workflows',
    icon: '🎬',
  },
  {
    name: 'Habs Connect',
    focus: 'Payments, integrations & infrastructure',
    example: 'Payment gateways, authentication, analytics, cloud storage',
    icon: '🔗',
  },
];


