'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    title: 'The Holiday Collection',
    subtitle: 'Discover the perfect gift',
    cta: 'Shop Now',
    href: '/products',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1920&q=85&fit=crop',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Fresh styles for the season',
    cta: 'Explore',
    href: '/products?filter=new',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1920&q=85&fit=crop',
  },
  {
    id: 3,
    title: 'Up to 40% Off',
    subtitle: 'Shop the holiday sale',
    cta: 'Shop Sale',
    href: '/products?filter=sale',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1920&q=85&fit=crop',
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

  const slide = slides[current];

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '85vh',
      minHeight: '500px',
      maxHeight: '900px',
      backgroundColor: '#f8f8f8'
    }}>
      <Image
        src={slide.image}
        alt=""
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        priority
        sizes="100vw"
      />
      {/* Subtle gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)'
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        padding: '0 24px'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <p style={{
            fontSize: '13px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            opacity: 0.9,
            fontWeight: 400
          }}>
            {slide.subtitle}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            marginBottom: '32px',
            lineHeight: 1.1
          }}>
            {slide.title}
          </h1>
          <Link
            href={slide.href}
            style={{
              display: 'inline-block',
              backgroundColor: '#fff',
              color: '#000',
              padding: '18px 48px',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
              transition: 'all 0.3s ease'
            }}
          >
            {slide.cta}
          </Link>
        </div>
      </div>

      {/* Minimal dots */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px'
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '32px' : '8px',
              height: '3px',
              backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s ease'
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
