'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import CartSlideOver from './CartSlideOver';

const navigation = [
  { name: 'New', href: '/products?filter=new' },
  { name: 'Bags', href: '/products' },
  { name: 'Shoulder', href: '/products?category=shoulder-bags' },
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Announcement Bar - Minimal */}
      <div className="bg-black text-white text-center py-2.5 px-4">
        <p className="text-[10px] tracking-[0.2em] uppercase">
          Complimentary Shipping Over $150
        </p>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled ? 'glass shadow-[0_1px_0_rgba(0,0,0,0.05)]' : 'bg-white'
        }`}
      >
        <div className="px-4 md:px-6 lg:px-8 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Left - Menu (Mobile) */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex items-center justify-center w-11 h-11 -ml-2"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Center - Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
            >
              <span className="text-lg md:text-xl tracking-[0.25em] uppercase font-light">
                Luxe<span className="font-medium">Coach</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 ml-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[11px] tracking-[0.15em] uppercase transition-colors hover:opacity-60 ${
                    item.highlight ? 'text-[#c41e3a]' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right - Actions */}
            <div className="flex items-center">
              {/* Search - Desktop only */}
              <button
                className="hidden md:flex items-center justify-center w-11 h-11"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="flex items-center justify-center w-11 h-11 relative"
                aria-label="Wishlist"
              >
                <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center justify-center w-11 h-11 relative -mr-2"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          className={`absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between h-14 px-4 border-b border-gray-100">
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium">
              Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-11 h-11 -mr-2"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="py-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center h-12 px-5 text-sm tracking-wide ${
                  item.highlight ? 'text-[#c41e3a]' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="h-px bg-gray-100 mx-5" />

          {/* Secondary Links */}
          <div className="py-2">
            <Link
              href="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 h-12 px-5 text-sm tracking-wide text-gray-600"
            >
              <Heart className="w-4 h-4" strokeWidth={1.5} />
              Wishlist
              {wishlist.length > 0 && (
                <span className="ml-auto text-xs">({wishlist.length})</span>
              )}
            </Link>
            <button
              className="flex items-center gap-3 h-12 px-5 text-sm tracking-wide text-gray-600 w-full"
            >
              <Search className="w-4 h-4" strokeWidth={1.5} />
              Search
            </button>
          </div>
        </div>
      </div>

      <CartSlideOver />
    </>
  );
}
