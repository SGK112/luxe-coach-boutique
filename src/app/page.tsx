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

      {/* Features Strip */}
      <section className="border-b">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            {features.map((feature) => (
              <div key={feature.text} className="flex items-center justify-center gap-2">
                <feature.icon className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <FeaturedProducts title="New Arrivals" filter="new" limit={4} />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Bestsellers */}
      <FeaturedProducts title="Bestsellers" filter="bestseller" limit={4} />

      {/* Sale Banner */}
      <section className="bg-black text-white">
        <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          <span className="text-[11px] tracking-[0.3em] uppercase text-gray-400 block mb-3">
            Limited Time
          </span>
          <h2 className="text-2xl md:text-4xl font-light tracking-wide mb-4">
            Holiday Sale
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
            Up to 40% off select designer handbags. The perfect gift awaits.
          </p>
          <Link
            href="/products?filter=sale"
            className="inline-block bg-white text-black px-8 py-3 text-xs tracking-[0.15em] uppercase font-medium hover:bg-gray-100 transition-colors"
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
