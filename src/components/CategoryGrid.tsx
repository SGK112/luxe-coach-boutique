'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/products';

export default function CategoryGrid() {
  const displayCategories = categories.slice(0, 4);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="px-4 md:px-8 max-w-[1600px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-light tracking-wide text-center mb-10 md:mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                <span className="text-white text-sm md:text-base tracking-[0.15em] uppercase font-medium">
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
