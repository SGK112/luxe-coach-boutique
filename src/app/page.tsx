import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryGrid from '@/components/CategoryGrid';
import { Truck, RefreshCw, Shield, Gift } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $150',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: Shield,
    title: 'Authenticity Guaranteed',
    description: '100% genuine products',
  },
  {
    icon: Gift,
    title: 'Gift Wrapping',
    description: 'Complimentary on all orders',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Features Bar */}
      <section className="border-y bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 p-6 justify-center"
              >
                <feature.icon className="w-6 h-6 text-gray-800" />
                <div>
                  <h3 className="font-medium text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <FeaturedProducts
        title="New Arrivals"
        subtitle="Just in: the latest additions to our collection"
        filter="new"
        limit={4}
      />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Bestsellers */}
      <FeaturedProducts
        title="Bestsellers"
        subtitle="Our most-loved styles that customers can't get enough of"
        filter="bestseller"
        limit={4}
      />

      {/* Sale Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4 block">
                Limited Time
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-wider mb-6">
                Holiday Sale
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Enjoy up to 40% off on select designer handbags. The perfect time
                to treat yourself or find a gift for someone special.
              </p>
              <a href="/products?filter=sale" className="btn btn-gold">
                Shop the Sale
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-800 rounded overflow-hidden"
                >
                  <img
                    src={`https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&q=80&crop=center&sat=-100`}
                    alt="Sale product"
                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Instagram */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light tracking-wider mb-2">
            #LuxeCoachStyle
          </h2>
          <p className="text-gray-600 mb-8">
            Join our community and share your style
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <a
                key={i}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square relative overflow-hidden group"
              >
                <img
                  src={`https://images.unsplash.com/photo-${
                    1584917865442 + i * 1000000
                  }-de89df76afd3?w=300&h=300&fit=crop`}
                  alt="Instagram post"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm tracking-wider">
                    @luxecoach
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
