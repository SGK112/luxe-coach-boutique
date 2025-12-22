'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/store/useStore';

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-light tracking-wider text-center">
            My Wishlist
          </h1>
          <p className="text-gray-600 text-center mt-2">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-light mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">
              Start adding items you love to your wishlist
            </p>
            <Link href="/products" className="btn btn-primary">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
