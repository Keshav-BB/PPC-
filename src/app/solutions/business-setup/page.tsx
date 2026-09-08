import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { solutions } from '@/data/solutions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Setup & Registration Services | People Point Consultants',
  description: 'Start your business with the right legal and operational foundation. Pvt Ltd / LLP incorporation, GST, MSME, bank setup, and launch roadmap.',
};

export default function BusinessSetupPage() {
  const solution = solutions.find((s) => s.slug === 'business-setup')!;
  return <ServicePageTemplate solution={solution} />;
}
