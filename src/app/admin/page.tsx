'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
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

      <div style={{ flex: 1, marginLeft: '260px' }}>
        <AdminHeader />

        <main style={{ padding: '32px' }}>
          {/* Welcome Section */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '32px',
              fontWeight: 400,
              color: '#1d1d1f',
              marginBottom: '8px'
            }}>
              Welcome back
            </h1>
            <p style={{ fontSize: '15px', color: '#86868b' }}>
              {today}
            </p>
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '48px'
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
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  border: '1px solid #f0f0f0'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <span style={{ fontSize: '14px', color: '#86868b' }}>{stat.label}</span>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <stat.icon style={{ width: '18px', height: '18px', color: '#6e6e73' }} />
                  </div>
                </div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: '#1d1d1f',
                  marginBottom: '4px'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: '#86868b' }}>
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Integrations Section */}
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '24px'
            }}>
              Integrations
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
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
      </div>
    </div>
  );
}
