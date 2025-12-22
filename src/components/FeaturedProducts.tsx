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
    <section style={{ padding: '48px 0' }}>
      <div className="container-main">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 300, letterSpacing: '0.02em' }}>
            {title}
          </h2>
          <Link
            href={`/products${filter !== 'all' ? `?filter=${filter}` : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}
          >
            View All
            <ChevronRight style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>

        {/* Grid */}
        <div className="product-grid">
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
