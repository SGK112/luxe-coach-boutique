'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/products';

export default function CategoryGrid() {
  const displayCategories = categories.slice(0, 4);

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#fafafa' }}>
      <div className="container-main">
        <h2 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(24px, 4vw, 32px)',
          fontWeight: 400,
          letterSpacing: '0.02em',
          textAlign: 'center',
          marginBottom: '48px',
          color: '#1d1d1f'
        }}>
          Shop by Category
        </h2>

        <div className="category-grid">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              style={{
                display: 'block',
                position: 'relative',
                aspectRatio: '3/4',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px'
              }}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease'
                }}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Subtle gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)'
              }} />
              {/* Category name */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                textAlign: 'center'
              }}>
                <span style={{
                  color: '#fff',
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  letterSpacing: '0.05em'
                }}>
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
