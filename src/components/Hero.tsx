'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    title: 'The New Tabby Collection',
    subtitle: 'Iconic design, reimagined',
    cta: 'Shop Now',
    href: '/products?collection=tabby',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1920',
    position: 'left',
  },
  {
    id: 2,
    title: 'Signature Style',
    subtitle: 'Timeless elegance meets modern design',
    cta: 'Explore Collection',
    href: '/products',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1920',
    position: 'right',
  },
  {
    id: 3,
    title: 'Holiday Sale',
    subtitle: 'Up to 40% off select styles',
    cta: 'Shop Sale',
    href: '/products?filter=sale',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1920',
    position: 'center',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div
              className={`max-w-xl ${
                slide.position === 'center'
                  ? 'mx-auto text-center'
                  : slide.position === 'right'
                  ? 'ml-auto text-right'
                  : ''
              }`}
            >
              <h2 className="text-white text-4xl md:text-6xl font-light tracking-wide mb-4 fade-in">
                {slide.title}
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-8 fade-in">
                {slide.subtitle}
              </p>
              <Link
                href={slide.href}
                className={`inline-flex items-center gap-2 btn btn-gold ${
                  slide.position === 'center' ? '' : ''
                }`}
              >
                {slide.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
