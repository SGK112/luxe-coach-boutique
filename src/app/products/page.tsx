'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, Grid, LayoutGrid, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');

  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.some(
          (cat) =>
            p.category.toLowerCase().replace(/\s+/g, '-') === cat ||
            p.category.toLowerCase() === cat.replace(/-/g, ' ')
        )
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

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

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
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [selectedCategories, filterParam, priceRange, sortBy]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((c) => c !== slug)
        : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
  };

  const getPageTitle = () => {
    if (filterParam === 'new') return 'New Arrivals';
    if (filterParam === 'sale') return 'Sale';
    if (filterParam === 'bestseller') return 'Bestsellers';
    if (selectedCategories.length === 1) {
      const cat = categories.find((c) => c.slug === selectedCategories[0]);
      return cat?.name || 'All Handbags';
    }
    return 'All Handbags';
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-light tracking-wider text-center">
            {getPageTitle()}
          </h1>
          <p className="text-gray-600 text-center mt-2">
            {filteredProducts.length} products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000) && (
              <span className="w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                {selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)}
              </span>
            )}
          </button>

          <div className="flex items-center gap-4">
            {/* Grid Toggle */}
            <div className="hidden md:flex items-center gap-2 border-r pr-4">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 ${gridCols === 2 ? 'text-black' : 'text-gray-400'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 ${gridCols === 3 ? 'text-black' : 'text-gray-400'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 ${gridCols === 4 ? 'text-black' : 'text-gray-400'}`}
              >
                <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                </div>
              </button>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent text-sm font-medium pr-6 cursor-pointer focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? 'block' : 'hidden'
            } w-64 flex-shrink-0 lg:block`}
          >
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm uppercase tracking-wider">
                  Filters
                </h3>
                {(selectedCategories.length > 0 ||
                  priceRange[0] > 0 ||
                  priceRange[1] < 1000) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gray-500 hover:text-black underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.slug)}
                        onChange={() => toggleCategory(category.slug)}
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Price</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Under $300', range: [0, 299] },
                    { label: '$300 - $500', range: [300, 500] },
                    { label: '$500 - $700', range: [500, 700] },
                    { label: 'Over $700', range: [700, 1000] },
                  ].map((option) => (
                    <label
                      key={option.label}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={
                          priceRange[0] === option.range[0] &&
                          priceRange[1] === option.range[1]
                        }
                        onChange={() =>
                          setPriceRange(option.range as [number, number])
                        }
                        className="w-4 h-4 border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map((slug) => {
                  const cat = categories.find((c) => c.slug === slug);
                  return (
                    <button
                      key={slug}
                      onClick={() => toggleCategory(slug)}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200"
                    >
                      {cat?.name}
                      <X className="w-3 h-3" />
                    </button>
                  );
                })}
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">No products found</p>
                <button
                  onClick={clearFilters}
                  className="btn btn-outline text-sm"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-4 md:gap-6 ${
                  gridCols === 2
                    ? 'grid-cols-2'
                    : gridCols === 3
                    ? 'grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-2 lg:grid-cols-4'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 w-48 bg-gray-200 shimmer mx-auto rounded" />
          <div className="h-5 w-24 bg-gray-200 shimmer mx-auto mt-2 rounded" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square bg-gray-200 shimmer rounded" />
              <div className="h-4 bg-gray-200 shimmer rounded w-3/4" />
              <div className="h-4 bg-gray-200 shimmer rounded w-1/2" />
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
