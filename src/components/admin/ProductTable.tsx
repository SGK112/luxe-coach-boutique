'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { Edit2, Trash2, Eye, Package } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  onDelete: (product: Product) => void;
  selectedIds: string[];
  onSelectChange: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
}

export default function ProductTable({
  products,
  onDelete,
  selectedIds,
  onSelectChange,
  onSelectAll,
}: ProductTableProps) {
  const allSelected = products.length > 0 && selectedIds.length === products.length;

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '20px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      overflow: 'hidden'
    }}>
      {/* Table Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '40px 80px 1fr 140px 100px 100px 120px',
        gap: '16px',
        padding: '16px 24px',
        backgroundColor: '#fafafa',
        borderBottom: '1px solid #f0f0f0',
        alignItems: 'center'
      }}>
        <div>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            style={{
              width: '18px',
              height: '18px',
              accentColor: '#1d1d1f',
              cursor: 'pointer'
            }}
          />
        </div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Image
        </div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Product
        </div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Category
        </div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Price
        </div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Status
        </div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#6e6e73', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>
          Actions
        </div>
      </div>

      {/* Table Body */}
      {products.length === 0 ? (
        <div style={{
          padding: '60px 24px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Package style={{ width: '28px', height: '28px', color: '#86868b' }} />
          </div>
          <p style={{ fontSize: '16px', color: '#1d1d1f', fontWeight: 500, marginBottom: '8px' }}>
            No products found
          </p>
          <p style={{ fontSize: '14px', color: '#86868b' }}>
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 80px 1fr 140px 100px 100px 120px',
              gap: '16px',
              padding: '16px 24px',
              borderBottom: '1px solid #f5f5f5',
              alignItems: 'center',
              backgroundColor: selectedIds.includes(product.id) ? '#f8f9ff' : 'transparent',
              transition: 'background-color 0.2s'
            }}
          >
            {/* Checkbox */}
            <div>
              <input
                type="checkbox"
                checked={selectedIds.includes(product.id)}
                onChange={(e) => onSelectChange(product.id, e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#1d1d1f',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Image */}
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: '#f5f5f5',
              position: 'relative'
            }}>
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="60px"
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Package style={{ width: '24px', height: '24px', color: '#c7c7cc' }} />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <p style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#1d1d1f',
                marginBottom: '4px',
                lineHeight: 1.3
              }}>
                {product.name}
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {product.isNew && (
                  <span style={{
                    fontSize: '10px',
                    padding: '3px 8px',
                    backgroundColor: '#1d1d1f',
                    color: '#fff',
                    borderRadius: '6px',
                    fontWeight: 600
                  }}>
                    NEW
                  </span>
                )}
                {product.isSale && (
                  <span style={{
                    fontSize: '10px',
                    padding: '3px 8px',
                    backgroundColor: '#bf4800',
                    color: '#fff',
                    borderRadius: '6px',
                    fontWeight: 600
                  }}>
                    SALE
                  </span>
                )}
                {product.isBestseller && (
                  <span style={{
                    fontSize: '10px',
                    padding: '3px 8px',
                    backgroundColor: '#7c3aed',
                    color: '#fff',
                    borderRadius: '6px',
                    fontWeight: 600
                  }}>
                    BEST
                  </span>
                )}
              </div>
            </div>

            {/* Category */}
            <div style={{ fontSize: '13px', color: '#6e6e73' }}>
              {product.category}
            </div>

            {/* Price */}
            <div>
              {product.originalPrice ? (
                <>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#bf4800' }}>
                    ${product.price}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: '#86868b',
                    textDecoration: 'line-through',
                    marginLeft: '6px'
                  }}>
                    ${product.originalPrice}
                  </span>
                </>
              ) : (
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>
                  ${product.price}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 500,
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: product.inStock ? '#dcfce7' : '#fef2f2',
                color: product.inStock ? '#16a34a' : '#dc2626'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: product.inStock ? '#16a34a' : '#dc2626'
                }} />
                {product.inStock ? 'In Stock' : 'Out'}
              </span>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end'
            }}>
              <Link
                href={`/product/${product.slug}`}
                target="_blank"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#f5f5f5',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="View"
              >
                <Eye style={{ width: '16px', height: '16px', color: '#6e6e73' }} />
              </Link>
              <Link
                href={`/admin/products/${product.id}/edit`}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#f5f5f5',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="Edit"
              >
                <Edit2 style={{ width: '16px', height: '16px', color: '#6e6e73' }} />
              </Link>
              <button
                onClick={() => onDelete(product)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#fef2f2',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="Delete"
              >
                <Trash2 style={{ width: '16px', height: '16px', color: '#dc2626' }} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
