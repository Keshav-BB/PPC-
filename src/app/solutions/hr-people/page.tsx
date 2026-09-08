import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { solutions } from '@/data/solutions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HR & People Operations Consulting | People Point Consultants',
  description: 'Build the team and people systems your business needs. Talent acquisition, employment contracts, employee handbook, KRA/KPIs & managed HR.',
};

export default function HRPeoplePage() {
  const solution = solutions.find((s) => s.slug === 'hr-people')!;
  return <ServicePageTemplate solution={solution} />;
}
