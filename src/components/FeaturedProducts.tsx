'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '@/data/products';

interface FeaturedProductsProps {
  title: string;
  filter?: 'all' | 'new' | 'bestseller' | 'sale';
  limit?: number;
  showViewAll?: boolean;
}

export default function FeaturedProducts({
  title,
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
    <section className="py-16 md:py-20 bg-[#faf9f7]">
      <div className="px-4 md:px-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-light tracking-wide">
            {title}
          </h2>
          {showViewAll && (
            <Link
              href={`/products${filter !== 'all' ? `?filter=${filter}` : ''}`}
              className="flex items-center gap-1 text-xs tracking-[0.15em] uppercase font-medium hover:opacity-60 transition-opacity"
            >
              View All
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
