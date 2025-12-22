'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
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
  const { getCartCount, setIsCartOpen, wishlist } = useStore();
  const cartCount = getCartCount();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Apple-style rounded icon button
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
        backgroundColor: '#f5f5f7',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.2s ease'
      }}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '18px',
          height: '18px',
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '10px',
          fontWeight: 600,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Announcement */}
      <div style={{
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        padding: '12px 16px'
      }}>
        <p style={{
          fontSize: '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          margin: 0,
          fontWeight: 400
        }}>
          Free Shipping on Orders Over $150
        </p>
      </div>

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: '#fff',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div className="container-main">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px'
          }}>
            {/* Left: Menu (mobile) + Nav (desktop) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1 }}>
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <IconButton onClick={() => setIsMobileMenuOpen(true)} ariaLabel="Menu">
                  <Menu style={{ width: '20px', height: '20px' }} />
                </IconButton>
              </div>

              {/* Desktop Nav */}
              <nav style={{ display: 'none', alignItems: 'center', gap: '32px' }} className="md:flex">
                {navLeft.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    style={{
                      fontSize: '13px',
                      letterSpacing: '0.05em',
                      fontWeight: 500,
                      color: '#1d1d1f'
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Logo */}
            <Link href="/" style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              <span style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '28px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 400,
                color: '#1d1d1f'
              }}>
                COACH
              </span>
            </Link>

            {/* Right: Nav (desktop) + Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, justifyContent: 'flex-end' }}>
              {/* Desktop Nav */}
              <nav style={{ display: 'none', alignItems: 'center', gap: '32px' }} className="md:flex">
                {navRight.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    style={{
                      fontSize: '13px',
                      letterSpacing: '0.05em',
                      fontWeight: 500,
                      color: item.highlight ? '#bf4800' : '#1d1d1f'
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Icon Buttons - Apple style */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="md:block" style={{ display: 'none' }}>
                  <IconButton onClick={() => setIsSearchOpen(!isSearchOpen)} ariaLabel="Search">
                    <Search style={{ width: '18px', height: '18px', color: '#1d1d1f' }} />
                  </IconButton>
                </div>
                <Link href="/wishlist">
                  <IconButton ariaLabel="Wishlist" badge={wishlist.length}>
                    <Heart style={{ width: '18px', height: '18px', color: '#1d1d1f' }} />
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
            backgroundColor: '#fff',
            borderBottom: '1px solid #f0f0f0',
            padding: '24px'
          }}>
            <div className="container-main">
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <input
                  type="text"
                  placeholder="Search for handbags..."
                  autoFocus
                  style={{
                    width: '100%',
                    height: '56px',
                    padding: '0 24px',
                    fontSize: '16px',
                    border: 'none',
                    backgroundColor: '#f5f5f7',
                    borderRadius: '28px',
                    outline: 'none'
                  }}
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
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '85%',
            maxWidth: '360px',
            backgroundColor: '#fff'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '72px',
              padding: '0 24px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <span style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '20px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                Menu
              </span>
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
                    display: 'block',
                    padding: '16px 32px',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: item.highlight ? '#bf4800' : '#1d1d1f'
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <CartSlideOver />
    </>
  );
}
