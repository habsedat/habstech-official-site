/**
 * HABS TECHNOLOGIES GROUP
 * Terms of Service Page Route
 */

import { Metadata } from 'next';
import TermsPage from '@/screens/legal/terms';
import { generateMetadata as generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using Habs Technologies Group services.',
  url: '/legal/terms',
});

export default function Page() {
  return <TermsPage />;
}





















