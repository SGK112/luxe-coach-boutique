'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
      <div className="bg-black text-white text-center py-2.5 px-4">
        <p className="text-[11px] tracking-[0.15em] uppercase">
          Free Shipping on Orders Over $150
        </p>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        {/* Top Row - Logo & Actions */}
        <div className="border-b">
          <div className="px-4 md:px-8 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between h-16">
              {/* Left - Mobile Menu */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="flex items-center justify-center w-11 h-11 -ml-2"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Left - Search (Desktop) */}
              <div className="hidden md:flex items-center flex-1">
                <div className="relative w-full max-w-xs">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full h-10 pl-10 pr-4 text-sm border border-gray-200 rounded-none focus:outline-none focus:border-black transition-colors"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                </div>
              </div>

              {/* Center - Logo */}
              <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2"
              >
                <span className="text-xl md:text-2xl tracking-[0.3em] uppercase font-light">
                  COACH
                </span>
              </Link>

              {/* Right - Actions */}
              <div className="flex items-center gap-1 flex-1 justify-end">
                {/* Search Mobile */}
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="flex md:hidden items-center justify-center w-11 h-11"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" strokeWidth={1.5} />
                </button>

                {/* Account */}
                <Link
                  href="/account"
                  className="hidden md:flex items-center justify-center w-11 h-11"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </Link>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="flex items-center justify-center w-11 h-11 relative"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" strokeWidth={1.5} />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center font-medium">
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
                  <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Row (Desktop) */}
        <nav className="hidden md:block border-b">
          <div className="px-4 md:px-8 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-center gap-8 lg:gap-12 h-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs tracking-[0.15em] uppercase font-medium transition-colors hover:opacity-60 ${
                    item.highlight ? 'text-red-600' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden border-b px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                autoFocus
                className="w-full h-11 pl-10 pr-10 text-sm border border-gray-200 focus:outline-none focus:border-black"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        <div
          className={`absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <span className="text-sm tracking-[0.15em] uppercase font-medium">
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
          <nav className="py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center h-12 px-6 text-sm tracking-wide font-medium ${
                  item.highlight ? 'text-red-600' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="h-px bg-gray-100 mx-6" />

          {/* Secondary Links */}
          <div className="py-4">
            <Link
              href="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 h-12 px-6 text-sm tracking-wide text-gray-600"
            >
              <Heart className="w-4 h-4" strokeWidth={1.5} />
              Wishlist
              {wishlist.length > 0 && (
                <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 h-12 px-6 text-sm tracking-wide text-gray-600"
            >
              <User className="w-4 h-4" strokeWidth={1.5} />
              Account
            </Link>
          </div>
        </div>
      </div>

      <CartSlideOver />
    </>
  );
}
