'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminContentWrapper from '@/components/admin/AdminContentWrapper';
import ProductForm from '@/components/admin/ProductForm';
import { Plus } from 'lucide-react';

export default function NewProductPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <AdminSidebar />

      <AdminContentWrapper>
        <AdminHeader />

        <main style={{ padding: '20px 16px' }} className="admin-main">
          {/* Page Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)',
              flexShrink: 0
            }}>
              <Plus style={{ width: '24px', height: '24px', color: '#fff' }} />
            </div>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(24px, 5vw, 32px)',
                fontWeight: 400,
                color: '#1d1d1f',
                marginBottom: '4px'
              }}>
                Add New Product
              </h1>
              <p style={{ fontSize: '14px', color: '#6e6e73' }}>
                Create a new product for your catalog
              </p>
            </div>
          </div>

          <ProductForm />
        </main>
      </AdminContentWrapper>

      <style jsx global>{`
        @media (min-width: 768px) {
          .admin-main {
            padding: 32px 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
