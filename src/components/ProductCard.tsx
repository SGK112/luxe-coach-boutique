'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      {/* Image Container - Clean white background */}
      <div className="relative aspect-square bg-white overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
        />

        {/* Badge - Top Left, minimal */}
        {(product.isNew || product.isBestseller || product.isSale) && (
          <div className="absolute top-3 left-3">
            {product.isNew && (
              <span className="text-[10px] tracking-widest uppercase font-medium text-gray-700">
                New
              </span>
            )}
            {product.isBestseller && !product.isNew && (
              <span className="text-[10px] tracking-widest uppercase font-medium text-gray-700">
                Bestseller
              </span>
            )}
            {product.isSale && !product.isNew && !product.isBestseller && (
              <span className="text-[10px] tracking-widest uppercase font-medium text-red-600">
                Sale
              </span>
            )}
          </div>
        )}

        {/* Wishlist Button - Top Right */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              inWishlist ? 'fill-black text-black' : 'text-gray-600'
            }`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Product Info - Centered */}
      <div className="pt-4 text-center">
        {/* Color Swatches - Centered, larger */}
        {product.colors.length > 1 && (
          <div className="flex items-center justify-center gap-2 mb-3">
            {product.colors.slice(0, 5).map((color, index) => (
              <div
                key={color.name}
                className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${
                  index === 0 ? 'border-black' : 'border-gray-200'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-gray-500 ml-1">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Name - Centered */}
        <h3 className="text-sm font-normal tracking-wide leading-tight mb-2 px-2">
          {product.name}
        </h3>

        {/* Price - Centered */}
        <div className="flex items-center justify-center gap-2">
          <span className={`text-sm ${product.originalPrice ? 'text-red-600 font-medium' : 'font-medium'}`}>
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
