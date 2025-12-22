'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light tracking-wider mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover your perfect handbag from our carefully curated collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className={`group relative overflow-hidden ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div
                className={`relative ${
                  index === 0
                    ? 'aspect-square md:aspect-[4/3]'
                    : 'aspect-square'
                } product-image-container`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <h3
                    className={`font-light tracking-wider text-center mb-2 ${
                      index === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                    }`}
                  >
                    {category.name}
                  </h3>
                  {index === 0 && category.description && (
                    <p className="text-sm text-white/80 text-center mb-4 max-w-xs hidden md:block">
                      {category.description}
                    </p>
                  )}
                  <span className="flex items-center gap-2 text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                    Shop Now
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
