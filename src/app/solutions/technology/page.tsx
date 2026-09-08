import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { solutions } from '@/data/solutions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Software & Technology Services | People Point Consultants',
  description: 'Technology built around how your business actually works. Custom Next.js web applications, CRM implementation, workflow automation & API integrations.',
};

export default function TechnologyPage() {
  const solution = solutions.find((s) => s.slug === 'technology')!;
  return <ServicePageTemplate solution={solution} />;
}
