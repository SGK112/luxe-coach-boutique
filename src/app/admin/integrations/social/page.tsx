'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import { Share2, Instagram, Facebook, Twitter, Copy, Check, ExternalLink } from 'lucide-react';

// Custom TikTok and Pinterest icons as Lucide doesn't have them
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0a12 12 0 00-4.37 23.17c-.1-.94-.2-2.4.04-3.43l1.4-5.96s-.37-.73-.37-1.8c0-1.69.98-2.95 2.2-2.95 1.04 0 1.54.78 1.54 1.72 0 1.05-.67 2.61-1.01 4.06-.29 1.21.61 2.2 1.8 2.2 2.16 0 3.82-2.28 3.82-5.57 0-2.91-2.1-4.95-5.08-4.95-3.46 0-5.5 2.6-5.5 5.28 0 1.05.4 2.17.91 2.78a.36.36 0 01.08.35l-.34 1.36c-.05.22-.18.27-.41.16-1.52-.71-2.47-2.93-2.47-4.71 0-3.84 2.79-7.36 8.04-7.36 4.22 0 7.5 3.01 7.5 7.02 0 4.19-2.64 7.56-6.31 7.56-1.23 0-2.39-.64-2.79-1.4l-.76 2.89c-.27 1.06-1.01 2.39-1.51 3.2A12 12 0 1012 0z"/>
  </svg>
);

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  envVars: { key: string; label: string }[];
  setupUrl: string;
}

const platforms: SocialPlatform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram style={{ width: '24px', height: '24px' }} />,
    color: '#E4405F',
    envVars: [
      { key: 'INSTAGRAM_ACCESS_TOKEN', label: 'Instagram API Access Token' },
      { key: 'INSTAGRAM_BUSINESS_ACCOUNT_ID', label: 'Business Account ID' },
    ],
    setupUrl: 'https://developers.facebook.com/docs/instagram-basic-display-api/getting-started'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: <Facebook style={{ width: '24px', height: '24px' }} />,
    color: '#1877F2',
    envVars: [
      { key: 'FACEBOOK_PAGE_ID', label: 'Facebook Page ID' },
      { key: 'FACEBOOK_ACCESS_TOKEN', label: 'Page Access Token' },
    ],
    setupUrl: 'https://developers.facebook.com/docs/pages/getting-started'
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    icon: <Twitter style={{ width: '24px', height: '24px' }} />,
    color: '#1DA1F2',
    envVars: [
      { key: 'TWITTER_API_KEY', label: 'API Key' },
      { key: 'TWITTER_API_SECRET', label: 'API Secret' },
      { key: 'TWITTER_ACCESS_TOKEN', label: 'Access Token' },
      { key: 'TWITTER_ACCESS_TOKEN_SECRET', label: 'Access Token Secret' },
    ],
    setupUrl: 'https://developer.twitter.com/en/docs/twitter-api'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: <TikTokIcon />,
    color: '#000000',
    envVars: [
      { key: 'TIKTOK_ACCESS_TOKEN', label: 'TikTok API Access Token' },
      { key: 'TIKTOK_OPEN_ID', label: 'Open ID' },
    ],
    setupUrl: 'https://developers.tiktok.com/doc/login-kit-web'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: <PinterestIcon />,
    color: '#E60023',
    envVars: [
      { key: 'PINTEREST_ACCESS_TOKEN', label: 'Pinterest API Token' },
      { key: 'PINTEREST_BOARD_ID', label: 'Board ID' },
    ],
    setupUrl: 'https://developers.pinterest.com/docs/getting-started/introduction/'
  },
];

export default function SocialIntegrationPage() {
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, 'connected' | 'disconnected' | 'error'>>({});
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    checkConnections();
  }, []);

  const checkConnections = async () => {
    try {
      const response = await fetch('/api/admin/integrations/social');
      const data = await response.json();
      setStatuses(data.platforms || {});
    } catch {
      // Set all as disconnected on error
      const defaults: Record<string, 'disconnected'> = {};
      platforms.forEach(p => defaults[p.id] = 'disconnected');
      setStatuses(defaults);
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
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Share2 style={{ width: '28px', height: '28px', color: '#6e6e73' }} />
            </div>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '28px',
                fontWeight: 400,
                color: '#1d1d1f',
                marginBottom: '4px'
              }}>
                Social Media
              </h1>
              <p style={{ fontSize: '14px', color: '#86868b' }}>
                Connect your social accounts to display on your store
              </p>
            </div>
          </div>

          {/* Platforms List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {platforms.map((platform) => (
              <div
                key={platform.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  border: '1px solid #f0f0f0',
                  overflow: 'hidden'
                }}
              >
                {/* Platform Header */}
                <button
                  onClick={() => setExpandedPlatform(
                    expandedPlatform === platform.id ? null : platform.id
                  )}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px 24px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: statuses[platform.id] === 'connected'
                      ? `${platform.color}15`
                      : '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: statuses[platform.id] === 'connected'
                      ? platform.color
                      : '#6e6e73'
                  }}>
                    {platform.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#1d1d1f'
                    }}>
                      {platform.name}
                    </div>
                  </div>
                  <StatusBadge
                    status={statuses[platform.id] || 'disconnected'}
                    size="sm"
                  />
                </button>

                {/* Expanded Content */}
                {expandedPlatform === platform.id && (
                  <div style={{
                    padding: '0 24px 24px',
                    borderTop: '1px solid #f0f0f0'
                  }}>
                    <div style={{ paddingTop: '20px' }}>
                      <p style={{
                        fontSize: '14px',
                        color: '#86868b',
                        marginBottom: '16px'
                      }}>
                        Add these environment variables to connect {platform.name}:
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {platform.envVars.map((env) => (
                          <div
                            key={env.key}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 14px',
                              backgroundColor: '#fafafa',
                              borderRadius: '8px',
                              border: '1px solid #f0f0f0'
                            }}
                          >
                            <div>
                              <div style={{
                                fontSize: '12px',
                                fontFamily: 'monospace',
                                color: '#1d1d1f'
                              }}>
                                {env.key}
                              </div>
                              <div style={{ fontSize: '11px', color: '#86868b' }}>
                                {env.label}
                              </div>
                            </div>
                            <button
                              onClick={() => copyToClipboard(env.key)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 10px',
                                backgroundColor: '#fff',
                                border: '1px solid #e5e5e5',
                                borderRadius: '6px',
                                fontSize: '11px',
                                color: '#6e6e73',
                                cursor: 'pointer'
                              }}
                            >
                              {copied === env.key ? (
                                <Check style={{ width: '12px', height: '12px', color: '#16a34a' }} />
                              ) : (
                                <Copy style={{ width: '12px', height: '12px' }} />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>

                      <a
                        href={platform.setupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '16px',
                          fontSize: '13px',
                          color: '#1d1d1f',
                          fontWeight: 500,
                          textDecoration: 'none'
                        }}
                      >
                        View Setup Guide <ExternalLink style={{ width: '14px', height: '14px' }} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
