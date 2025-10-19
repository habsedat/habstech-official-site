/**
 * HABS TECHNOLOGIES GROUP
 * SEO Helper Functions
 */

import { Metadata } from 'next';

/**
 * Default SEO configuration
 */
export const defaultSEO = {
  siteName: 'Habs Technologies Group',
  title: 'Habs Technologies Group — Imagination in Motion',
  description: 'We design, build, and deploy modern AI and software solutions—fast, secure, and production-ready. From Sierra Leone to the world.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://habs-tech-prod.web.app',
  ogImage: 'https://habs-tech-prod.web.app/og-image.png',
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
 * SEO configuration interface
 */
interface SEOConfig {
  title?: string;
  description?: string;
  image?: string | null;
  url?: string;
  keywords?: string[];
}

/**
 * Generate page metadata
 */
export function generateMetadata({ title, description, image = null, url, keywords }: SEOConfig = {}): Metadata {
  const fullTitle = title ? `${title} — ${defaultSEO.siteName}` : defaultSEO.title;
  const fullDescription = description || defaultSEO.description;
  const fullImage = image || defaultSEO.ogImage;
  const fullURL = url ? `${defaultSEO.url}${url}` : defaultSEO.url;
  const allKeywords = [...defaultSEO.keywords, ...(keywords || [])].join(', ');
  
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
          url: fullImage.startsWith('http') ? fullImage : `${defaultSEO.url}${fullImage}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: 'image/png',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage.startsWith('http') ? fullImage : `${defaultSEO.url}${fullImage}`],
      creator: defaultSEO.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
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
 * Breadcrumb item interface
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
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


