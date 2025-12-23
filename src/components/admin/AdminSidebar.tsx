'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Plug,
  ShoppingBag,
  Store,
  Share2,
  ChevronRight,
  ExternalLink,
  Package,
  Plus,
  Upload,
  FolderOpen,
  Menu,
  X
} from 'lucide-react';

const navItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: Package,
    subItems: [
      { name: 'All Products', href: '/admin/products', icon: Package },
      { name: 'Add Product', href: '/admin/products/new', icon: Plus },
      { name: 'Import CSV', href: '/admin/products/import', icon: Upload },
      { name: 'Categories', href: '/admin/products/categories', icon: FolderOpen },
    ],
  },
  {
    name: 'Integrations',
    href: '/admin/integrations',
    icon: Plug,
    subItems: [
      { name: 'eBay', href: '/admin/integrations/ebay', icon: ShoppingBag },
      { name: 'Shopify', href: '/admin/integrations/shopify', icon: Store },
      { name: 'Social Media', href: '/admin/integrations/social', icon: Share2 },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const isSubItemActive = (subHref: string, parentHref: string) => {
    if (subHref === parentHref) {
      return pathname === subHref;
    }
    return pathname.startsWith(subHref);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{
        padding: '0 24px 32px',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '20px',
            color: '#fff',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'block'
          }}>
            COACH
          </span>
          <span style={{
            fontSize: '10px',
            color: '#a1a1a6',
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}>
            Luxe Boutique
          </span>
        </Link>
        <span style={{
          display: 'block',
          fontSize: '10px',
          color: '#6e6e73',
          letterSpacing: '0.1em',
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: '1px solid rgba(255,255,255,0.08)'
        }}>
          Admin Panel
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '24px 12px', flex: 1 }}>
        {navItems.map((item) => (
          <div key={item.name}>
            <Link
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                color: isActive(item.href) ? '#fff' : '#a1a1a6',
                backgroundColor: isActive(item.href) && !item.subItems ? 'rgba(255,255,255,0.08)' : 'transparent',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive(item.href) ? 500 : 400,
                transition: 'all 0.2s'
              }}
            >
              <item.icon style={{ width: '20px', height: '20px' }} />
              <span style={{ flex: 1 }}>{item.name}</span>
              {item.subItems && (
                <ChevronRight style={{
                  width: '16px',
                  height: '16px',
                  transform: isActive(item.href) ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.2s'
                }} />
              )}
            </Link>

            {/* Sub Items */}
            {item.subItems && isActive(item.href) && (
              <div style={{ marginLeft: '32px', marginTop: '4px' }}>
                {item.subItems.map((subItem) => {
                  const active = isSubItemActive(subItem.href, item.href);
                  return (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        color: active ? '#fff' : '#6e6e73',
                        backgroundColor: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                        textDecoration: 'none',
                        fontSize: '13px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <subItem.icon style={{ width: '16px', height: '16px' }} />
                      {subItem.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Back to Store */}
      <div style={{
        padding: '20px 24px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        marginTop: 'auto'
      }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6e6e73',
            fontSize: '13px',
            textDecoration: 'none'
          }}
        >
          <ExternalLink style={{ width: '16px', height: '16px' }} />
          View Store
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(true)}
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 40,
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: '#1d1d1f',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
          aria-label="Open menu"
        >
          <Menu style={{ width: '20px', height: '20px', color: '#fff' }} />
        </button>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside style={{
          width: '260px',
          backgroundColor: '#1d1d1f',
          minHeight: '100vh',
          padding: '24px 0',
          position: 'fixed',
          left: 0,
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}>
          <SidebarContent />
        </aside>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && isMobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          {/* Backdrop */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)'
            }}
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Sidebar */}
          <aside style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '280px',
            maxWidth: '85%',
            backgroundColor: '#1d1d1f',
            padding: '24px 0',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
            animation: 'slideInLeft 0.3s ease-out'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Close menu"
            >
              <X style={{ width: '18px', height: '18px', color: '#fff' }} />
            </button>

            <SidebarContent />
          </aside>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
