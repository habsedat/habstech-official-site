/**
 * HABS TECHNOLOGIES GROUP
 * Application Form Page Route
 */

import { Metadata } from 'next';
import ApplicationPage from '@/screens/application/application';
import { generateMetadata as generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Start a Project',
  description: 'Fill this short brief and we will reply with next steps and a proposed scope within 24 hours.',
  url: '/application',
});

export default function Page() {
  return <ApplicationPage />;
}

