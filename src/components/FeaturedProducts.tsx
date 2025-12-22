'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '@/data/products';

interface FeaturedProductsProps {
  title: string;
  filter?: 'all' | 'new' | 'bestseller' | 'sale';
  limit?: number;
}

export default function FeaturedProducts({
  title,
  filter = 'all',
  limit = 4,
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
    <section className="py-10 md:py-14">
      <div className="px-4 md:px-8 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-light tracking-wide">
            {title}
          </h2>
          <Link
            href={`/products${filter !== 'all' ? `?filter=${filter}` : ''}`}
            className="flex items-center gap-1 text-[11px] tracking-[0.1em] uppercase hover:opacity-60 transition-opacity"
          >
            View All
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
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
