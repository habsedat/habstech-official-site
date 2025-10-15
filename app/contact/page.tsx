/**
 * HABS TECHNOLOGIES GROUP
 * Contact Page Route
 */

import { Metadata } from 'next';
import ContactPage from '@/screens/contact/contact';
import { generateMetadata as generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Contact Us',
  description: "Let's build something great. Send a note and we'll get back within one business day.",
  url: '/contact',
});

export default function Page() {
  return <ContactPage />;
}















