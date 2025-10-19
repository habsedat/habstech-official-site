/**
 * HABS TECHNOLOGIES GROUP
 * Image Usage Guide Component
 */

'use client';

import { useState } from 'react';
import './image-usage-guide.css';

const USAGE_GUIDES = {
  'homepage': {
    title: 'Homepage Images',
    description: 'Images for the main landing page',
    locations: [
      {
        section: 'Hero Background',
        path: '/screens/home/home.jsx',
        category: 'hero',
        description: 'Large background image behind the main headline',
        recommendedSize: '1920x1080px',
        code: `// Add to hero section
<div className="home-hero" style={{
  backgroundImage: 'url([firebase-storage-url])',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}}>`
      },
      {
        section: 'Service Cards',
        path: '/screens/home/home.jsx',
        category: 'services',
        description: 'Visual representations for each service',
        recommendedSize: '600x400px',
        code: `// Replace emoji icons with images
<img src="[firebase-storage-url]" alt="AI Solutions" className="service-icon" />`
      }
    ]
  },
  'about': {
    title: 'About Page Images',
    description: 'Images for the about page',
    locations: [
      {
        section: 'Team Photo',
        path: '/screens/about/about.jsx',
        category: 'team',
        description: 'Professional team photo',
        recommendedSize: '1200x800px',
        code: `// Add team section
<section className="about-team">
  <img src="[firebase-storage-url]" alt="Our Team" className="team-photo" />
</section>`
      },
      {
        section: 'Office/Workspace',
        path: '/screens/about/about.jsx',
        category: 'office',
        description: 'Modern office or workspace photos',
        recommendedSize: '800x600px',
        code: `// Add workspace section
<div className="workspace-gallery">
  <img src="[firebase-storage-url]" alt="Our Office" />
</div>`
      }
    ]
  },
  'services': {
    title: 'Services Page Images',
    description: 'Images for the services page',
    locations: [
      {
        section: 'Service Illustrations',
        path: '/screens/services/services.jsx',
        category: 'services',
        description: 'Visual representations of each service',
        recommendedSize: '600x400px',
        code: `// Replace emoji icons
<div className="service-icon">
  <img src="[firebase-storage-url]" alt="Service Name" />
</div>`
      }
    ]
  },
  'divisions': {
    title: 'Divisions Page Images',
    description: 'Images for the divisions page',
    locations: [
      {
        section: 'Division Cards',
        path: '/screens/divisions/divisions.jsx',
        category: 'divisions',
        description: 'Visual representations of each division',
        recommendedSize: '600x400px',
        code: `// Add to division cards
<div className="division-image">
  <img src="[firebase-storage-url]" alt="Division Name" />
</div>`
      }
    ]
  }
};

export default function ImageUsageGuide() {
  const [activeTab, setActiveTab] = useState('homepage');

  return (
    <div className="image-usage-guide">
      <div className="image-usage-guide__header">
        <h2>Image Usage Guide</h2>
        <p>Learn how to use uploaded images in your website pages</p>
      </div>

      <div className="image-usage-guide__tabs">
        {Object.entries(USAGE_GUIDES).map(([key, guide]) => (
          <button
            key={key}
            className={`image-usage-guide__tab ${activeTab === key ? 'image-usage-guide__tab--active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {guide.title}
          </button>
        ))}
      </div>

      <div className="image-usage-guide__content">
        {USAGE_GUIDES[activeTab] && (
          <div className="image-usage-guide__section">
            <h3>{USAGE_GUIDES[activeTab].title}</h3>
            <p className="image-usage-guide__description">
              {USAGE_GUIDES[activeTab].description}
            </p>

            <div className="image-usage-guide__locations">
              {USAGE_GUIDES[activeTab].locations.map((location, index) => (
                <div key={index} className="image-usage-guide__location">
                  <div className="image-usage-guide__location-header">
                    <h4>{location.section}</h4>
                    <span className="image-usage-guide__category">
                      Category: {location.category}
                    </span>
                  </div>
                  
                  <div className="image-usage-guide__location-details">
                    <p><strong>File:</strong> {location.path}</p>
                    <p><strong>Description:</strong> {location.description}</p>
                    <p><strong>Recommended Size:</strong> {location.recommendedSize}</p>
                  </div>

                  <div className="image-usage-guide__code">
                    <h5>Implementation Code:</h5>
                    <pre><code>{location.code}</code></pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="image-usage-guide__tips">
        <h3>💡 Pro Tips</h3>
        <ul>
          <li>Use the <strong>Image Picker</strong> component in your admin forms to easily select images</li>
          <li>Images are automatically optimized and available in multiple sizes (thumbnail, medium, large, original)</li>
          <li>Always add descriptive alt text for accessibility</li>
          <li>Use appropriate categories to organize your images</li>
          <li>Copy image URLs from the media manager to use in your code</li>
        </ul>
      </div>
    </div>
  );
}
