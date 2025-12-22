'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');

  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) =>
        p.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory ||
        p.category.toLowerCase() === selectedCategory.replace(/-/g, ' ')
      );
    }

    if (filterParam === 'new') result = result.filter((p) => p.isNew);
    else if (filterParam === 'sale') result = result.filter((p) => p.isSale);
    else if (filterParam === 'bestseller') result = result.filter((p) => p.isBestseller);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
    }

    return result;
  }, [selectedCategory, filterParam, sortBy]);

  const getPageTitle = () => {
    if (filterParam === 'new') return 'New Arrivals';
    if (filterParam === 'sale') return 'Sale';
    if (filterParam === 'bestseller') return 'Bestsellers';
    if (selectedCategory) {
      const cat = categories.find((c) => c.slug === selectedCategory);
      return cat?.name || 'All Handbags';
    }
    return 'All Handbags';
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#fafafa', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(28px, 5vw, 40px)',
          fontWeight: 400,
          letterSpacing: '0.02em',
          color: '#1d1d1f'
        }}>
          {getPageTitle()}
        </h1>
        <p style={{ fontSize: '14px', color: '#86868b', marginTop: '12px' }}>
          {filteredProducts.length} Products
        </p>
      </div>

      {/* Filters */}
      <div style={{
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: '72px',
        backgroundColor: '#fff',
        zIndex: 20
      }}>
        <div className="container-main">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 0',
            gap: '16px',
            overflowX: 'auto'
          }}>
            {/* Category Pills - Apple style */}
            <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }} className="hide-scrollbar">
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  padding: '10px 20px',
                  fontSize: '13px',
                  borderRadius: '24px',
                  border: 'none',
                  backgroundColor: !selectedCategory ? '#1d1d1f' : '#f5f5f7',
                  color: !selectedCategory ? '#fff' : '#1d1d1f',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  style={{
                    padding: '10px 20px',
                    fontSize: '13px',
                    borderRadius: '24px',
                    border: 'none',
                    backgroundColor: selectedCategory === cat.slug ? '#1d1d1f' : '#f5f5f7',
                    color: selectedCategory === cat.slug ? '#fff' : '#1d1d1f',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <span style={{ fontSize: '13px', color: '#86868b' }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  color: '#1d1d1f',
                  outline: 'none'
                }}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-main" style={{ padding: '48px 20px 80px' }}>
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: '#86868b', marginBottom: '20px', fontSize: '15px' }}>No products found</p>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                padding: '14px 32px',
                backgroundColor: '#1d1d1f',
                color: '#fff',
                border: 'none',
                borderRadius: '24px',
                cursor: 'pointer'
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#fafafa', padding: '60px 0', textAlign: 'center' }}>
        <div style={{
          height: '40px',
          width: '200px',
          backgroundColor: '#e0e0e0',
          margin: '0 auto',
          borderRadius: '4px'
        }} />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductsContent />
    </Suspense>
  );
}
