/**
 * HABS TECHNOLOGIES GROUP
 * Root Layout
 */

import type { Metadata } from 'next';
import { Poppins, Merriweather } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/layout/conditional-layout';
import { AuthProvider } from '@/contexts/auth-context';
import { generateMetadata as generateSEO } from '@/lib/seo';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  ...generateSEO({}),
  icons: {
    icon: '/icons/favicon-96x96.png',
    apple: '/icons/apple-touch-icon.png',
    shortcut: '/icons/favicon-96x96.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${merriweather.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Habs Tech" />
        <link rel="manifest" href="/icons/site.webmanifest" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AuthProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
