'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/products';

export default function CategoryGrid() {
  const displayCategories = categories.slice(0, 4);

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-light tracking-wide text-center mb-8">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-gray-200"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <span className="text-white text-sm md:text-base font-medium tracking-wider uppercase">
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
