'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';
import CartSlideOver from './CartSlideOver';

const navLeft = [
  { name: 'New', href: '/products?filter=new', highlight: false },
  { name: 'Handbags', href: '/products', highlight: false },
  { name: 'Shoulder Bags', href: '/products?category=shoulder-bags', highlight: false },
];

const navRight = [
  { name: 'Totes', href: '/products?category=tote-bags', highlight: false },
  { name: 'Crossbody', href: '/products?category=crossbody-bags', highlight: false },
  { name: 'Sale', href: '/products?filter=sale', highlight: true },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount, setIsCartOpen, wishlist } = useStore();
  const cartCount = getCartCount();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const IconButton = ({ onClick, ariaLabel, children, badge }: {
    onClick?: () => void;
    ariaLabel: string;
    children: React.ReactNode;
    badge?: number;
  }) => (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        backgroundColor: 'rgba(245, 245, 247, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span style={{
          position: 'absolute',
          top: '-2px',
          right: '-2px',
          width: '20px',
          height: '20px',
          background: 'linear-gradient(135deg, #1d1d1f 0%, #3d3d3f 100%)',
          color: '#fff',
          fontSize: '10px',
          fontWeight: 600,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Premium Announcement Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #1d1d1f 0%, #2d2d2f 50%, #1d1d1f 100%)',
        color: '#fff',
        textAlign: 'center',
        padding: '14px 16px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Shimmer effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
          animation: 'shimmer 3s infinite'
        }} />
        <p style={{
          fontSize: '12px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          margin: 0,
          fontWeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          position: 'relative'
        }}>
          <Sparkles style={{ width: '14px', height: '14px', opacity: 0.7 }} />
          Free Shipping on Orders Over $150
          <Sparkles style={{ width: '14px', height: '14px', opacity: 0.7 }} />
        </p>
      </div>

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : '#fff',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.08)' : 'none'
      }}>
        <div className="container-main">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '80px'
          }}>
            {/* Left: Menu (mobile) + Nav (desktop) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1 }}>
              <div className="md:hidden">
                <IconButton onClick={() => setIsMobileMenuOpen(true)} ariaLabel="Menu">
                  <Menu style={{ width: '20px', height: '20px', color: '#1d1d1f' }} />
                </IconButton>
              </div>

              <nav style={{ display: 'none', alignItems: 'center', gap: '36px' }} className="md:flex">
                {navLeft.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    style={{
                      fontSize: '13px',
                      letterSpacing: '0.08em',
                      fontWeight: 500,
                      color: '#1d1d1f',
                      textTransform: 'uppercase',
                      position: 'relative',
                      paddingBottom: '4px'
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Enhanced Logo */}
            <Link href="/" style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              textDecoration: 'none'
            }}>
              <span style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '32px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 400,
                color: '#1d1d1f',
                display: 'block',
                lineHeight: 1
              }}>
                COACH
              </span>
              <span style={{
                fontSize: '9px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#86868b',
                fontWeight: 500,
                marginTop: '4px',
                display: 'block'
              }}>
                Luxe Boutique
              </span>
            </Link>

            {/* Right: Nav (desktop) + Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, justifyContent: 'flex-end' }}>
              <nav style={{ display: 'none', alignItems: 'center', gap: '36px' }} className="md:flex">
                {navRight.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    style={{
                      fontSize: '13px',
                      letterSpacing: '0.08em',
                      fontWeight: 500,
                      color: item.highlight ? '#bf4800' : '#1d1d1f',
                      textTransform: 'uppercase',
                      position: 'relative'
                    }}
                  >
                    {item.name}
                    {item.highlight && (
                      <span style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-12px',
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#bf4800',
                        borderRadius: '50%'
                      }} />
                    )}
                  </Link>
                ))}
              </nav>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="md:block" style={{ display: 'none' }}>
                  <IconButton onClick={() => setIsSearchOpen(!isSearchOpen)} ariaLabel="Search">
                    <Search style={{ width: '18px', height: '18px', color: '#1d1d1f' }} />
                  </IconButton>
                </div>
                <Link href="/wishlist">
                  <IconButton ariaLabel="Wishlist" badge={wishlist.length}>
                    <Heart style={{
                      width: '18px',
                      height: '18px',
                      color: wishlist.length > 0 ? '#e11d48' : '#1d1d1f',
                      fill: wishlist.length > 0 ? '#e11d48' : 'none'
                    }} />
                  </IconButton>
                </Link>
                <IconButton onClick={() => setIsCartOpen(true)} ariaLabel="Cart" badge={cartCount}>
                  <ShoppingBag style={{ width: '18px', height: '18px', color: '#1d1d1f' }} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        {isSearchOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            padding: '32px 24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div className="container-main">
              <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                <input
                  type="text"
                  placeholder="Search for handbags..."
                  autoFocus
                  style={{
                    width: '100%',
                    height: '60px',
                    padding: '0 28px',
                    fontSize: '16px',
                    border: '2px solid #f0f0f0',
                    backgroundColor: '#fafafa',
                    borderRadius: '30px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1d1d1f'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)'
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '85%',
            maxWidth: '380px',
            backgroundColor: '#fff',
            boxShadow: '10px 0 40px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '80px',
              padding: '0 24px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div>
                <span style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '22px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block'
                }}>
                  COACH
                </span>
                <span style={{
                  fontSize: '8px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#86868b'
                }}>
                  Luxe Boutique
                </span>
              </div>
              <IconButton onClick={() => setIsMobileMenuOpen(false)} ariaLabel="Close">
                <X style={{ width: '20px', height: '20px' }} />
              </IconButton>
            </div>
            <nav style={{ padding: '24px 0' }}>
              {[...navLeft, ...navRight].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 32px',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: item.highlight ? '#bf4800' : '#1d1d1f',
                    borderBottom: '1px solid #f8f8f8'
                  }}
                >
                  {item.name}
                  {item.highlight && (
                    <span style={{
                      fontSize: '10px',
                      padding: '4px 10px',
                      backgroundColor: '#fef2f2',
                      color: '#bf4800',
                      borderRadius: '12px',
                      fontWeight: 600
                    }}>
                      HOT
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <CartSlideOver />

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}
