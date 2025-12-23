'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminContentWrapper from '@/components/admin/AdminContentWrapper';
import IntegrationCard from '@/components/admin/IntegrationCard';
import { ShoppingBag, Store, Share2 } from 'lucide-react';

export default function IntegrationsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <AdminSidebar />

      <AdminContentWrapper>
        <AdminHeader />

        <main style={{ padding: '24px 16px' }} className="admin-main">
          {/* Page Header */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '32px',
              fontWeight: 400,
              color: '#1d1d1f',
              marginBottom: '8px'
            }}>
              Integrations
            </h1>
            <p style={{ fontSize: '15px', color: '#86868b' }}>
              Connect external services to power your store
            </p>
          </div>

          {/* E-Commerce Section */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#86868b',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '20px'
            }}>
              E-Commerce Platforms
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '24px'
            }}>
              <IntegrationCard
                title="eBay Store"
                description="Sync your product listings, inventory, and orders with your eBay seller account"
                icon={<ShoppingBag style={{ width: '24px', height: '24px' }} />}
                status="disconnected"
                href="/admin/integrations/ebay"
              />

              <IntegrationCard
                title="Shopify"
                description="Use Shopify as your cart and checkout backend with full product sync"
                icon={<Store style={{ width: '24px', height: '24px' }} />}
                status="disconnected"
                href="/admin/integrations/shopify"
              />
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#86868b',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '20px'
            }}>
              Social Media
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '24px'
            }}>
              <IntegrationCard
                title="Social Media Accounts"
                description="Connect Instagram, Facebook, Twitter, TikTok, and Pinterest to display on your store"
                icon={<Share2 style={{ width: '24px', height: '24px' }} />}
                status="disconnected"
                href="/admin/integrations/social"
              />
            </div>
          </div>
        </main>
      </AdminContentWrapper>

      <style jsx global>{`
        @media (min-width: 768px) {
          .admin-main {
            padding: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
