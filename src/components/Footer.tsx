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
    <footer style={{ backgroundColor: '#1d1d1f', color: '#fff' }}>
      {/* Newsletter */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container-main" style={{ padding: '64px 20px', textAlign: 'center' }}>
          <h3 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '24px',
            fontWeight: 400,
            marginBottom: '12px'
          }}>
            Join Our Newsletter
          </h3>
          <p style={{ fontSize: '14px', color: '#86868b', marginBottom: '32px' }}>
            Be the first to know about new arrivals and exclusive offers.
          </p>
          <form style={{
            display: 'flex',
            gap: '12px',
            maxWidth: '460px',
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: '1 1 280px',
                height: '52px',
                padding: '0 20px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '26px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                height: '52px',
                padding: '0 32px',
                backgroundColor: '#fff',
                color: '#1d1d1f',
                border: 'none',
                borderRadius: '26px',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="container-main" style={{ padding: '64px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px'
        }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '24px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 400
            }}>
              COACH
            </Link>
            <p style={{
              fontSize: '14px',
              color: '#86868b',
              marginTop: '20px',
              marginBottom: '28px',
              lineHeight: 1.6
            }}>
              Curating the finest designer handbags since 1941.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon style={{ width: '18px', height: '18px', color: '#fff' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 500,
              marginBottom: '24px'
            }}>
              Shop
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {shopLinks.map((link) => (
                <li key={link.name} style={{ marginBottom: '16px' }}>
                  <Link href={link.href} style={{ fontSize: '14px', color: '#86868b' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 style={{
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 500,
              marginBottom: '24px'
            }}>
              Help
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {helpLinks.map((link) => (
                <li key={link.name} style={{ marginBottom: '16px' }}>
                  <Link href={link.href} style={{ fontSize: '14px', color: '#86868b' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 style={{
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 500,
              marginBottom: '24px'
            }}>
              About
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '16px' }}>
                <Link href="/about" style={{ fontSize: '14px', color: '#86868b' }}>Our Story</Link>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <Link href="/sustainability" style={{ fontSize: '14px', color: '#86868b' }}>Sustainability</Link>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <Link href="/careers" style={{ fontSize: '14px', color: '#86868b' }}>Careers</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container-main" style={{
          padding: '24px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px'
        }}>
          <p style={{ fontSize: '12px', color: '#86868b' }}>
            &copy; {new Date().getFullYear()} Coach. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/privacy" style={{ fontSize: '12px', color: '#86868b' }}>Privacy</Link>
            <Link href="/terms" style={{ fontSize: '12px', color: '#86868b' }}>Terms</Link>
            <Link href="/accessibility" style={{ fontSize: '12px', color: '#86868b' }}>Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
