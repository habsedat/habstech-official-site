/**
 * HABS TECHNOLOGIES GROUP
 * Divisions Page Route
 */

import { Metadata } from 'next';
import DivisionsPage from '@/screens/divisions/divisions';
import { generateMetadata as generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Divisions',
  description: 'One group. Specialized teams. End-to-end delivery. Explore our six specialized divisions from AI to media production.',
  url: '/divisions',
});

export default function Page() {
  return <DivisionsPage />;
}















