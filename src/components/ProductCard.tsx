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
      {/* Oversized Image Container */}
      <div
        className="product-image-wrapper"
        style={{
          position: 'relative',
          aspectRatio: '3/4',
          backgroundColor: '#f8f8f8',
          overflow: 'hidden',
          marginBottom: '20px',
          borderRadius: '2px'
        }}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
        />

        {/* Minimal Badge */}
        {product.isNew && (
          <span style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: '#1d1d1f',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 500,
            padding: '6px 12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            borderRadius: '2px'
          }}>
            New
          </span>
        )}
        {product.isSale && !product.isNew && (
          <span style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: '#bf4800',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 500,
            padding: '6px 12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            borderRadius: '2px'
          }}>
            Sale
          </span>
        )}

        {/* Apple-style Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.95)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s ease'
          }}
          aria-label="Add to Wishlist"
        >
          <Heart
            style={{
              width: '18px',
              height: '18px',
              fill: inWishlist ? '#bf4800' : 'none',
              color: inWishlist ? '#bf4800' : '#1d1d1f'
            }}
          />
        </button>

        {/* Quick View on Hover */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          opacity: 0,
          transform: 'translateY(8px)',
          transition: 'all 0.3s ease'
        }} className="quick-view-btn">
          <button style={{
            width: '100%',
            padding: '14px',
            backgroundColor: 'rgba(255,255,255,0.95)',
            border: 'none',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: '2px'
          }}>
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info - Clean & Minimal */}
      <div style={{ textAlign: 'center', padding: '0 8px' }}>
        {/* Color Dots */}
        {product.colors.length > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: color.hex,
                  border: color.hex.toLowerCase() === '#ffffff' || color.hex.toLowerCase() === '#fffff0' || color.hex.toLowerCase() === '#f5f5dc'
                    ? '1px solid #e0e0e0'
                    : 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span style={{ fontSize: '11px', color: '#86868b' }}>+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Product Name */}
        <h3 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '15px',
          fontWeight: 400,
          marginBottom: '8px',
          lineHeight: 1.4,
          color: '#1d1d1f'
        }}>
          {product.name}
        </h3>

        {/* Price - Minimal */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: 500,
            color: product.originalPrice ? '#bf4800' : '#1d1d1f',
            letterSpacing: '0.02em'
          }}>
            ${product.price}
          </span>
          {product.originalPrice && (
            <span style={{
              fontSize: '13px',
              color: '#86868b',
              textDecoration: 'line-through'
            }}>
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div style={{
            marginTop: '8px',
            fontSize: '12px',
            color: '#86868b'
          }}>
            {product.rating} ({product.reviewCount})
          </div>
        )}
      </div>
    </Link>
  );
}
