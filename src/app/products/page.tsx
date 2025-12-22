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
  { value: 'rating', label: 'Top Rated' },
];

const colorFilters = [
  { name: 'Black', hex: '#000000' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Tan', hex: '#D2B48C' },
  { name: 'Ivory', hex: '#FFFFF0' },
  { name: 'Red', hex: '#C41E3A' },
  { name: 'Pink', hex: '#FFC0CB' },
  { name: 'Blue', hex: '#4169E1' },
];

const priceFilters = [
  { label: 'Under $300', min: 0, max: 299 },
  { label: '$300 - $500', min: 300, max: 500 },
  { label: '$500 - $700', min: 500, max: 700 },
  { label: 'Over $700', min: 700, max: 2000 },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');

  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

    // Filter by color
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    // Filter by price
    if (selectedPrice) {
      const priceFilter = priceFilters.find((f) => f.label === selectedPrice);
      if (priceFilter) {
        result = result.filter(
          (p) => p.price >= priceFilter.min && p.price <= priceFilter.max
        );
      }
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
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [selectedCategories, filterParam, selectedColors, selectedPrice, sortBy]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((c) => c !== slug)
        : [...prev, slug]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedPrice(null);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedColors.length > 0 || selectedPrice;

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

  const FilterDropdown = ({
    label,
    id,
    children
  }: {
    label: string;
    id: string;
    children: React.ReactNode;
  }) => {
    const isOpen = openDropdown === id;

    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 rounded-full text-sm font-medium hover:border-gray-400 transition-colors"
        >
          {label}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpenDropdown(null)}
            />
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[200px] p-4">
              {children}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-light tracking-wide text-center">
            {getPageTitle()}
          </h1>
          <p className="text-gray-500 text-sm text-center mt-2">
            {filteredProducts.length} Products
          </p>
        </div>
      </div>

      {/* Filter Bar - Horizontal Pills */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-4 overflow-x-auto hide-scrollbar">
            {/* Category Filter */}
            <FilterDropdown label="Category" id="category">
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
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
            </FilterDropdown>

            {/* Color Filter */}
            <FilterDropdown label="Color" id="color">
              <div className="grid grid-cols-2 gap-2">
                {colorFilters.map((color) => (
                  <label
                    key={color.name}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color.name)}
                      onChange={() => toggleColor(color.name)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        selectedColors.includes(color.name)
                          ? 'border-black'
                          : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm">{color.name}</span>
                  </label>
                ))}
              </div>
            </FilterDropdown>

            {/* Price Filter */}
            <FilterDropdown label="Price" id="price">
              <div className="space-y-2">
                {priceFilters.map((price) => (
                  <label
                    key={price.label}
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPrice === price.label}
                      onChange={() => setSelectedPrice(price.label)}
                      className="w-4 h-4 border-gray-300 text-black focus:ring-black"
                    />
                    <span className="text-sm">{price.label}</span>
                  </label>
                ))}
              </div>
            </FilterDropdown>

            {/* Clear All */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-4 py-2.5 text-sm text-gray-600 hover:text-black transition-colors whitespace-nowrap"
              >
                Clear All
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Sort */}
            <div className="relative flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent text-sm font-medium pr-6 cursor-pointer focus:outline-none border-0"
              >
                <option value="" disabled>Sort By</option>
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
      </div>

      {/* Active Filters Tags */}
      {hasActiveFilters && (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((slug) => {
              const cat = categories.find((c) => c.slug === slug);
              return (
                <button
                  key={slug}
                  onClick={() => toggleCategory(slug)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  {cat?.name}
                  <X className="w-3.5 h-3.5" />
                </button>
              );
            })}
            {selectedColors.map((color) => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                {color}
                <X className="w-3.5 h-3.5" />
              </button>
            ))}
            {selectedPrice && (
              <button
                onClick={() => setSelectedPrice(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                {selectedPrice}
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No products found matching your criteria</p>
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center h-11 px-6 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="bg-white border-b py-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-gray-100 mx-auto rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-100 mx-auto mt-2 rounded animate-pulse" />
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square bg-white rounded animate-pulse" />
              <div className="h-3 bg-gray-100 rounded w-3/4 mx-auto animate-pulse" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto animate-pulse" />
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
