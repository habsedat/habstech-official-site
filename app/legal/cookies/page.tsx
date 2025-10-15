/**
 * HABS TECHNOLOGIES GROUP
 * Cookie Policy Page Route
 */

import { Metadata } from 'next';
import CookiesPage from '@/screens/legal/cookies';
import { generateMetadata as generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Cookie Policy',
  description: 'Learn about how Habs Technologies Group uses cookies to improve your experience.',
  url: '/legal/cookies',
});

export default function Page() {
  return <CookiesPage />;
}















