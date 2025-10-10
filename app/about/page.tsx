/**
 * HABS TECHNOLOGIES GROUP
 * About Page Route
 */

import { Metadata } from 'next';
import AboutPage from '@/screens/about/about';
import { generateMetadata as generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'About Us',
  description: 'We exist to turn imagination into useful technology—from Sierra Leone to the world. Learn about our mission, vision, and values.',
  url: '/about',
});

export default function Page() {
  return <AboutPage />;
}


