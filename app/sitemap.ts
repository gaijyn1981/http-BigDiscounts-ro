import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

const categories = [
  "Electronics & Tech", "Phone & Accessories", "Clothing & Fashion",
  "Home & Living", "Garden & Outdoor", "Pets", "Baby & Kids",
  "Health & Beauty", "Toys & Games", "Sports & Fitness", "Food & Drink",
  "Books & Stationery", "Tools & DIY", "Automotive", "Arts & Crafts",
  "Office & Business", "Gifts & Seasonal", "Cleaning & Household", "Other"
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    where: { active: true },
    select: { id: true, createdAt: true }
  })

  const productUrls = products.map(product => ({
    url: `https://www.bigdiscounts.ro/product/${product.id}`,
    lastModified: product.createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  const categoryUrls = categories.map(cat => ({
    url: `https://www.bigdiscounts.ro/browse/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  return [
    { url: 'https://www.bigdiscounts.ro', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://www.bigdiscounts.ro/browse', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...categoryUrls,
    { url: 'https://www.bigdiscounts.ro/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://www.bigdiscounts.ro/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://www.bigdiscounts.ro/terms', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://www.bigdiscounts.ro/privacy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...productUrls
  ]
}
