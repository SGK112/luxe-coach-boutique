'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  href: string;
  stats?: { label: string; value: string }[];
}

export default function IntegrationCard({
  title,
  description,
  icon,
  status,
  href,
  stats
}: IntegrationCardProps) {
  return (
    <Link
      href={href}
      style={{
        display: 'block',
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        border: '1px solid #f0f0f0',
        textDecoration: 'none',
        transition: 'all 0.2s'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        {/* Icon */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: status === 'connected' ? '#dcfce7' : '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: status === 'connected' ? '#16a34a' : '#6e6e73'
        }}>
          {icon}
        </div>

        {/* Status Badge */}
        <StatusBadge status={status} size="sm" />
      </div>

      {/* Title & Description */}
      <h3 style={{
        fontSize: '17px',
        fontWeight: 600,
        color: '#1d1d1f',
        marginBottom: '6px'
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '14px',
        color: '#86868b',
        lineHeight: 1.5,
        marginBottom: stats && stats.length > 0 ? '20px' : '0'
      }}>
        {description}
      </p>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '24px',
          paddingTop: '16px',
          borderTop: '1px solid #f0f0f0'
        }}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <div style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#1d1d1f'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#86868b'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Arrow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: '16px',
        color: '#86868b'
      }}>
        <span style={{ fontSize: '13px', marginRight: '4px' }}>Configure</span>
        <ChevronRight style={{ width: '16px', height: '16px' }} />
      </div>
    </Link>
  );
}
