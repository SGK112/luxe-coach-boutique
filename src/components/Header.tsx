'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import CartSlideOver from './CartSlideOver';

const navigation = [
  { name: 'New', href: '/products?filter=new' },
  { name: 'Handbags', href: '/products' },
  { name: 'Shoulder Bags', href: '/products?category=shoulder-bags' },
  { name: 'Totes', href: '/products?category=tote-bags' },
  { name: 'Crossbody', href: '/products?category=crossbody-bags' },
  { name: 'Sale', href: '/products?filter=sale', highlight: true },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount, setIsCartOpen, wishlist } = useStore();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2 px-4">
        <p className="text-[11px] tracking-widest uppercase">
          Free Shipping on Orders Over $150
        </p>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-40 bg-white transition-shadow ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left - Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Left - Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navigation.slice(0, 3).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs tracking-widest uppercase font-medium hover:text-gray-500 transition-colors ${
                    item.highlight ? 'text-red-600' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Center - Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl md:text-2xl tracking-[0.2em] uppercase font-light">
                COACH
              </span>
            </Link>

            {/* Right - Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navigation.slice(3).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs tracking-widest uppercase font-medium hover:text-gray-500 transition-colors ${
                    item.highlight ? 'text-red-600' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right - Icons */}
            <div className="flex items-center gap-1">
              <button className="hidden md:flex p-2" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>

              <Link href="/wishlist" className="p-2 relative" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 relative -mr-2"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
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
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white">
            <div className="flex items-center justify-between h-14 px-4 border-b">
              <span className="text-sm font-medium tracking-widest uppercase">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-6 py-3 text-sm font-medium ${item.highlight ? 'text-red-600' : ''}`}
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
