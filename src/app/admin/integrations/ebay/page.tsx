'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { ShoppingBag, ExternalLink, Copy, Check, RefreshCw } from 'lucide-react';

export default function EbayIntegrationPage() {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'error' | 'pending'>('pending');
  const [isChecking, setIsChecking] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const envVars = [
    { key: 'EBAY_APP_ID', label: 'Application ID', value: process.env.NEXT_PUBLIC_EBAY_APP_ID || '' },
    { key: 'EBAY_CERT_ID', label: 'Certificate ID', value: '' },
    { key: 'EBAY_DEV_ID', label: 'Developer ID', value: '' },
    { key: 'EBAY_OAUTH_TOKEN', label: 'OAuth Token', value: '' },
  ];

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const response = await fetch('/api/admin/integrations/ebay');
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
              <ShoppingBag style={{
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
                eBay Integration
              </h1>
              <p style={{ fontSize: '14px', color: '#86868b' }}>
                Sync products and inventory with your eBay seller account
              </p>
            </div>
            <StatusBadge status={status} />
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
                  eBay is not connected. Add your API credentials to your environment variables to enable this integration.
                </p>
                <a
                  href="https://developer.ebay.com/my/keys"
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
                  Get eBay API Keys <ExternalLink style={{ width: '14px', height: '14px' }} />
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
                  Successfully connected to eBay. Your store is synced and ready.
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
