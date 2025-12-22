'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Share2, Star } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/product/${product.slug}`;
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `Check out this ${product.name} from LuxeCoach!`,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="hover-lift bg-white">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-50 product-image-container">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <span className="badge badge-new">New</span>}
            {product.isBestseller && (
              <span className="badge badge-bestseller">Bestseller</span>
            )}
            {product.isSale && discount > 0 && (
              <span className="badge badge-sale">{discount}% Off</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleWishlistToggle}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 hover:bg-white text-gray-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-700"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Add on Hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
            <button className="w-full btn btn-primary text-xs py-2">
              Quick View
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Color Options */}
          <div className="flex gap-1.5 mb-2">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500 ml-1">
                +{product.colors.length - 4}
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-medium text-sm leading-snug mb-1 group-hover:underline line-clamp-2">
            {product.name}
          </h3>

          {/* Category */}
          <p className="text-xs text-gray-500 mb-2">{product.category}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
