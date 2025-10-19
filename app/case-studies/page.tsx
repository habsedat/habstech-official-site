/**
 * HABS TECHNOLOGIES GROUP
 * Case Studies Page Route
 */

import { Metadata } from 'next';
import CaseStudiesPage from '@/screens/case-studies/case-studies';
import { generateMetadata as generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Case Studies',
  description: 'From idea to live product—outcomes that matter. See how we help businesses build and scale with technology.',
  url: '/case-studies',
});

export default function Page() {
  return <CaseStudiesPage />;
}





















