'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Lock, CreditCard, Truck, Check, ShieldCheck, Package } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CheckoutPage() {
  const { cart, getCartTotal } = useStore();
  const [step, setStep] = useState(1);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 150 ? 0 : 9.95;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, label: 'Shipping' },
    { number: 2, label: 'Payment' },
    { number: 3, label: 'Review' },
  ];

  if (cart.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa'
      }}>
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#f5f5f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <Package style={{ width: '32px', height: '32px', color: '#86868b' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1d1d1f',
            marginBottom: '12px'
          }}>
            Your bag is empty
          </h1>
          <p style={{ fontSize: '15px', color: '#86868b', marginBottom: '32px' }}>
            Add some items to get started
          </p>
          <Link
            href="/products"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#1d1d1f',
              color: '#fff',
              borderRadius: '28px',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none'
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link
            href="/products"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#86868b',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft style={{ width: '18px', height: '18px' }} />
            Back to Shopping
          </Link>
          <Link href="/" style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '24px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#1d1d1f',
            textDecoration: 'none'
          }}>
            COACH
          </Link>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#86868b'
          }}>
            <Lock style={{ width: '14px', height: '14px' }} />
            Secure Checkout
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {steps.map((s, i) => (
            <div key={s.number} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: step > s.number ? '#16a34a' : step === s.number ? '#1d1d1f' : '#f5f5f7',
                  color: step >= s.number ? '#fff' : '#86868b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  {step > s.number ? <Check style={{ width: '18px', height: '18px' }} /> : s.number}
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: step === s.number ? 500 : 400,
                  color: step === s.number ? '#1d1d1f' : '#86868b'
                }}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: step > s.number ? '#16a34a' : '#e5e5e5',
                  margin: '0 16px'
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '32px'
        }} className="checkout-grid">
          {/* Form Section */}
          <div>
            {step === 1 && (
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#f5f5f7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Truck style={{ width: '20px', height: '20px', color: '#1d1d1f' }} />
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#1d1d1f'
                  }}>
                    Shipping Information
                  </h2>
                </div>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1d1d1f', marginBottom: '8px' }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        style={{
                          width: '100%',
                          height: '52px',
                          padding: '0 20px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '12px',
                          fontSize: '15px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1d1d1f', marginBottom: '8px' }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        style={{
                          width: '100%',
                          height: '52px',
                          padding: '0 20px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '12px',
                          fontSize: '15px',
                          outline: 'none'
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1d1d1f', marginBottom: '8px' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      style={{
                        width: '100%',
                        height: '52px',
                        padding: '0 20px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1d1d1f', marginBottom: '8px' }}>
                      Address
                    </label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        height: '52px',
                        padding: '0 20px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1d1d1f', marginBottom: '8px' }}>
                        City
                      </label>
                      <input
                        type="text"
                        style={{
                          width: '100%',
                          height: '52px',
                          padding: '0 20px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '12px',
                          fontSize: '15px',
                          outline: 'none'
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1d1d1f', marginBottom: '8px' }}>
                        State
                      </label>
                      <select style={{
                        width: '100%',
                        height: '52px',
                        padding: '0 16px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none',
                        backgroundColor: '#fff',
                        cursor: 'pointer'
                      }}>
                        <option>CA</option>
                        <option>NY</option>
                        <option>TX</option>
                        <option>FL</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1d1d1f', marginBottom: '8px' }}>
                        ZIP
                      </label>
                      <input
                        type="text"
                        style={{
                          width: '100%',
                          height: '52px',
                          padding: '0 20px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '12px',
                          fontSize: '15px',
                          outline: 'none'
                        }}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{
                      height: '56px',
                      backgroundColor: '#1d1d1f',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '28px',
                      fontSize: '15px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      marginTop: '12px'
                    }}
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#f5f5f7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CreditCard style={{ width: '20px', height: '20px', color: '#1d1d1f' }} />
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#1d1d1f'
                  }}>
                    Payment Method
                  </h2>
                </div>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1d1d1f', marginBottom: '8px' }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      style={{
                        width: '100%',
                        height: '52px',
                        padding: '0 20px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1d1d1f', marginBottom: '8px' }}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        style={{
                          width: '100%',
                          height: '52px',
                          padding: '0 20px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '12px',
                          fontSize: '15px',
                          outline: 'none'
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1d1d1f', marginBottom: '8px' }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        style={{
                          width: '100%',
                          height: '52px',
                          padding: '0 20px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '12px',
                          fontSize: '15px',
                          outline: 'none'
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '12px'
                  }}>
                    <ShieldCheck style={{ width: '18px', height: '18px', color: '#16a34a' }} />
                    <span style={{ fontSize: '13px', color: '#16a34a' }}>
                      Your payment info is secure and encrypted
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{
                        flex: 1,
                        height: '56px',
                        backgroundColor: 'transparent',
                        color: '#1d1d1f',
                        border: '1px solid #1d1d1f',
                        borderRadius: '28px',
                        fontSize: '15px',
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      style={{
                        flex: 2,
                        height: '56px',
                        backgroundColor: '#1d1d1f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '28px',
                        fontSize: '15px',
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '22px',
                  fontWeight: 400,
                  color: '#1d1d1f',
                  marginBottom: '24px'
                }}>
                  Review Your Order
                </h2>
                <div>
                  {cart.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor.name}`}
                      style={{
                        display: 'flex',
                        gap: '16px',
                        paddingBottom: index < cart.length - 1 ? '20px' : 0,
                        marginBottom: index < cart.length - 1 ? '20px' : 0,
                        borderBottom: index < cart.length - 1 ? '1px solid #f0f0f0' : 'none'
                      }}
                    >
                      <div style={{
                        position: 'relative',
                        width: '80px',
                        height: '100px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}>
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontFamily: 'var(--font-playfair), Georgia, serif',
                          fontSize: '15px',
                          fontWeight: 400,
                          color: '#1d1d1f',
                          marginBottom: '4px'
                        }}>
                          {item.product.name}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#86868b', marginBottom: '8px' }}>
                          {item.selectedColor.name} &middot; Qty: {item.quantity}
                        </p>
                        <p style={{ fontSize: '15px', fontWeight: 500, color: '#1d1d1f' }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{
                      flex: 1,
                      height: '56px',
                      backgroundColor: 'transparent',
                      color: '#1d1d1f',
                      border: '1px solid #1d1d1f',
                      borderRadius: '28px',
                      fontSize: '15px',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Order placed! (Demo)')}
                    style={{
                      flex: 2,
                      height: '56px',
                      backgroundColor: '#1d1d1f',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '28px',
                      fontSize: '15px',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              position: 'sticky',
              top: '24px'
            }}>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '18px',
                fontWeight: 400,
                color: '#1d1d1f',
                marginBottom: '24px'
              }}>
                Order Summary
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#86868b' }}>Subtotal ({cart.length} items)</span>
                  <span style={{ color: '#1d1d1f' }}>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#86868b' }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#16a34a' : '#1d1d1f', fontWeight: shipping === 0 ? 500 : 400 }}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#86868b' }}>Tax</span>
                  <span style={{ color: '#1d1d1f' }}>${tax.toFixed(2)}</span>
                </div>
                <div style={{
                  borderTop: '1px solid #f0f0f0',
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '15px', fontWeight: 500, color: '#1d1d1f' }}>Total</span>
                  <span style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#1d1d1f'
                  }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {shipping > 0 && (
                <div style={{
                  marginTop: '20px',
                  padding: '16px',
                  backgroundColor: '#fafafa',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '13px', color: '#86868b' }}>
                    Add <strong style={{ color: '#1d1d1f' }}>${(150 - subtotal).toFixed(2)}</strong> for free shipping
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .checkout-grid {
            grid-template-columns: 1fr 380px !important;
          }
        }
      `}</style>
    </div>
  );
}
