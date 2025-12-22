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
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-[#f8f7f5] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
        />

        {/* Badges - Top Left */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="badge badge-new">New</span>
          )}
          {product.isBestseller && (
            <span className="badge badge-bestseller">Best</span>
          )}
          {product.isSale && discount > 0 && (
            <span className="badge badge-sale">-{discount}%</span>
          )}
        </div>

        {/* Wishlist Button - Top Right */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-black text-black' : 'text-gray-600'
            }`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="pt-3 pb-1">
        {/* Color Swatches */}
        {product.colors.length > 1 && (
          <div className="flex gap-1 mb-2">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="w-3 h-3 rounded-full border border-gray-200"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-gray-400 ml-0.5">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Name */}
        <h3 className="text-[13px] leading-tight font-normal line-clamp-2 mb-1">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-[12px] text-gray-400 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
