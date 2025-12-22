'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const shopLinks = [
  { name: 'New Arrivals', href: '/products?filter=new' },
  { name: 'Bestsellers', href: '/products?filter=bestseller' },
  { name: 'All Handbags', href: '/products' },
  { name: 'Sale', href: '/products?filter=sale' },
];

const helpLinks = [
  { name: 'Contact Us', href: '/contact' },
  { name: 'Shipping', href: '/shipping' },
  { name: 'Returns', href: '/returns' },
  { name: 'FAQ', href: '/faq' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="w-full max-w-7xl mx-auto px-4 py-12 text-center">
          <h3 className="text-lg font-light mb-2">Join Our Newsletter</h3>
          <p className="text-sm text-gray-400 mb-6">
            Be the first to know about new arrivals and exclusive offers.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-11 px-4 bg-transparent border border-white/30 text-sm placeholder:text-gray-500 focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="h-11 px-6 bg-white text-black text-xs tracking-widest uppercase font-medium hover:bg-gray-100 transition-colors"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl tracking-[0.2em] uppercase font-light">
              COACH
            </Link>
            <p className="text-sm text-gray-400 mt-4 mb-6">
              Curating the finest designer handbags.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-medium mb-4">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-medium mb-4">Help</h4>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-medium mb-4">About</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/sustainability" className="text-sm text-gray-400 hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="w-full max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Coach. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
