'use client';

import { useState, useEffect } from 'react';

interface AdminContentWrapperProps {
  children: React.ReactNode;
}

export default function AdminContentWrapper({ children }: AdminContentWrapperProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{
      flex: 1,
      marginLeft: isMobile ? 0 : '260px',
      minHeight: '100vh',
      transition: 'margin-left 0.3s ease'
    }}>
      {children}
    </div>
  );
}
