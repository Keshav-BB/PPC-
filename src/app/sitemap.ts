import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peoplepointconsultants.com';
  const lastModified = new Date();

  const coreRoutes = [
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/packages', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/book-consultation', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/how-we-work', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/industries', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/case-studies', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/assessment', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/solution-builder', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/insights', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/careers', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const solutionRoutes = [
    '/solutions/business-setup',
    '/solutions/hr-people',
    '/solutions/payroll-compliance',
    '/solutions/technology',
    '/solutions/process-operations',
    '/solutions/accounts-backend',
    '/solutions/digital-marketing',
  ].map((path) => ({
    url: path,
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  }));

  const legalRoutes = [
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/data-security',
    '/disclaimer',
    '/refund-policy',
  ].map((path) => ({
    url: path,
    priority: 0.5,
    changeFrequency: 'yearly' as const,
  }));

  return [...coreRoutes, ...solutionRoutes, ...legalRoutes].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
