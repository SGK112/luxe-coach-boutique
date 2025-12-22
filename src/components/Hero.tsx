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
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] md:h-[80vh] md:min-h-[600px] overflow-hidden bg-[#f5f5f5]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

          {/* Content - Centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-2xl">
              <p className="text-white/80 text-xs md:text-sm tracking-[0.25em] uppercase mb-4">
                {slide.subtitle}
              </p>
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-8">
                {slide.title}
              </h2>
              <Link
                href={slide.href}
                className="inline-flex items-center h-12 px-10 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-100 transition-colors"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
