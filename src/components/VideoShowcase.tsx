'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section style={{ backgroundColor: '#fafafa', padding: '100px 0' }}>
      <div className="container-main">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            fontSize: '12px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#86868b',
            display: 'block',
            marginBottom: '16px'
          }}>
            The Tabby Collection
          </span>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            color: '#1d1d1f',
            marginBottom: '16px'
          }}>
            Crafted for Every Moment
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#86868b',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Experience the artistry of our signature Tabby bag, where timeless design meets modern craftsmanship.
          </p>
        </div>

        {/* Video Container */}
        <div style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
        }}>
          <video
            ref={videoRef}
            src="/videos/tabby-showcase.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              display: 'block',
              backgroundColor: '#000'
            }}
          />

          {/* Video Controls */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            display: 'flex',
            gap: '8px'
          }}>
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause style={{ width: '18px', height: '18px', color: '#1d1d1f' }} />
              ) : (
                <Play style={{ width: '18px', height: '18px', color: '#1d1d1f', marginLeft: '2px' }} />
              )}
            </button>

            {/* Mute/Unmute */}
            <button
              onClick={toggleMute}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX style={{ width: '18px', height: '18px', color: '#1d1d1f' }} />
              ) : (
                <Volume2 style={{ width: '18px', height: '18px', color: '#1d1d1f' }} />
              )}
            </button>
          </div>

          {/* CTA Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px'
          }}>
            <Link
              href="/products?filter=bestseller"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                backgroundColor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(8px)',
                color: '#1d1d1f',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.03em',
                textDecoration: 'none',
                transition: 'transform 0.2s'
              }}
            >
              Shop the Collection
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginTop: '64px',
          maxWidth: '900px',
          margin: '64px auto 0'
        }}>
          {[
            { title: 'Premium Leather', desc: 'Crafted from the finest glovetanned leather' },
            { title: 'Signature Hardware', desc: 'Polished gold-tone turnlock closure' },
            { title: 'Versatile Design', desc: 'Wear crossbody or on the shoulder' },
          ].map((feature) => (
            <div
              key={feature.title}
              style={{
                padding: '32px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <h3 style={{
                fontSize: '15px',
                fontWeight: 500,
                color: '#1d1d1f',
                marginBottom: '8px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#86868b',
                lineHeight: 1.5
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
