'use client';

import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'New Arrivals', href: '/products?filter=new' },
    { name: 'Bestsellers', href: '/products?filter=bestseller' },
    { name: 'Bags', href: '/products' },
    { name: 'Sale', href: '/products?filter=sale' },
  ],
  help: [
    { name: 'Contact', href: '/contact' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'FAQ', href: '/faq' },
  ],
  about: [
    { name: 'Our Story', href: '/about' },
    { name: 'Craftsmanship', href: '/craftsmanship' },
    { name: 'Sustainability', href: '/sustainability' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="px-4 md:px-8 py-10 md:py-12 max-w-[1440px] mx-auto">
          <div className="max-w-md mx-auto text-center md:text-left md:mx-0">
            <h3 className="text-sm tracking-[0.15em] uppercase mb-2">
              Stay Connected
            </h3>
            <p className="text-[13px] text-gray-400 mb-5">
              Be the first to know about new arrivals and exclusive offers.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 h-11 px-4 bg-white/10 border border-white/20 text-sm placeholder:text-gray-500 focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                className="h-11 px-6 bg-white text-black text-xs tracking-[0.1em] uppercase font-medium hover:bg-gray-200 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="px-4 md:px-8 py-10 md:py-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Social */}
          <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
            <Link href="/" className="inline-block mb-4">
              <span className="text-base tracking-[0.2em] uppercase font-light">
                Luxe<span className="font-medium">Coach</span>
              </span>
            </Link>
            <p className="text-[13px] text-gray-400 mb-5 max-w-[200px]">
              Curating the finest designer handbags.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[11px] tracking-[0.15em] uppercase font-medium mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[11px] tracking-[0.15em] uppercase font-medium mb-4">
              Help
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-[11px] tracking-[0.15em] uppercase font-medium mb-4">
              About
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="px-4 md:px-8 py-5 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
            <p>&copy; {new Date().getFullYear()} LuxeCoach</p>
            <div className="flex gap-5">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
