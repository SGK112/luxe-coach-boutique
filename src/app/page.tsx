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

      {/* Features */}
      <section style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div className="container-main">
          <div className="features-grid" style={{ padding: '20px 0' }}>
            {features.map((feature) => (
              <div key={feature.text} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <feature.icon style={{ width: '16px', height: '16px', color: '#666' }} />
                <span style={{ fontSize: '11px', color: '#666' }}>{feature.text}</span>
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

      {/* Sale Banner */}
      <section style={{ backgroundColor: '#000', color: '#fff' }}>
        <div className="container-main" style={{ padding: '64px 16px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: '12px' }}>
            Limited Time
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 300, letterSpacing: '0.02em', marginBottom: '16px' }}>
            Holiday Sale
          </h2>
          <p style={{ fontSize: '14px', color: '#999', marginBottom: '24px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
            Up to 40% off select designer handbags. The perfect gift awaits.
          </p>
          <Link
            href="/products?filter=sale"
            style={{
              display: 'inline-block', backgroundColor: '#fff', color: '#000',
              padding: '14px 32px', fontSize: '12px', letterSpacing: '0.15em',
              textTransform: 'uppercase', fontWeight: 500
            }}
          >
            Shop Sale
          </Link>
        </div>
      </section>

      {/* More Products */}
      <FeaturedProducts title="More to Explore" filter="all" limit={8} />
    </>
  );
}
