import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://x-and-o-clash.whop.app';
  
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/game`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ];
}
