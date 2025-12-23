'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminContentWrapper from '@/components/admin/AdminContentWrapper';
import IntegrationCard from '@/components/admin/IntegrationCard';
import { ShoppingBag, Store, Share2, TrendingUp, Package, Users } from 'lucide-react';

export default function AdminDashboardPage() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <AdminSidebar />

      <AdminContentWrapper>
        <AdminHeader />

        <main style={{ padding: '24px 16px' }} className="admin-main">
          {/* Welcome Section */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(24px, 5vw, 32px)',
              fontWeight: 400,
              color: '#1d1d1f',
              marginBottom: '8px'
            }}>
              Welcome back
            </h1>
            <p style={{ fontSize: '14px', color: '#86868b' }}>
              {today}
            </p>
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
            marginBottom: '40px'
          }}>
            {[
              { label: 'Total Products', value: '20', icon: Package, trend: '+2 this week' },
              { label: 'Active Integrations', value: '0', icon: TrendingUp, trend: 'Set up below' },
              { label: 'Social Accounts', value: '0', icon: Users, trend: 'Connect accounts' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  border: '1px solid #f0f0f0'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <span style={{ fontSize: '13px', color: '#86868b' }}>{stat.label}</span>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <stat.icon style={{ width: '16px', height: '16px', color: '#6e6e73' }} />
                  </div>
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#1d1d1f',
                  marginBottom: '4px'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '11px', color: '#86868b' }}>
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Integrations Section */}
          <div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '20px'
            }}>
              Integrations
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}>
              <IntegrationCard
                title="eBay"
                description="Sync products and inventory with your eBay seller account"
                icon={<ShoppingBag style={{ width: '24px', height: '24px' }} />}
                status="disconnected"
                href="/admin/integrations/ebay"
              />

              <IntegrationCard
                title="Shopify"
                description="Connect Shopify for cart and checkout functionality"
                icon={<Store style={{ width: '24px', height: '24px' }} />}
                status="disconnected"
                href="/admin/integrations/shopify"
              />

              <IntegrationCard
                title="Social Media"
                description="Link your social accounts for cross-platform presence"
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
