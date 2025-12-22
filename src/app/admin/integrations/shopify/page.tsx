'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { Store, ExternalLink, Copy, Check, RefreshCw, ShoppingCart, Package, BarChart3, CreditCard } from 'lucide-react';

export default function ShopifyIntegrationPage() {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'error' | 'pending'>('pending');
  const [isChecking, setIsChecking] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const envVars = [
    { key: 'SHOPIFY_STORE_DOMAIN', label: 'Your Shopify store domain (e.g., your-store.myshopify.com)' },
    { key: 'SHOPIFY_STOREFRONT_ACCESS_TOKEN', label: 'Storefront API access token for public data' },
    { key: 'SHOPIFY_ADMIN_ACCESS_TOKEN', label: 'Admin API access token for full store access' },
  ];

  const features = [
    { title: 'Product Sync', desc: 'Sync products from Shopify', icon: Package, color: '#8b5cf6' },
    { title: 'Cart Backend', desc: 'Use Shopify for checkout', icon: ShoppingCart, color: '#06b6d4' },
    { title: 'Inventory', desc: 'Real-time stock levels', icon: BarChart3, color: '#10b981' },
    { title: 'Payments', desc: 'Process through Shopify', icon: CreditCard, color: '#f59e0b' },
  ];

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const response = await fetch('/api/admin/integrations/shopify');
      const data = await response.json();
      setStatus(data.connected ? 'connected' : 'disconnected');
    } catch {
      setStatus('error');
    } finally {
      setIsChecking(false);
    }
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <AdminSidebar />

      <div style={{ flex: 1, marginLeft: '260px' }}>
        <AdminHeader />

        <main style={{ padding: '32px 40px', maxWidth: '900px' }}>
          {/* Page Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: status === 'connected'
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'linear-gradient(135deg, #95bf47 0%, #5e8e3e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(94, 142, 62, 0.25)'
            }}>
              <Store style={{ width: '32px', height: '32px', color: '#fff' }} />
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '32px',
                fontWeight: 400,
                color: '#1d1d1f',
                marginBottom: '4px'
              }}>
                Shopify Integration
              </h1>
              <p style={{ fontSize: '15px', color: '#6e6e73' }}>
                Use Shopify as your cart and checkout backend
              </p>
            </div>
            <StatusBadge status={status} />
          </div>

          {/* Features Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '24px'
            }}>
              What Shopify Integration Enables
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px'
            }}>
              {features.map((feature) => (
                <div
                  key={feature.title}
                  style={{
                    padding: '20px',
                    backgroundColor: '#fafafa',
                    borderRadius: '16px',
                    textAlign: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: `${feature.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px'
                  }}>
                    <feature.icon style={{ width: '24px', height: '24px', color: feature.color }} />
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#1d1d1f',
                    marginBottom: '4px'
                  }}>
                    {feature.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#86868b' }}>
                    {feature.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connection Status Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1d1d1f' }}>
                Connection Status
              </h2>
              <button
                onClick={checkConnection}
                disabled={isChecking}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: '#1d1d1f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: isChecking ? 'not-allowed' : 'pointer',
                  opacity: isChecking ? 0.7 : 1,
                  transition: 'all 0.2s'
                }}
              >
                <RefreshCw style={{
                  width: '16px',
                  height: '16px',
                  animation: isChecking ? 'spin 1s linear infinite' : 'none'
                }} />
                {isChecking ? 'Testing...' : 'Test Connection'}
              </button>
            </div>

            {status === 'disconnected' && (
              <div style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '16px',
                border: '1px solid #fcd34d'
              }}>
                <p style={{ fontSize: '15px', color: '#92400e', marginBottom: '16px', fontWeight: 500 }}>
                  Shopify is not connected. Add your store credentials to enable cart and checkout.
                </p>
                <a
                  href="https://admin.shopify.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    backgroundColor: '#1d1d1f',
                    color: '#fff',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 500,
                    textDecoration: 'none'
                  }}
                >
                  Go to Shopify Admin <ExternalLink style={{ width: '14px', height: '14px' }} />
                </a>
              </div>
            )}

            {status === 'connected' && (
              <div style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                borderRadius: '16px',
                border: '1px solid #6ee7b7'
              }}>
                <p style={{ fontSize: '15px', color: '#065f46', fontWeight: 500 }}>
                  Connected to Shopify. Cart and checkout are ready.
                </p>
              </div>
            )}
          </div>

          {/* Environment Variables */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '8px'
            }}>
              Required Environment Variables
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#86868b',
              marginBottom: '24px'
            }}>
              Add these to your <code style={{
                backgroundColor: '#f0f0f0',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '13px',
                fontFamily: 'monospace'
              }}>.env.local</code> file or Render dashboard
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {envVars.map((env, index) => (
                <div
                  key={env.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 20px',
                    backgroundColor: '#fafafa',
                    borderRadius: '14px',
                    border: '1px solid #f0f0f0',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: '#e8e8e8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#6e6e73'
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontFamily: 'monospace',
                        color: '#1d1d1f',
                        fontWeight: 500,
                        marginBottom: '2px'
                      }}>
                        {env.key}
                      </div>
                      <div style={{ fontSize: '12px', color: '#86868b' }}>
                        {env.label}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(env.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      backgroundColor: copied === env.key ? '#10b981' : '#fff',
                      border: copied === env.key ? 'none' : '1px solid #e5e5e5',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: copied === env.key ? '#fff' : '#1d1d1f',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {copied === env.key ? (
                      <>
                        <Check style={{ width: '14px', height: '14px' }} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy style={{ width: '14px', height: '14px' }} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
