import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryGrid from '@/components/CategoryGrid';
import Link from 'next/link';
import { Truck, RotateCcw, Shield } from 'lucide-react';

const features = [
  { icon: Truck, text: 'Free Shipping $150+' },
  { icon: RotateCcw, text: '30-Day Returns' },
  { icon: Shield, text: '100% Authentic' },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Features Strip */}
      <section className="border-b">
        <div className="px-4 md:px-8 max-w-[1440px] mx-auto">
          <div className="flex justify-center md:justify-between py-4 gap-6 md:gap-8 overflow-x-auto hide-scrollbar">
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex items-center gap-2 flex-shrink-0"
              >
                <feature.icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-[11px] tracking-wide whitespace-nowrap">
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
      <section className="bg-black text-white">
        <div className="px-4 md:px-8 py-12 md:py-16 max-w-[1440px] mx-auto">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.25em] uppercase text-gray-400 block mb-3">
              Limited Time
            </span>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-4">
              Holiday Sale
            </h2>
            <p className="text-gray-400 text-[13px] mb-6 max-w-sm mx-auto">
              Up to 40% off select designer handbags. The perfect gift awaits.
            </p>
            <Link
              href="/products?filter=sale"
              className="inline-flex items-center h-11 px-8 bg-white text-black text-xs tracking-[0.15em] uppercase font-medium hover:bg-gray-200 transition-colors"
            >
              Shop Sale
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
