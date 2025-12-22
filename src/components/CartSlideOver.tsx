'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, Sparkles, Truck } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CartSlideOver() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useStore();

  const total = getCartTotal();
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);
  const shippingProgress = Math.min(100, (total / freeShippingThreshold) * 100);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
      {/* Backdrop with blur */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)'
        }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Panel */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.12)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
          padding: '0 24px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#f5f5f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingBag style={{ width: '18px', height: '18px', color: '#1d1d1f' }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '18px',
              fontWeight: 400,
              color: '#1d1d1f'
            }}>
              Your Bag
            </span>
            <span style={{
              fontSize: '13px',
              color: '#86868b',
              marginLeft: '4px'
            }}>
              ({cart.length})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#f5f5f7',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X style={{ width: '18px', height: '18px', color: '#1d1d1f' }} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {cart.length > 0 && (
          <div style={{
            padding: '20px 24px',
            backgroundColor: remainingForFreeShipping === 0 ? '#f0fdf4' : '#fafafa',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}>
              {remainingForFreeShipping === 0 ? (
                <>
                  <Sparkles style={{ width: '16px', height: '16px', color: '#16a34a' }} />
                  <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: 500 }}>
                    You&apos;ve unlocked free shipping!
                  </span>
                </>
              ) : (
                <>
                  <Truck style={{ width: '16px', height: '16px', color: '#86868b' }} />
                  <span style={{ fontSize: '13px', color: '#1d1d1f' }}>
                    Add <strong style={{ fontWeight: 600 }}>${remainingForFreeShipping.toFixed(0)}</strong> more for free shipping
                  </span>
                </>
              )}
            </div>
            <div style={{
              height: '4px',
              backgroundColor: '#e5e5e5',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${shippingProgress}%`,
                backgroundColor: remainingForFreeShipping === 0 ? '#16a34a' : '#1d1d1f',
                borderRadius: '2px',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>
        )}

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cart.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '48px 24px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#f5f5f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                <ShoppingBag style={{ width: '32px', height: '32px', color: '#86868b' }} />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '20px',
                fontWeight: 400,
                color: '#1d1d1f',
                marginBottom: '8px'
              }}>
                Your bag is empty
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#86868b',
                marginBottom: '32px',
                maxWidth: '240px'
              }}>
                Discover our collection of luxury handbags
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  padding: '16px 40px',
                  backgroundColor: '#1d1d1f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '28px',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  cursor: 'pointer'
                }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ padding: '24px' }}>
              {cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}`}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    paddingBottom: index < cart.length - 1 ? '24px' : 0,
                    marginBottom: index < cart.length - 1 ? '24px' : 0,
                    borderBottom: index < cart.length - 1 ? '1px solid #f0f0f0' : 'none'
                  }}
                >
                  {/* Product Image */}
                  <Link
                    href={`/product/${item.product.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    style={{
                      position: 'relative',
                      width: '100px',
                      height: '120px',
                      backgroundColor: '#f8f8f8',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Link>

                  {/* Product Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      style={{
                        fontFamily: 'var(--font-playfair), Georgia, serif',
                        fontSize: '15px',
                        fontWeight: 400,
                        color: '#1d1d1f',
                        display: 'block',
                        marginBottom: '6px',
                        lineHeight: 1.3
                      }}
                    >
                      {item.product.name}
                    </Link>

                    {/* Color */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: item.selectedColor.hex,
                        border: '1px solid #e0e0e0'
                      }} />
                      <span style={{ fontSize: '13px', color: '#86868b' }}>
                        {item.selectedColor.name}
                      </span>
                    </div>

                    {/* Price */}
                    <p style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: '#1d1d1f',
                      marginBottom: '16px'
                    }}>
                      ${item.product.price}
                    </p>

                    {/* Quantity & Remove */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      {/* Quantity Selector - Apple Style */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#f5f5f7',
                        borderRadius: '24px',
                        padding: '4px'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: item.quantity === 1 ? 'transparent' : '#fff',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            opacity: item.quantity === 1 ? 0.4 : 1
                          }}
                          disabled={item.quantity === 1}
                        >
                          <Minus style={{ width: '14px', height: '14px', color: '#1d1d1f' }} />
                        </button>
                        <span style={{
                          width: '40px',
                          textAlign: 'center',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#1d1d1f'
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Plus style={{ width: '14px', height: '14px', color: '#1d1d1f' }} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{
                          fontSize: '13px',
                          color: '#86868b',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '8px 0'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{
            borderTop: '1px solid #f0f0f0',
            padding: '24px',
            backgroundColor: '#fff'
          }}>
            {/* Subtotal */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '14px', color: '#86868b' }}>Subtotal</span>
              <span style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '20px',
                fontWeight: 400,
                color: '#1d1d1f'
              }}>
                ${total.toLocaleString()}
              </span>
            </div>
            <p style={{
              fontSize: '12px',
              color: '#86868b',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              Shipping & taxes calculated at checkout
            </p>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '56px',
                width: '100%',
                backgroundColor: '#1d1d1f',
                color: '#fff',
                borderRadius: '28px',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                marginBottom: '12px',
                textDecoration: 'none'
              }}
            >
              Checkout
            </Link>

            {/* Continue Shopping */}
            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '52px',
                width: '100%',
                backgroundColor: 'transparent',
                color: '#1d1d1f',
                border: '1px solid #1d1d1f',
                borderRadius: '26px',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                cursor: 'pointer'
              }}
            >
              Continue Shopping
            </button>

            {/* Payment Methods */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #f0f0f0'
            }}>
              <span style={{ fontSize: '11px', color: '#86868b', letterSpacing: '0.05em' }}>
                We Accept
              </span>
              {['Visa', 'MC', 'Amex', 'PayPal'].map((method) => (
                <div
                  key={method}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#f5f5f7',
                    borderRadius: '4px',
                    fontSize: '10px',
                    color: '#86868b',
                    fontWeight: 500
                  }}
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
