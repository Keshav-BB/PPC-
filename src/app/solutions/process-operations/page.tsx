import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { solutions } from '@/data/solutions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Process & Operations Consulting | People Point Consultants',
  description: 'Replace informal operations with repeatable business systems. Workflow mapping, Standard Operating Procedures (SOPs), approval matrices & role scorecards.',
};

export default function ProcessOperationsPage() {
  const solution = solutions.find((s) => s.slug === 'process-operations')!;
  return <ServicePageTemplate solution={solution} />;
}
