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
      <div style={{ backgroundColor: '#fafafa', padding: '40px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '0.02em' }}>{getPageTitle()}</h1>
        <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>{filteredProducts.length} Products</p>
      </div>

      {/* Filters */}
      <div style={{ borderBottom: '1px solid #e5e5e5', position: 'sticky', top: '60px', backgroundColor: '#fff', zIndex: 20 }}>
        <div className="container-main">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', gap: '16px', overflowX: 'auto' }}>
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  padding: '8px 16px', fontSize: '12px', borderRadius: '20px', border: '1px solid',
                  borderColor: !selectedCategory ? '#000' : '#ddd',
                  backgroundColor: !selectedCategory ? '#000' : '#fff',
                  color: !selectedCategory ? '#fff' : '#000',
                  cursor: 'pointer', whiteSpace: 'nowrap'
                }}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  style={{
                    padding: '8px 16px', fontSize: '12px', borderRadius: '20px', border: '1px solid',
                    borderColor: selectedCategory === cat.slug ? '#000' : '#ddd',
                    backgroundColor: selectedCategory === cat.slug ? '#000' : '#fff',
                    color: selectedCategory === cat.slug ? '#fff' : '#000',
                    cursor: 'pointer', whiteSpace: 'nowrap'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <span style={{ fontSize: '12px', color: '#666' }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ fontSize: '13px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
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
      <div className="container-main" style={{ padding: '32px 16px' }}>
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ color: '#666', marginBottom: '16px' }}>No products found</p>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{ fontSize: '13px', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}
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
      <div style={{ backgroundColor: '#fafafa', padding: '40px 0', textAlign: 'center' }}>
        <div style={{ height: '32px', width: '200px', backgroundColor: '#e5e5e5', margin: '0 auto', borderRadius: '4px' }} />
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
