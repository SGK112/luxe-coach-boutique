'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductForm from '@/components/admin/ProductForm';
import { Plus } from 'lucide-react';

export default function NewProductPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <AdminSidebar />

      <div style={{ flex: 1, marginLeft: '260px' }}>
        <AdminHeader />

        <main style={{ padding: '32px 40px' }}>
          {/* Page Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
            }}>
              <Plus style={{ width: '28px', height: '28px', color: '#fff' }} />
            </div>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '32px',
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
      </div>
    </div>
  );
}
