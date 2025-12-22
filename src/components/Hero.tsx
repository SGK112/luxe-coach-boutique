'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'The Holiday Collection',
    subtitle: 'Discover the perfect gift',
    cta: 'Shop Now',
    href: '/products',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1920&q=85&fit=crop',
    accent: '#c9a050',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Fresh styles for the season',
    cta: 'Explore',
    href: '/products?filter=new',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1920&q=85&fit=crop',
    accent: '#8b7355',
  },
  {
    id: 3,
    title: 'Up to 40% Off',
    subtitle: 'Shop the holiday sale',
    cta: 'Shop Sale',
    href: '/products?filter=sale',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1920&q=85&fit=crop',
    accent: '#bf4800',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const slide = slides[current];

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '90vh',
      minHeight: '600px',
      maxHeight: '1000px',
      backgroundColor: '#0a0a0a',
      overflow: 'hidden'
    }}>
      {/* Background Image with Ken Burns effect */}
      <div style={{
        position: 'absolute',
        inset: '-5%',
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out',
        animation: 'kenBurns 12s ease-in-out infinite alternate'
      }}>
        <Image
          src={slide.image}
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)'
      }} />

      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '150px',
        height: '150px',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '50%',
        opacity: 0.5
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: '100px',
        height: '100px',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '50%',
        opacity: 0.5
      }} />

      {/* Main Content */}
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
        <div style={{
          maxWidth: '800px',
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
          transition: 'all 0.5s ease-out'
        }}>
          {/* Accent Line */}
          <div style={{
            width: '60px',
            height: '2px',
            background: `linear-gradient(90deg, ${slide.accent}, transparent)`,
            margin: '0 auto 24px'
          }} />

          {/* Subtitle */}
          <p style={{
            fontSize: '14px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginBottom: '20px',
            opacity: 0.85,
            fontWeight: 400
          }}>
            {slide.subtitle}
          </p>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            marginBottom: '40px',
            lineHeight: 1.1,
            textShadow: '0 4px 30px rgba(0,0,0,0.3)'
          }}>
            {slide.title}
          </h1>

          {/* CTA Button */}
          <Link
            href={slide.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#fff',
              color: '#1d1d1f',
              padding: '20px 48px',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              borderRadius: '50px',
              transition: 'all 0.4s ease',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
          >
            {slide.cta}
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        style={{
          position: 'absolute',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          opacity: 0.7
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft style={{ width: '24px', height: '24px' }} />
      </button>
      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          opacity: 0.7
        }}
        aria-label="Next slide"
      >
        <ChevronRight style={{ width: '24px', height: '24px' }} />
      </button>

      {/* Progress Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrent(i);
                setIsTransitioning(false);
              }, 300);
            }}
            style={{
              width: i === current ? '48px' : '12px',
              height: '4px',
              backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.3)',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === current && (
              <span style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor: slide.accent,
                animation: 'progress 6s linear',
                width: '100%'
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        right: '48px',
        display: 'flex',
        alignItems: 'baseline',
        gap: '4px',
        color: '#fff',
        fontFamily: 'var(--font-playfair), Georgia, serif'
      }}>
        <span style={{ fontSize: '24px', fontWeight: 400 }}>
          {String(current + 1).padStart(2, '0')}
        </span>
        <span style={{ fontSize: '14px', opacity: 0.5 }}>/</span>
        <span style={{ fontSize: '14px', opacity: 0.5 }}>
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        left: '48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        color: '#fff',
        opacity: 0.6
      }}>
        <span style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)'
        }}>
          Scroll
        </span>
        <div style={{
          width: '1px',
          height: '40px',
          backgroundColor: 'rgba(255,255,255,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            backgroundColor: '#fff',
            animation: 'scrollLine 2s ease-in-out infinite'
          }} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
