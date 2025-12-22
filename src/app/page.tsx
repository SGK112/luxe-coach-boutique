import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryGrid from '@/components/CategoryGrid';
import Link from 'next/link';
import { Truck, RotateCcw, Shield, CreditCard } from 'lucide-react';

const features = [
  { icon: Truck, text: 'Free Shipping $150+' },
  { icon: RotateCcw, text: '30-Day Returns' },
  { icon: Shield, text: '100% Authentic' },
  { icon: CreditCard, text: 'Secure Checkout' },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Features Bar - Minimal */}
      <section style={{ borderBottom: '1px solid #f0f0f0' }}>
        <div className="container-main">
          <div className="features-grid" style={{ padding: '24px 0' }}>
            {features.map((feature) => (
              <div key={feature.text} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <feature.icon style={{ width: '18px', height: '18px', color: '#86868b' }} />
                <span style={{ fontSize: '12px', color: '#86868b', letterSpacing: '0.02em' }}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <FeaturedProducts title="New Arrivals" filter="new" limit={4} />

      {/* Categories */}
      <CategoryGrid />

      {/* Bestsellers */}
      <FeaturedProducts title="Bestsellers" filter="bestseller" limit={4} />

      {/* Sale Banner - Minimalist */}
      <section style={{ backgroundColor: '#1d1d1f', color: '#fff' }}>
        <div className="container-main" style={{
          padding: '100px 20px',
          textAlign: 'center'
        }}>
          <span style={{
            fontSize: '12px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#86868b',
            display: 'block',
            marginBottom: '16px'
          }}>
            Limited Time
          </span>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            marginBottom: '20px'
          }}>
            Holiday Sale
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#86868b',
            marginBottom: '36px',
            maxWidth: '450px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6
          }}>
            Up to 40% off select designer handbags. The perfect gift awaits.
          </p>
          <Link
            href="/products?filter=sale"
            style={{
              display: 'inline-block',
              backgroundColor: '#fff',
              color: '#1d1d1f',
              padding: '18px 48px',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
              borderRadius: '2px'
            }}
          >
            Shop Sale
          </Link>
        </div>
      </section>

      {/* More to Explore */}
      <FeaturedProducts title="More to Explore" filter="all" limit={8} />
    </>
  );
}
