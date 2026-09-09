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
  title: {
    default: 'People Point Consultants | Turn Ideas Into Running Businesses',
    template: '%s | People Point Consultants',
  },
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
    'People Point Consultants',
  ],
  authors: [{ name: 'People Point Consultants' }],
  creator: 'People Point Consultants',
  publisher: 'People Point Consultants',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
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
        alt: 'People Point Consultants Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'People Point Consultants | Turn Ideas Into Running Businesses',
    description:
      'Build Your Business. We’ll Build the Systems Behind It. Comprehensive Business Setup, HR, Payroll, Compliance, Technology & SOPs.',
    images: ['/logo.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://peoplepointconsultants.com/#organization',
      name: 'People Point Consultants',
      url: 'https://peoplepointconsultants.com',
      logo: 'https://peoplepointconsultants.com/logo.png',
      description:
        'Comprehensive business setup, HR, payroll outsourcing, statutory compliance, custom software, and operational SOPs provider headquartered in Chennai, India.',
      telephone: '+91 88073 04713',
      email: 'peoplepointconsultant@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
      sameAs: ['https://wa.me/918807304713'],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://peoplepointconsultants.com/#service',
      name: 'People Point Consultants',
      url: 'https://peoplepointconsultants.com',
      logo: 'https://peoplepointconsultants.com/logo.png',
      image: 'https://peoplepointconsultants.com/logo.png',
      telephone: '+91 88073 04713',
      email: 'peoplepointconsultant@gmail.com',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          opens: '09:30',
          closes: '18:30',
        },
      ],
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Business Infrastructure & Operations Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Business Setup & Company Registration',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'HR Systems, Policies & Recruitment Support',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Payroll Processing & Statutory Compliance (PF, ESI, PT, TDS, GST)',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Software Development, Web Portals & CRM',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Operational SOPs, Workflows & Governance Systems',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: '30-Day Business Launch Implementation',
            },
          },
        ],
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
