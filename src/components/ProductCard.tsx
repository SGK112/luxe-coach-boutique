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

  return (
    <Link href={`/product/${product.slug}`} className="block group">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden mb-3">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
        />

        {/* Badges */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 uppercase tracking-wider">
            New
          </span>
        )}
        {product.isSale && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-1 uppercase tracking-wider">
            Sale
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="text-center px-1">
        {/* Colors */}
        {product.colors.length > 1 && (
          <div className="flex justify-center gap-1.5 mb-2">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Name */}
        <h3 className="text-sm font-medium mb-1 line-clamp-2">{product.name}</h3>

        {/* Price */}
        <div className="flex items-center justify-center gap-2">
          <span className={`text-sm font-medium ${product.originalPrice ? 'text-red-600' : ''}`}>
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
