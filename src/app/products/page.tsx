'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';
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

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) =>
        p.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory ||
        p.category.toLowerCase() === selectedCategory.replace(/-/g, ' ')
      );
    }

    // Filter by special filters
    if (filterParam === 'new') {
      result = result.filter((p) => p.isNew);
    } else if (filterParam === 'sale') {
      result = result.filter((p) => p.isSale);
    } else if (filterParam === 'bestseller') {
      result = result.filter((p) => p.isBestseller);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 py-10">
        <div className="w-full max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-light tracking-wide">
            {getPageTitle()}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {filteredProducts.length} Products
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b sticky top-14 bg-white z-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4 overflow-x-auto hide-scrollbar gap-4">
            {/* Category Pills */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-xs tracking-wide rounded-full border whitespace-nowrap transition-colors ${
                  !selectedCategory ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 text-xs tracking-wide rounded-full border whitespace-nowrap transition-colors ${
                    selectedCategory === cat.slug ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <label className="text-xs text-gray-500">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm font-medium bg-transparent border-0 focus:outline-none cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">No products found</p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-sm underline hover:no-underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
    <div className="min-h-screen">
      <div className="bg-gray-50 py-10">
        <div className="w-full max-w-7xl mx-auto px-4 text-center">
          <div className="h-8 w-48 bg-gray-200 mx-auto rounded animate-pulse" />
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i}>
              <div className="aspect-square bg-gray-200 rounded animate-pulse mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse" />
            </div>
          ))}
        </div>
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
