'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    title: 'The Tabby Collection',
    subtitle: 'Iconic design, reimagined',
    cta: 'Shop Now',
    href: '/products?collection=tabby',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1920&q=80',
  },
  {
    id: 2,
    title: 'Signature Style',
    subtitle: 'Timeless elegance',
    cta: 'Explore',
    href: '/products',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1920&q=80',
  },
  {
    id: 3,
    title: 'Holiday Edit',
    subtitle: 'Up to 40% off',
    cta: 'Shop Sale',
    href: '/products?filter=sale',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1920&q=80',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[60vh] min-h-[400px] md:h-[75vh] md:min-h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt=""
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/25" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
              <div className="max-w-md">
                <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-3">
                  {slide.title}
                </h2>
                <p className="text-white/80 text-base md:text-lg mb-6">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center h-11 px-8 bg-white text-black text-xs tracking-[0.15em] uppercase font-medium hover:bg-gray-100 transition-colors"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === current
                ? 'w-8 bg-white'
                : 'w-1 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
