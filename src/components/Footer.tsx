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
    <footer style={{ backgroundColor: '#000', color: '#fff' }}>
      {/* Newsletter */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container-main" style={{ padding: '48px 16px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 300, marginBottom: '8px' }}>Join Our Newsletter</h3>
          <p style={{ fontSize: '13px', color: '#999', marginBottom: '24px' }}>
            Be the first to know about new arrivals and exclusive offers.
          </p>
          <form style={{ display: 'flex', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1, height: '44px', padding: '0 16px',
                backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff', fontSize: '13px'
              }}
            />
            <button
              type="submit"
              style={{
                height: '44px', padding: '0 24px',
                backgroundColor: '#fff', color: '#000',
                border: 'none', fontSize: '11px', letterSpacing: '0.1em',
                textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer'
              }}
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="container-main" style={{ padding: '48px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px' }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ fontSize: '20px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 300 }}>
              COACH
            </Link>
            <p style={{ fontSize: '13px', color: '#999', marginTop: '16px', marginBottom: '24px' }}>
              Curating the finest designer handbags.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" style={{ width: '36px', height: '36px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Instagram style={{ width: '16px', height: '16px' }} />
              </a>
              <a href="#" style={{ width: '36px', height: '36px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Facebook style={{ width: '16px', height: '16px' }} />
              </a>
              <a href="#" style={{ width: '36px', height: '36px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Twitter style={{ width: '16px', height: '16px' }} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '16px' }}>Shop</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {shopLinks.map((link) => (
                <li key={link.name} style={{ marginBottom: '12px' }}>
                  <Link href={link.href} style={{ fontSize: '13px', color: '#999' }}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '16px' }}>Help</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {helpLinks.map((link) => (
                <li key={link.name} style={{ marginBottom: '12px' }}>
                  <Link href={link.href} style={{ fontSize: '13px', color: '#999' }}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '16px' }}>About</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px' }}><Link href="/about" style={{ fontSize: '13px', color: '#999' }}>Our Story</Link></li>
              <li style={{ marginBottom: '12px' }}><Link href="/sustainability" style={{ fontSize: '13px', color: '#999' }}>Sustainability</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container-main" style={{ padding: '24px 16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <p style={{ fontSize: '11px', color: '#666' }}>&copy; {new Date().getFullYear()} Coach. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/privacy" style={{ fontSize: '11px', color: '#666' }}>Privacy</Link>
            <Link href="/terms" style={{ fontSize: '11px', color: '#666' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
