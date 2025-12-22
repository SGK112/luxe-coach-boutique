'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '@/data/products';

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  filter?: 'all' | 'new' | 'bestseller' | 'sale';
  limit?: number;
  showViewAll?: boolean;
}

export default function FeaturedProducts({
  title = 'Featured Collection',
  subtitle,
  filter = 'all',
  limit = 4,
  showViewAll = true,
}: FeaturedProductsProps) {
  const filteredProducts = products
    .filter((p) => {
      if (filter === 'new') return p.isNew;
      if (filter === 'bestseller') return p.isBestseller;
      if (filter === 'sale') return p.isSale;
      return true;
    })
    .slice(0, limit);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-light tracking-wider mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          {showViewAll && (
            <Link
              href={`/products${filter !== 'all' ? `?filter=${filter}` : ''}`}
              className="inline-flex items-center gap-2 text-sm tracking-wider uppercase mt-4 md:mt-0 hover:gap-3 transition-all"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 stagger-children">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
