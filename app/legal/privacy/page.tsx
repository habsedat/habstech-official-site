/**
 * HABS TECHNOLOGIES GROUP
 * Privacy Policy Page Route
 */

import { Metadata } from 'next';
import PrivacyPage from '@/screens/legal/privacy';
import { generateMetadata as generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Privacy Policy',
  description: 'Learn how Habs Technologies Group collects, uses, and protects your personal data.',
  url: '/legal/privacy',
});

export default function Page() {
  return <PrivacyPage />;
}















