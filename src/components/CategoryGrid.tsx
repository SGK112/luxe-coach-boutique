'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/products';

export default function CategoryGrid() {
  const displayCategories = categories.slice(0, 4);

  return (
    <section style={{ padding: '48px 0', backgroundColor: '#fafafa' }}>
      <div className="container-main">
        <h2 style={{ fontSize: '20px', fontWeight: 300, letterSpacing: '0.02em', textAlign: 'center', marginBottom: '32px' }}>
          Shop by Category
        </h2>

        <div className="category-grid">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              style={{ display: 'block', position: 'relative', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#e5e5e5' }}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', textAlign: 'center' }}>
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
