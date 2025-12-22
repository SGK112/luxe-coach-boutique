import { Product, Category, Review } from '@/types';
import productsData from './products.json';

// Export products and categories from JSON
export const products: Product[] = productsData.products as Product[];
export const categories: Category[] = productsData.categories as Category[];

// Sample reviews (could also be moved to JSON in the future)
export const reviews: Review[] = [
  {
    id: '1',
    author: 'Jennifer M.',
    rating: 5,
    date: '2024-01-15',
    title: 'Absolutely stunning!',
    content: 'This bag exceeded all my expectations. The quality is impeccable.',
    verified: true,
    helpful: 24,
  },
  {
    id: '2',
    author: 'Sarah L.',
    rating: 5,
    date: '2024-01-10',
    title: 'Perfect everyday bag',
    content: 'The size is just right and the leather is so soft.',
    verified: true,
    helpful: 18,
  },
  {
    id: '3',
    author: 'Amanda K.',
    rating: 4,
    date: '2024-01-08',
    title: 'Beautiful but runs small',
    content: 'Gorgeous quality, but smaller than expected. Still love it!',
    verified: true,
    helpful: 12,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isBestseller || p.isNew).slice(0, 4);
}

export function getSaleProducts(): Product[] {
  return products.filter((p) => p.isSale);
}
