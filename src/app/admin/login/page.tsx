'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1d1d1f 0%, #2d2d2f 50%, #1d1d1f 100%)',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '48px 40px',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#1d1d1f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <Lock style={{ width: '28px', height: '28px', color: '#fff' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#1d1d1f',
            letterSpacing: '0.1em',
            marginBottom: '8px'
          }}>
            COACH Admin
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#86868b'
          }}>
            Enter your password to continue
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 16px',
            backgroundColor: '#fef2f2',
            borderRadius: '12px',
            marginBottom: '24px',
            border: '1px solid #fecaca'
          }}>
            <AlertCircle style={{ width: '18px', height: '18px', color: '#dc2626', flexShrink: 0 }} />
            <span style={{ fontSize: '14px', color: '#dc2626' }}>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              style={{
                width: '100%',
                height: '56px',
                padding: '0 52px 0 20px',
                fontSize: '16px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1d1d1f';
                e.target.style.boxShadow = '0 0 0 3px rgba(29, 29, 31, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e5e5';
                e.target.style.boxShadow = 'none';
              }}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {showPassword ? (
                <EyeOff style={{ width: '20px', height: '20px', color: '#86868b' }} />
              ) : (
                <Eye style={{ width: '20px', height: '20px', color: '#86868b' }} />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            style={{
              width: '100%',
              height: '56px',
              backgroundColor: isLoading || !password ? '#86868b' : '#1d1d1f',
              color: '#fff',
              border: 'none',
              borderRadius: '28px',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              cursor: isLoading || !password ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {isLoading ? 'Authenticating...' : 'Enter Admin'}
          </button>
        </form>

        {/* Back to Store Link */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a
            href="/"
            style={{
              fontSize: '13px',
              color: '#86868b',
              textDecoration: 'none'
            }}
          >
            Back to Store
          </a>
        </div>
      </div>
    </div>
  );
}
