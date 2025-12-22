'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1d1d1f', color: '#fff' }}>
      {/* Compact Footer */}
      <div className="container-main" style={{ padding: '48px 20px' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px'
        }}>
          {/* Brand */}
          <Link href="/" style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '20px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 400
          }}>
            COACH
          </Link>

          {/* Navigation Links - Single Row */}
          <nav style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px 24px'
          }}>
            {[
              { name: 'Shop', href: '/products' },
              { name: 'New', href: '/products?filter=new' },
              { name: 'Sale', href: '/products?filter=sale' },
              { name: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  fontSize: '12px',
                  color: '#a1a1a6',
                  letterSpacing: '0.05em'
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon style={{ width: '16px', height: '16px', color: '#a1a1a6' }} />
              </a>
            ))}
          </div>

          {/* Copyright & Legal */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px 20px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            width: '100%',
            maxWidth: '400px'
          }}>
            <span style={{ fontSize: '11px', color: '#6e6e73' }}>
              &copy; {new Date().getFullYear()} Coach
            </span>
            <Link href="/privacy" style={{ fontSize: '11px', color: '#6e6e73' }}>Privacy</Link>
            <Link href="/terms" style={{ fontSize: '11px', color: '#6e6e73' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
