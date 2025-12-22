'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'The Holiday Collection',
    subtitle: 'Discover the perfect gift',
    cta: 'Shop Now',
    href: '/products',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1920&q=80',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Fresh styles for the season',
    cta: 'Explore',
    href: '/products?filter=new',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1920&q=80',
  },
  {
    id: 3,
    title: 'Up to 40% Off',
    subtitle: 'Shop the holiday sale',
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

  const slide = slides[current];

  return (
    <section className="relative w-full h-[60vh] min-h-[400px] md:h-[70vh] bg-gray-100">
      {/* Background Image */}
      <Image
        src={slide.image}
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
        <div className="max-w-lg">
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase mb-3 opacity-80">
            {slide.subtitle}
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
            {slide.title}
          </h1>
          <Link
            href={slide.href}
            className="inline-block bg-white text-black px-8 py-3 text-xs tracking-[0.15em] uppercase font-medium hover:bg-gray-100 transition-colors"
          >
            {slide.cta}
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
