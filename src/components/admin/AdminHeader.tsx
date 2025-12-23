'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, ChevronRight, User } from 'lucide-react';

export default function AdminHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  // Generate breadcrumbs from pathname
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: { name: string; href: string }[] = [];

    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const name = path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbs.push({
        name: name === 'Admin' ? 'Dashboard' : name,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header style={{
      height: '64px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '0 16px 0 70px' : '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      {/* Breadcrumbs */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflow: 'hidden'
      }}>
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minWidth: 0
          }}>
            {index > 0 && (
              <ChevronRight style={{
                width: '14px',
                height: '14px',
                color: '#d4d4d4',
                flexShrink: 0
              }} />
            )}
            <span style={{
              fontSize: isMobile ? '13px' : '14px',
              color: index === breadcrumbs.length - 1 ? '#1d1d1f' : '#86868b',
              fontWeight: index === breadcrumbs.length - 1 ? 500 : 400,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {crumb.name}
            </span>
          </div>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px' }}>
        {session?.user && !isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <User style={{ width: '16px', height: '16px', color: '#86868b' }} />
              </div>
            )}
            <span style={{ fontSize: '13px', color: '#1d1d1f' }}>
              {session.user.name || session.user.email}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: isMobile ? '8px 12px' : '10px 20px',
            backgroundColor: '#f5f5f5',
            border: 'none',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#1d1d1f',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            whiteSpace: 'nowrap'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e8e8e8'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
        >
          <LogOut style={{ width: '16px', height: '16px' }} />
          {!isMobile && 'Logout'}
        </button>
      </div>
    </header>
  );
}
