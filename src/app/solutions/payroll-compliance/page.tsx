import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { solutions } from '@/data/solutions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payroll & Compliance Services | People Point Consultants',
  description: 'Accurate monthly payroll processing, statutory compliance (PF, ESI, Professional Tax, TDS), digital payslips, and HRMS support across India & overseas.',
};

export default function PayrollCompliancePage() {
  const solution = solutions.find((s) => s.slug === 'payroll-compliance')!;
  return <ServicePageTemplate solution={solution} />;
}
