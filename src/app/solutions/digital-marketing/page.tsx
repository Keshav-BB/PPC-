import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { solutions } from '@/data/solutions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Marketing & Growth Services | People Point Consultants',
  description: 'Turn marketing activity into measurable business growth. Meta Ads, Google Ads, conversion-optimized landing pages, SEO & transparent ROAS dashboards.',
};

export default function DigitalMarketingPage() {
  const solution = solutions.find((s) => s.slug === 'digital-marketing')!;
  return <ServicePageTemplate solution={solution} />;
}
