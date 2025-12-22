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
    <Link href={`/product/${product.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: '#f5f5f5', overflow: 'hidden', marginBottom: '12px' }}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
        />

        {/* Badge */}
        {product.isNew && (
          <span style={{
            position: 'absolute', top: '8px', left: '8px',
            backgroundColor: '#000', color: '#fff', fontSize: '10px',
            padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.05em'
          }}>
            New
          </span>
        )}
        {product.isSale && !product.isNew && (
          <span style={{
            position: 'absolute', top: '8px', left: '8px',
            backgroundColor: '#dc2626', color: '#fff', fontSize: '10px',
            padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.05em'
          }}>
            Sale
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlistToggle}
          style={{
            position: 'absolute', top: '8px', right: '8px',
            width: '32px', height: '32px', borderRadius: '50%',
            backgroundColor: '#fff', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          aria-label="Wishlist"
        >
          <Heart
            style={{ width: '16px', height: '16px', fill: inWishlist ? '#dc2626' : 'none', color: inWishlist ? '#dc2626' : '#666' }}
          />
        </button>
      </div>

      {/* Info - Centered */}
      <div style={{ textAlign: 'center' }}>
        {/* Colors */}
        {product.colors.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                style={{
                  width: '14px', height: '14px', borderRadius: '50%',
                  backgroundColor: color.hex, border: '1px solid #ddd'
                }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span style={{ fontSize: '11px', color: '#666' }}>+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Name */}
        <h3 style={{ fontSize: '13px', fontWeight: 500, marginBottom: '4px', lineHeight: 1.4 }}>
          {product.name}
        </h3>

        {/* Price */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: product.originalPrice ? '#dc2626' : '#000' }}>
            ${product.price}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: '12px', color: '#999', textDecoration: 'line-through' }}>
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
