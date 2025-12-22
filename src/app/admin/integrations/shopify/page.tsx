'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { Store, ExternalLink, Copy, Check, RefreshCw } from 'lucide-react';

export default function ShopifyIntegrationPage() {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'error' | 'pending'>('pending');
  const [isChecking, setIsChecking] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const envVars = [
    { key: 'SHOPIFY_STORE_DOMAIN', label: 'Your Shopify store domain (e.g., your-store.myshopify.com)' },
    { key: 'SHOPIFY_STOREFRONT_ACCESS_TOKEN', label: 'Storefront API access token for public data' },
    { key: 'SHOPIFY_ADMIN_ACCESS_TOKEN', label: 'Admin API access token for full store access' },
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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <AdminSidebar />

      <div style={{ flex: 1, marginLeft: '260px' }}>
        <AdminHeader />

        <main style={{ padding: '32px', maxWidth: '800px' }}>
          {/* Page Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: status === 'connected' ? '#dcfce7' : '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Store style={{
                width: '28px',
                height: '28px',
                color: status === 'connected' ? '#16a34a' : '#6e6e73'
              }} />
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '28px',
                fontWeight: 400,
                color: '#1d1d1f',
                marginBottom: '4px'
              }}>
                Shopify Integration
              </h1>
              <p style={{ fontSize: '14px', color: '#86868b' }}>
                Use Shopify as your cart and checkout backend
              </p>
            </div>
            <StatusBadge status={status} />
          </div>

          {/* Features Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid #f0f0f0',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '17px',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '20px'
            }}>
              What Shopify Integration Enables
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {[
                { title: 'Product Sync', desc: 'Sync products from Shopify' },
                { title: 'Cart Backend', desc: 'Use Shopify for checkout' },
                { title: 'Inventory', desc: 'Real-time stock levels' },
                { title: 'Orders', desc: 'Process through Shopify' },
              ].map((feature) => (
                <div
                  key={feature.title}
                  style={{
                    padding: '16px',
                    backgroundColor: '#fafafa',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#1d1d1f',
                    marginBottom: '4px'
                  }}>
                    {feature.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#86868b' }}>
                    {feature.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connection Status Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid #f0f0f0',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f' }}>
                Connection Status
              </h2>
              <button
                onClick={checkConnection}
                disabled={isChecking}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: '#f5f5f5',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '13px',
                  color: '#1d1d1f',
                  cursor: isChecking ? 'not-allowed' : 'pointer'
                }}
              >
                <RefreshCw style={{
                  width: '16px',
                  height: '16px',
                  animation: isChecking ? 'spin 1s linear infinite' : 'none'
                }} />
                {isChecking ? 'Checking...' : 'Test Connection'}
              </button>
            </div>

            {status === 'disconnected' && (
              <div style={{
                padding: '20px',
                backgroundColor: '#fffbeb',
                borderRadius: '12px',
                border: '1px solid #fef3c7'
              }}>
                <p style={{ fontSize: '14px', color: '#92400e', marginBottom: '12px' }}>
                  Shopify is not connected. Add your store credentials to enable cart and checkout.
                </p>
                <a
                  href="https://admin.shopify.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: '#1d1d1f',
                    fontWeight: 500
                  }}
                >
                  Go to Shopify Admin <ExternalLink style={{ width: '14px', height: '14px' }} />
                </a>
              </div>
            )}

            {status === 'connected' && (
              <div style={{
                padding: '20px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                border: '1px solid #dcfce7'
              }}>
                <p style={{ fontSize: '14px', color: '#166534' }}>
                  Connected to Shopify. Cart and checkout are ready.
                </p>
              </div>
            )}
          </div>

          {/* Environment Variables */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid #f0f0f0'
          }}>
            <h2 style={{
              fontSize: '17px',
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
                backgroundColor: '#f5f5f5',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '13px'
              }}>.env.local</code> file
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {envVars.map((env) => (
                <div
                  key={env.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    backgroundColor: '#fafafa',
                    borderRadius: '10px',
                    border: '1px solid #f0f0f0'
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: '13px',
                      fontFamily: 'monospace',
                      color: '#1d1d1f',
                      marginBottom: '2px'
                    }}>
                      {env.key}
                    </div>
                    <div style={{ fontSize: '12px', color: '#86868b' }}>
                      {env.label}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(env.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      backgroundColor: '#fff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#6e6e73',
                      cursor: 'pointer'
                    }}
                  >
                    {copied === env.key ? (
                      <>
                        <Check style={{ width: '14px', height: '14px', color: '#16a34a' }} />
                        Copied
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
