/**
 * HABS TECHNOLOGIES GROUP
 * Services Page Route
 */

import { Metadata } from 'next';
import ServicesPage from '@/screens/services/services';
import { generateMetadata as generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Services & Pricing',
  description: 'Transparent tiers. Clear deliverables. Flexible add-ons. From starter landing pages to custom e-commerce solutions.',
  url: '/services',
});

export default function Page() {
  return <ServicesPage />;
}















