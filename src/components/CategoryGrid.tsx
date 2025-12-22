'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/products';

export default function CategoryGrid() {
  const displayCategories = categories.slice(0, 4);

  return (
    <section className="py-10 md:py-14 bg-[#f8f7f5]">
      <div className="px-4 md:px-8 max-w-[1440px] mx-auto">
        <h2 className="text-xl md:text-2xl font-light tracking-wide text-center mb-6 md:mb-8">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-end p-4">
                <span className="text-white text-sm md:text-base font-light tracking-wide">
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
