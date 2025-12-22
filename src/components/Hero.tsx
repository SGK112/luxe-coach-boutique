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
    <section style={{ position: 'relative', width: '100%', height: '70vh', minHeight: '400px', backgroundColor: '#f5f5f5' }}>
      <Image
        src={slide.image}
        alt=""
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} />

      {/* Content - Centered */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', color: '#fff', padding: '0 16px'
      }}>
        <div style={{ maxWidth: '500px' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8 }}>
            {slide.subtitle}
          </p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 300, letterSpacing: '0.05em', marginBottom: '24px' }}>
            {slide.title}
          </h1>
          <Link
            href={slide.href}
            style={{
              display: 'inline-block', backgroundColor: '#fff', color: '#000',
              padding: '14px 32px', fontSize: '12px', letterSpacing: '0.15em',
              textTransform: 'uppercase', fontWeight: 500
            }}
          >
            {slide.cta}
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        style={{
          position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
          width: '44px', height: '44px', backgroundColor: 'rgba(255,255,255,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'
        }}
        aria-label="Previous"
      >
        <ChevronLeft style={{ width: '20px', height: '20px' }} />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        style={{
          position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
          width: '44px', height: '44px', backgroundColor: 'rgba(255,255,255,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'
        }}
        aria-label="Next"
      >
        <ChevronRight style={{ width: '20px', height: '20px' }} />
      </button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '24px' : '8px', height: '8px',
              borderRadius: '4px', backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.5)',
              border: 'none', cursor: 'pointer', transition: 'all 0.3s'
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
