'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminContentWrapper from '@/components/admin/AdminContentWrapper';
import ProductTable from '@/components/admin/ProductTable';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { Product } from '@/types';
import { Package, Plus, Search, Filter, Upload, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const limit = 20;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page, search, category, stockFilter, sort]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', limit.toString());
      if (search) params.set('search', search);
      if (category) params.set('category', category);
      if (stockFilter === 'inStock') params.set('inStock', 'true');
      if (stockFilter === 'outOfStock') params.set('inStock', 'false');
      if (sort) params.set('sort', sort);

      const response = await fetch(`/api/admin/products?${params.toString()}`);
      const data = await response.json();

      setProducts(data.products || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/products?all=true');
      const data = await response.json();
      const uniqueCategories = [...new Set((data.products || []).map((p: Product) => p.category))];
      setCategories(uniqueCategories as string[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteProduct) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/products/${deleteProduct.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter(p => p.id !== deleteProduct.id));
        setTotal(t => t - 1);
        setDeleteProduct(null);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    if (!confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) return;

    try {
      await Promise.all(
        selectedIds.map(id =>
          fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
        )
      );
      setProducts(products.filter(p => !selectedIds.includes(p.id)));
      setTotal(t => t - selectedIds.length);
      setSelectedIds([]);
    } catch (error) {
      console.error('Error bulk deleting:', error);
    }
  };

  const handleSelectChange = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(i => i !== id));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedIds(products.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <AdminSidebar />

      <AdminContentWrapper>
        <AdminHeader />

        <main style={{ padding: '24px 16px' }} className="admin-main-wide">
          {/* Page Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1d1d1f 0%, #3d3d3f 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
              }}>
                <Package style={{ width: '28px', height: '28px', color: '#fff' }} />
              </div>
              <div>
                <h1 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '32px',
                  fontWeight: 400,
                  color: '#1d1d1f',
                  marginBottom: '4px'
                }}>
                  Products
                </h1>
                <p style={{ fontSize: '14px', color: '#6e6e73' }}>
                  {total} products in your catalog
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Link
                href="/admin/products/import"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: '#fff',
                  color: '#1d1d1f',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                <Upload style={{ width: '18px', height: '18px' }} />
                Import CSV
              </Link>
              <Link
                href="/admin/products/new"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: '#1d1d1f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                <Plus style={{ width: '18px', height: '18px' }} />
                Add Product
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {/* Search */}
            <div style={{
              position: 'relative',
              flex: '1',
              minWidth: '280px',
              maxWidth: '400px'
            }}>
              <Search style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '18px',
                height: '18px',
                color: '#86868b'
              }} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                style={{
                  width: '100%',
                  height: '48px',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              style={{
                height: '48px',
                padding: '0 40px 0 16px',
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2386868b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '18px'
              }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Stock Filter */}
            <select
              value={stockFilter}
              onChange={(e) => {
                setStockFilter(e.target.value);
                setPage(1);
              }}
              style={{
                height: '48px',
                padding: '0 40px 0 16px',
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2386868b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '18px'
              }}
            >
              <option value="">All Stock</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              style={{
                height: '48px',
                padding: '0 40px 0 16px',
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2386868b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '18px'
              }}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Rating</option>
            </select>

            {/* Bulk Delete */}
            {selectedIds.length > 0 && (
              <button
                onClick={handleBulkDelete}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                <Trash2 style={{ width: '16px', height: '16px' }} />
                Delete ({selectedIds.length})
              </button>
            )}
          </div>

          {/* Product Table */}
          {isLoading ? (
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '80px',
              textAlign: 'center',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '3px solid #f0f0f0',
                borderTopColor: '#1d1d1f',
                borderRadius: '50%',
                margin: '0 auto',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ marginTop: '16px', color: '#6e6e73' }}>Loading products...</p>
            </div>
          ) : (
            <ProductTable
              products={products}
              onDelete={setDeleteProduct}
              selectedIds={selectedIds}
              onSelectChange={handleSelectChange}
              onSelectAll={handleSelectAll}
            />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '24px'
            }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '10px',
                  fontSize: '14px',
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                  opacity: page === 1 ? 0.5 : 1
                }}
              >
                <ChevronLeft style={{ width: '16px', height: '16px' }} />
                Previous
              </button>

              <span style={{ fontSize: '14px', color: '#6e6e73' }}>
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '10px',
                  fontSize: '14px',
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  opacity: page === totalPages ? 0.5 : 1
                }}
              >
                Next
                <ChevronRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          )}
        </main>
      </AdminContentWrapper>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteProduct}
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteProduct?.name}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (min-width: 768px) {
          .admin-main-wide {
            padding: 32px 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
