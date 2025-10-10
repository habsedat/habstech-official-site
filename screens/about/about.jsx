/**
 * HABS TECHNOLOGIES GROUP
 * About Page Screen
 */

import './about.css';

export default function AboutPage() {
  return (
    <div className="about">
      {/* Purpose Section */}
      <section className="about-hero section">
        <div className="container">
          <h1 className="about-hero__title">Our Purpose</h1>
          <p className="about-hero__text">
            We exist to turn imagination into useful technology—from Sierra Leone to the world.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission-vision section">
        <div className="container">
          <div className="about-mission-vision__grid">
            <div className="about-mission-vision__item">
              <h2 className="about-mission-vision__title">Mission</h2>
              <p className="about-mission-vision__text">
                Build accessible, high-quality AI and software products that empower creators, teams, and businesses.
              </p>
            </div>

            <div className="about-mission-vision__item">
              <h2 className="about-mission-vision__title">Vision</h2>
              <p className="about-mission-vision__text">
                A global tech powerhouse rooted in Africa, known for speed, reliability, and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values section">
        <div className="container">
          <h2 className="about-values__heading">Our Values</h2>

          <div className="about-values__grid">
            {values.map((value) => (
              <div key={value.name} className="about-value">
                <div className="about-value__icon">{value.icon}</div>
                <h3 className="about-value__name">{value.name}</h3>
                <p className="about-value__description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Note */}
      <section className="about-leadership section">
        <div className="container">
          <div className="about-leadership__content">
            <h2 className="about-leadership__title">Leadership Note</h2>
            <p className="about-leadership__text">
              Habs Technologies Group is led by builders who ship. We believe the best way to prove value is to deliver it—quickly and consistently.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const values = [
  {
    name: 'Integrity',
    description: 'Do the right thing, always.',
    icon: '⚖️',
  },
  {
    name: 'Excellence',
    description: 'Quality you can measure.',
    icon: '⭐',
  },
  {
    name: 'Speed',
    description: 'Ship. Learn. Improve.',
    icon: '⚡',
  },
  {
    name: 'Security',
    description: 'Protect users and data by default.',
    icon: '🔒',
  },
  {
    name: 'Creativity',
    description: 'Solve hard problems with fresh ideas.',
    icon: '🎨',
  },
  {
    name: 'Impact',
    description: 'Make tools people love and rely on.',
    icon: '🚀',
  },
];


