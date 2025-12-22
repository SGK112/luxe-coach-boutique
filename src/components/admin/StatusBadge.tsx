'use client';

interface StatusBadgeProps {
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const colors = {
    connected: { bg: '#dcfce7', text: '#16a34a', dot: '#16a34a' },
    disconnected: { bg: '#f5f5f5', text: '#6e6e73', dot: '#a1a1a6' },
    error: { bg: '#fef2f2', text: '#dc2626', dot: '#dc2626' },
    pending: { bg: '#fef3c7', text: '#d97706', dot: '#d97706' },
  };

  const labels = {
    connected: 'Connected',
    disconnected: 'Not Connected',
    error: 'Error',
    pending: 'Pending',
  };

  const { bg, text, dot } = colors[status];
  const isSmall = size === 'sm';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: isSmall ? '6px' : '8px',
      padding: isSmall ? '4px 10px' : '6px 14px',
      backgroundColor: bg,
      borderRadius: '20px',
      fontSize: isSmall ? '11px' : '12px',
      fontWeight: 500,
      color: text
    }}>
      <span style={{
        width: isSmall ? '6px' : '8px',
        height: isSmall ? '6px' : '8px',
        borderRadius: '50%',
        backgroundColor: dot,
        animation: status === 'pending' ? 'pulse 2s ease-in-out infinite' : 'none'
      }} />
      {labels[status]}
    </span>
  );
}
