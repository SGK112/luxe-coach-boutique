'use client';

import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/store/useStore';

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Page Header - Multiple shades of white for depth */}
      <div style={{
        backgroundColor: '#fafafa',
        padding: '80px 0',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div className="container-main" style={{ textAlign: 'center' }}>
          {/* Icon with subtle shadow */}
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <Heart style={{
              width: '28px',
              height: '28px',
              color: wishlist.length > 0 ? '#bf4800' : '#c4c4c4',
              fill: wishlist.length > 0 ? '#bf4800' : 'none'
            }} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 44px)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            color: '#1d1d1f',
            marginBottom: '12px'
          }}>
            My Wishlist
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#86868b',
            letterSpacing: '0.02em'
          }}>
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="container-main" style={{ padding: '60px 20px 100px' }}>
        {wishlist.length === 0 ? (
          /* Empty State - Clean with depth */
          <div style={{
            maxWidth: '480px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '60px 0'
          }}>
            {/* Layered circles for depth */}
            <div style={{ position: 'relative', marginBottom: '40px' }}>
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                backgroundColor: '#f8f8f8',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }} />
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }} />
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
              }}>
                <Heart style={{ width: '36px', height: '36px', color: '#d4d4d4' }} />
              </div>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '26px',
              fontWeight: 400,
              color: '#1d1d1f',
              marginBottom: '12px'
            }}>
              Your wishlist is empty
            </h2>

            <p style={{
              fontSize: '15px',
              color: '#86868b',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '320px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Save your favorite handbags here to keep track of items you love
            </p>

            <Link
              href="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 40px',
                backgroundColor: '#1d1d1f',
                color: '#fff',
                borderRadius: '32px',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.03em',
                textDecoration: 'none'
              }}
            >
              Discover Collection
              <ArrowRight style={{ width: '18px', height: '18px' }} />
            </Link>
          </div>
        ) : (
          /* Products Grid with enhanced cards */
          <div>
            {/* Filter/Sort Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '40px',
              paddingBottom: '20px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#86868b'
              }}>
                Showing all {wishlist.length} saved items
              </p>

              <Link
                href="/products"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#1d1d1f',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                Continue Shopping
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </Link>
            </div>

            {/* Product Grid */}
            <div className="product-grid">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div style={{
              marginTop: '80px',
              padding: '48px',
              backgroundColor: '#fafafa',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '22px',
                fontWeight: 400,
                color: '#1d1d1f',
                marginBottom: '12px'
              }}>
                Looking for something else?
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#86868b',
                marginBottom: '24px'
              }}>
                Explore our full collection of luxury handbags
              </p>
              <Link
                href="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#1d1d1f',
                  border: '1px solid #1d1d1f',
                  borderRadius: '28px',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  textDecoration: 'none'
                }}
              >
                Browse All Products
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
