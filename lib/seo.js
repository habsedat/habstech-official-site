/**
 * HABS TECHNOLOGIES GROUP
 * SEO Helper Functions
 */

/**
 * Default SEO configuration
 */
export const defaultSEO = {
  siteName: 'Habs Technologies Group',
  title: 'Habs Technologies Group — Imagination in Motion',
  description: 'We design, build, and deploy modern AI and software solutions—fast, secure, and production-ready. From Sierra Leone to the world.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://habstechnologies.com',
  ogImage: '/logo.png',
  twitterHandle: '@HabsTech',
  keywords: [
    'AI solutions',
    'web development',
    'app development',
    'creative tech',
    'Sierra Leone tech',
    'African technology',
    'artificial intelligence',
    'software development',
  ],
};

/**
 * Generate page metadata
 */
export function generateMetadata({ title, description, image, url, keywords = [] }) {
  const fullTitle = title ? `${title} — ${defaultSEO.siteName}` : defaultSEO.title;
  const fullDescription = description || defaultSEO.description;
  const fullImage = image || defaultSEO.ogImage;
  const fullURL = url ? `${defaultSEO.url}${url}` : defaultSEO.url;
  const allKeywords = [...defaultSEO.keywords, ...keywords].join(', ');
  
  return {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullURL,
      siteName: defaultSEO.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: defaultSEO.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate structured data (JSON-LD)
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Habs Technologies Group',
    alternateName: 'Habs',
    url: defaultSEO.url,
    logo: `${defaultSEO.url}/logo.png`,
    description: defaultSEO.description,
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@habstechnologies.com',
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${defaultSEO.url}${item.url}`,
    })),
  };
}


