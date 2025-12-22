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
  const { getCartCount, setIsCartOpen, wishlist } = useStore();
  const cartCount = getCartCount();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Announcement */}
      <div style={{ backgroundColor: '#000', color: '#fff', textAlign: 'center', padding: '10px 16px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          Free Shipping on Orders Over $150
        </p>
      </div>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
        <div className="container-main">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              style={{ padding: '8px', display: 'block' }}
              className="md:hidden"
              aria-label="Menu"
            >
              <Menu style={{ width: '24px', height: '24px' }} />
            </button>

            {/* Left Nav - Desktop */}
            <nav style={{ display: 'none', alignItems: 'center', gap: '24px' }} className="md:flex">
              {navLeft.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <span style={{ fontSize: '24px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 300 }}>
                COACH
              </span>
            </Link>

            {/* Right Nav - Desktop */}
            <nav style={{ display: 'none', alignItems: 'center', gap: '24px' }} className="md:flex">
              {navRight.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    color: item.highlight ? '#dc2626' : 'inherit'
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button style={{ padding: '8px', display: 'none' }} className="md:block" aria-label="Search">
                <Search style={{ width: '20px', height: '20px' }} />
              </button>
              <Link href="/wishlist" style={{ padding: '8px', position: 'relative' }} aria-label="Wishlist">
                <Heart style={{ width: '20px', height: '20px' }} />
                {wishlist.length > 0 && (
                  <span style={{
                    position: 'absolute', top: '2px', right: '2px',
                    width: '16px', height: '16px', backgroundColor: '#000', color: '#fff',
                    fontSize: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsCartOpen(true)} style={{ padding: '8px', position: 'relative' }} aria-label="Cart">
                <ShoppingBag style={{ width: '20px', height: '20px' }} />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '2px', right: '2px',
                    width: '16px', height: '16px', backgroundColor: '#000', color: '#fff',
                    fontSize: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setIsMobileMenuOpen(false)} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '80%', maxWidth: '320px', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', padding: '0 16px', borderBottom: '1px solid #e5e5e5' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} style={{ padding: '8px' }}>
                <X style={{ width: '24px', height: '24px' }} />
              </button>
            </div>
            <nav style={{ padding: '16px 0' }}>
              {[...navLeft, ...navRight].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'block', padding: '12px 24px', fontSize: '14px', fontWeight: 500,
                    color: item.highlight ? '#dc2626' : 'inherit'
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
