import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { solutions } from '@/data/solutions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accounts & Backend Support Services | People Point Consultants',
  description: 'The operational backbone behind your business. Bookkeeping coordination, vendor reconciliation, document archival, and executive monthly MIS reports.',
};

export default function AccountsBackendPage() {
  const solution = solutions.find((s) => s.slug === 'accounts-backend')!;
  return <ServicePageTemplate solution={solution} />;
}
