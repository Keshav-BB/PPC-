import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://peoplepointconsultants.com'),
  title: 'People Point Consultants | Turn Ideas Into Running Businesses',
  description:
    'Build Your Business. We’ll Build the Systems Behind It. Comprehensive Business Setup, HR & People, Payroll, Compliance, Technology, Operations SOPs & Digital Growth.',
  keywords: [
    'Business Setup',
    'Company Registration India',
    'HR Consulting',
    'Payroll Outsourcing',
    'Statutory Compliance',
    'Custom Software Development',
    'Business SOPs',
    'Digital Marketing Chennai',
    'People Point Consultants'
  ],
  authors: [{ name: 'People Point Consultants' }],
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    title: 'People Point Consultants | Turn Ideas Into Running Businesses',
    description:
      'From registration and hiring to payroll, compliance, technology, operations, and growth — one integrated partner to build the systems behind your business.',
    url: 'https://peoplepointconsultants.com',
    siteName: 'People Point Consultants',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'People Point Consultants Logo'
      }
    ],
    locale: 'en_IN',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
