'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Heart,
  Minus,
  Plus,
  Star,
  Truck,
  RefreshCw,
  ChevronRight,
  Check,
  Share2,
  ShieldCheck,
} from 'lucide-react';
import { getProductBySlug, products } from '@/data/products';
import { useStore } from '@/store/useStore';
import ProductCard from '@/components/ProductCard';
import toast from 'react-hot-toast';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    setIsCartOpen,
  } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
    toast.success('Added to bag!');
    setIsCartOpen(true);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', paddingBottom: '100px' }}>
      {/* Breadcrumb - Mobile optimized */}
      <div style={{ backgroundColor: '#f5f5f5', padding: '12px 0' }}>
        <div className="container-main">
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: '#86868b',
            overflowX: 'auto'
          }} className="hide-scrollbar">
            <Link href="/" style={{ color: '#86868b', whiteSpace: 'nowrap' }}>Home</Link>
            <ChevronRight style={{ width: '14px', height: '14px', flexShrink: 0 }} />
            <Link href="/products" style={{ color: '#86868b', whiteSpace: 'nowrap' }}>Handbags</Link>
            <ChevronRight style={{ width: '14px', height: '14px', flexShrink: 0 }} />
            <span style={{ color: '#1d1d1f', whiteSpace: 'nowrap' }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="container-main" style={{ padding: '0 0 40px' }}>
        <div className="product-layout">
          {/* Image Gallery */}
          <div style={{ position: 'relative' }}>
            {/* Main Image */}
            <div style={{
              position: 'relative',
              aspectRatio: '1/1',
              backgroundColor: '#f0f0f0',
              overflow: 'hidden'
            }}>
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Badges */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {product.isNew && (
                  <span style={{
                    padding: '6px 14px',
                    backgroundColor: '#1d1d1f',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    borderRadius: '2px'
                  }}>
                    New
                  </span>
                )}
                {product.isSale && discount > 0 && (
                  <span style={{
                    padding: '6px 14px',
                    backgroundColor: '#bf4800',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    borderRadius: '2px'
                  }}>
                    {discount}% Off
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{
                display: 'flex',
                gap: '12px',
                padding: '16px',
                overflowX: 'auto'
              }} className="hide-scrollbar">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      position: 'relative',
                      width: '72px',
                      height: '72px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: selectedImage === index ? '2px solid #1d1d1f' : '2px solid transparent',
                      boxShadow: selectedImage === index ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div style={{ padding: '24px 20px' }}>
            {/* Title */}
            <h1 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(24px, 5vw, 32px)',
              fontWeight: 400,
              color: '#1d1d1f',
              marginBottom: '12px',
              lineHeight: 1.2
            }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    style={{
                      width: '16px',
                      height: '16px',
                      color: i < Math.floor(product.rating) ? '#f59e0b' : '#e5e5e5',
                      fill: i < Math.floor(product.rating) ? '#f59e0b' : 'none'
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '13px', color: '#86868b' }}>
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <span style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '28px',
                fontWeight: 400,
                color: product.originalPrice ? '#bf4800' : '#1d1d1f'
              }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{
                  fontSize: '16px',
                  color: '#86868b',
                  textDecoration: 'line-through'
                }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{
              fontSize: '15px',
              color: '#515154',
              lineHeight: 1.6,
              marginBottom: '24px'
            }}>
              {product.description}
            </p>

            {/* Color Selection */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{
                fontSize: '14px',
                color: '#1d1d1f',
                marginBottom: '12px'
              }}>
                Color: <span style={{ fontWeight: 500 }}>{selectedColor.name}</span>
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: selectedColor.name === color.name
                        ? '3px solid #1d1d1f'
                        : '2px solid #e5e5e5',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      transform: selectedColor.name === color.name ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{
                fontSize: '14px',
                color: '#1d1d1f',
                marginBottom: '12px'
              }}>
                Quantity
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '28px',
                padding: '4px'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: quantity > 1 ? '#fff' : 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    opacity: quantity > 1 ? 1 : 0.4
                  }}
                  disabled={quantity <= 1}
                >
                  <Minus style={{ width: '16px', height: '16px', color: '#1d1d1f' }} />
                </button>
                <span style={{
                  width: '48px',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#1d1d1f'
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                  }}
                >
                  <Plus style={{ width: '16px', height: '16px', color: '#1d1d1f' }} />
                </button>
              </div>
            </div>

            {/* Desktop Add to Cart */}
            <div className="desktop-only" style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    height: '56px',
                    backgroundColor: '#1d1d1f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '28px',
                    fontSize: '15px',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)'
                  }}
                >
                  Add to Bag
                </button>
                <button
                  onClick={handleWishlistToggle}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: inWishlist ? '#fff5f5' : '#f5f5f5',
                    border: inWishlist ? '2px solid #bf4800' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Heart style={{
                    width: '22px',
                    height: '22px',
                    color: inWishlist ? '#bf4800' : '#1d1d1f',
                    fill: inWishlist ? '#bf4800' : 'none'
                  }} />
                </button>
              </div>
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 0',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '14px',
                color: '#86868b',
                cursor: 'pointer',
                marginBottom: '24px'
              }}
            >
              <Share2 style={{ width: '18px', height: '18px' }} />
              Share
            </button>

            {/* Shipping Info */}
            <div style={{
              padding: '20px',
              backgroundColor: '#f8f8f8',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <Truck style={{ width: '18px', height: '18px', color: '#1d1d1f' }} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#1d1d1f' }}>Free Shipping</p>
                  <p style={{ fontSize: '12px', color: '#86868b' }}>On orders over $150</p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <RefreshCw style={{ width: '18px', height: '18px', color: '#1d1d1f' }} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#1d1d1f' }}>Easy Returns</p>
                  <p style={{ fontSize: '12px', color: '#86868b' }}>30-day return policy</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div style={{
              borderTop: '1px solid #e8e8e8',
              paddingTop: '24px'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '18px',
                fontWeight: 400,
                color: '#1d1d1f',
                marginBottom: '16px'
              }}>
                Product Details
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {product.details.map((detail, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '14px',
                    color: '#515154',
                    marginBottom: '12px'
                  }}>
                    <Check style={{
                      width: '18px',
                      height: '18px',
                      color: '#16a34a',
                      flexShrink: 0,
                      marginTop: '1px'
                    }} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Authenticity */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px',
              backgroundColor: '#f0fdf4',
              borderRadius: '10px',
              marginTop: '24px'
            }}>
              <ShieldCheck style={{ width: '20px', height: '20px', color: '#16a34a' }} />
              <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: 500 }}>
                100% Authentic Guaranteed
              </span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{
            marginTop: '60px',
            padding: '0 20px'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(22px, 4vw, 28px)',
              fontWeight: 400,
              color: '#1d1d1f',
              marginBottom: '32px'
            }}>
              You May Also Like
            </h2>
            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Add to Cart */}
      <div className="mobile-only" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 20px',
        backgroundColor: '#fff',
        borderTop: '1px solid #e8e8e8',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
        zIndex: 30
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button
            onClick={handleWishlistToggle}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: inWishlist ? '#fff5f5' : '#f5f5f5',
              border: inWishlist ? '2px solid #bf4800' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <Heart style={{
              width: '22px',
              height: '22px',
              color: inWishlist ? '#bf4800' : '#1d1d1f',
              fill: inWishlist ? '#bf4800' : 'none'
            }} />
          </button>
          <button
            onClick={handleAddToCart}
            style={{
              flex: 1,
              height: '52px',
              backgroundColor: '#1d1d1f',
              color: '#fff',
              border: 'none',
              borderRadius: '26px',
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '0.03em',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)'
            }}
          >
            Add to Bag - ${(product.price * quantity).toFixed(2)}
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-layout {
          display: block;
        }
        .desktop-only {
          display: none;
        }
        .mobile-only {
          display: block;
        }
        @media (min-width: 1024px) {
          .product-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            padding: 40px 0;
          }
          .desktop-only {
            display: block;
          }
          .mobile-only {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
