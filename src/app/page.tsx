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
      <section className="bg-white border-b">
        <div className="px-4 md:px-8 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 py-6 md:py-8 gap-4">
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex items-center justify-center gap-3"
              >
                <feature.icon className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                <span className="text-xs tracking-wide text-gray-700">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <FeaturedProducts
        title="New Arrivals"
        filter="new"
        limit={4}
      />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Bestsellers */}
      <FeaturedProducts
        title="Bestsellers"
        filter="bestseller"
        limit={4}
      />

      {/* Sale Banner */}
      <section className="bg-[#1a1a1a] text-white">
        <div className="px-4 md:px-8 py-16 md:py-24 max-w-[1600px] mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-[11px] tracking-[0.3em] uppercase text-gray-400 block mb-4">
              Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6">
              Holiday Sale
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
              Up to 40% off select designer handbags. The perfect gift awaits.
            </p>
            <Link
              href="/products?filter=sale"
              className="inline-flex items-center h-12 px-10 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-100 transition-colors"
            >
              Shop Sale
            </Link>
          </div>
        </div>
      </section>

      {/* All Products Preview */}
      <FeaturedProducts
        title="More to Explore"
        filter="all"
        limit={8}
        showViewAll={true}
      />
    </>
  );
}
