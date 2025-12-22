'use client';

import { useState, useEffect, use } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductForm from '@/components/admin/ProductForm';
import { Product } from '@/types';
import { Edit2 } from 'lucide-react';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data.product);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <AdminSidebar />

      <div style={{ flex: 1, marginLeft: '260px' }}>
        <AdminHeader />

        <main style={{ padding: '32px 40px' }}>
          {isLoading ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '3px solid #f0f0f0',
                borderTopColor: '#1d1d1f',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
          ) : error ? (
            <div style={{
              textAlign: 'center',
              padding: '60px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
            }}>
              <p style={{ fontSize: '16px', color: '#dc2626', marginBottom: '16px' }}>
                {error}
              </p>
              <a
                href="/admin/products"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#1d1d1f',
                  color: '#fff',
                  borderRadius: '10px',
                  fontSize: '14px',
                  textDecoration: 'none'
                }}
              >
                Back to Products
              </a>
            </div>
          ) : product ? (
            <>
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
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)'
                }}>
                  <Edit2 style={{ width: '24px', height: '24px', color: '#fff' }} />
                </div>
                <div>
                  <h1 style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: '32px',
                    fontWeight: 400,
                    color: '#1d1d1f',
                    marginBottom: '4px'
                  }}>
                    Edit Product
                  </h1>
                  <p style={{ fontSize: '14px', color: '#6e6e73' }}>
                    {product.name}
                  </p>
                </div>
              </div>

              <ProductForm product={product} isEdit />
            </>
          ) : null}
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
