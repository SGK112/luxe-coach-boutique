'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
    <section style={{ padding: '80px 0' }}>
      <div className="container-main">
        {/* Header - Minimalist */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '48px'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            color: '#1d1d1f'
          }}>
            {title}
          </h2>
          <Link
            href={`/products${filter !== 'all' ? `?filter=${filter}` : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              letterSpacing: '0.05em',
              fontWeight: 500,
              color: '#1d1d1f',
              paddingBottom: '4px',
              borderBottom: '1px solid #1d1d1f'
            }}
          >
            View All
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>

        {/* Product Grid */}
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
