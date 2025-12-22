'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductColor } from '@/types';
import ImageUploader from './ImageUploader';
import ColorVariantManager from './ColorVariantManager';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';

interface ProductFormProps {
  product?: Product;
  isEdit?: boolean;
}

export default function ProductForm({ product, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  // Form state
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [category, setCategory] = useState(product?.category || '');
  const [price, setPrice] = useState(product?.price?.toString() || '');
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice?.toString() || '');
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [colors, setColors] = useState<ProductColor[]>(product?.colors || []);
  const [details, setDetails] = useState<string[]>(product?.details || []);
  const [material, setMaterial] = useState(product?.material || '');
  const [dimensions, setDimensions] = useState(product?.dimensions || '');
  const [inStock, setInStock] = useState(product?.inStock !== false);
  const [isNew, setIsNew] = useState(product?.isNew || false);
  const [isSale, setIsSale] = useState(product?.isSale || false);
  const [isBestseller, setIsBestseller] = useState(product?.isBestseller || false);
  const [newDetail, setNewDetail] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const addDetail = () => {
    if (newDetail.trim()) {
      setDetails([...details, newDetail.trim()]);
      setNewDetail('');
    }
  };

  const removeDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const productData = {
        name,
        description,
        category,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
        images,
        colors,
        details,
        material: material || undefined,
        dimensions: dimensions || undefined,
        inStock,
        isNew,
        isSale: isSale || !!originalPrice,
        isBestseller,
        rating: product?.rating || 0,
        reviewCount: product?.reviewCount || 0,
      };

      const url = isEdit ? `/api/admin/products/${product?.id}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setError('An error occurred while saving');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    height: '48px',
    padding: '0 16px',
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '12px',
    fontSize: '14px',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#1d1d1f',
    marginBottom: '8px',
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{
          padding: '16px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '12px',
          color: '#dc2626',
          fontSize: '14px',
          marginBottom: '24px'
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px' }}>
        {/* Left Column - Main Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Basic Information Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '24px'
            }}>
              Basic Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Name */}
              <div>
                <label style={labelStyle}>Product Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Brooklyn Shoulder Bag"
                  required
                  style={inputStyle}
                />
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product..."
                  rows={4}
                  style={{
                    ...inputStyle,
                    height: 'auto',
                    padding: '14px 16px',
                    resize: 'vertical',
                    minHeight: '100px'
                  }}
                />
              </div>

              {/* Category */}
              <div>
                <label style={labelStyle}>Category *</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    style={{
                      ...inputStyle,
                      cursor: 'pointer',
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2386868b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '18px'
                    }}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Or type new..."
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ ...inputStyle, width: '200px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Images Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <ImageUploader images={images} onChange={setImages} />
          </div>

          {/* Colors Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <ColorVariantManager colors={colors} onChange={setColors} />
          </div>

          {/* Details Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '24px'
            }}>
              Product Details
            </h2>

            {/* Details List */}
            <div style={{ marginBottom: '16px' }}>
              {details.map((detail, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#fafafa',
                    borderRadius: '10px',
                    marginBottom: '8px'
                  }}
                >
                  <span style={{ flex: 1, fontSize: '14px', color: '#1d1d1f' }}>{detail}</span>
                  <button
                    type="button"
                    onClick={() => removeDetail(index)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: '#fef2f2',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <X style={{ width: '14px', height: '14px', color: '#dc2626' }} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Detail */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDetail())}
                placeholder="e.g., Polished pebble leather"
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                type="button"
                onClick={addDetail}
                style={{
                  padding: '0 20px',
                  backgroundColor: '#f5f5f5',
                  color: '#1d1d1f',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Plus style={{ width: '16px', height: '16px' }} />
                Add
              </button>
            </div>

            {/* Material & Dimensions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
              <div>
                <label style={labelStyle}>Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="e.g., Leather"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Dimensions</label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder='e.g., 10" x 8" x 3"'
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Pricing & Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Pricing Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '24px'
            }}>
              Pricing
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Compare at Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="Original price for sale items"
                  style={inputStyle}
                />
                <p style={{ fontSize: '12px', color: '#86868b', marginTop: '6px' }}>
                  Set this to show a sale price
                </p>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#1d1d1f',
              marginBottom: '24px'
            }}>
              Status
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* In Stock Toggle */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#fafafa',
                borderRadius: '12px',
                cursor: 'pointer'
              }}>
                <span style={{ fontSize: '14px', color: '#1d1d1f' }}>In Stock</span>
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  style={{
                    width: '44px',
                    height: '24px',
                    appearance: 'none',
                    backgroundColor: inStock ? '#10b981' : '#e5e5e5',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                />
              </label>

              {/* New Badge Toggle */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#fafafa',
                borderRadius: '12px',
                cursor: 'pointer'
              }}>
                <span style={{ fontSize: '14px', color: '#1d1d1f' }}>Mark as New</span>
                <input
                  type="checkbox"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  style={{
                    width: '44px',
                    height: '24px',
                    appearance: 'none',
                    backgroundColor: isNew ? '#1d1d1f' : '#e5e5e5',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                />
              </label>

              {/* Bestseller Toggle */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#fafafa',
                borderRadius: '12px',
                cursor: 'pointer'
              }}>
                <span style={{ fontSize: '14px', color: '#1d1d1f' }}>Bestseller</span>
                <input
                  type="checkbox"
                  checked={isBestseller}
                  onChange={(e) => setIsBestseller(e.target.checked)}
                  style={{
                    width: '44px',
                    height: '24px',
                    appearance: 'none',
                    backgroundColor: isBestseller ? '#7c3aed' : '#e5e5e5',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                />
              </label>

              {/* Sale Toggle */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#fafafa',
                borderRadius: '12px',
                cursor: 'pointer'
              }}>
                <span style={{ fontSize: '14px', color: '#1d1d1f' }}>On Sale</span>
                <input
                  type="checkbox"
                  checked={isSale || !!originalPrice}
                  onChange={(e) => setIsSale(e.target.checked)}
                  style={{
                    width: '44px',
                    height: '24px',
                    appearance: 'none',
                    backgroundColor: (isSale || !!originalPrice) ? '#bf4800' : '#e5e5e5',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '16px',
                backgroundColor: '#1d1d1f',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              <Save style={{ width: '18px', height: '18px' }} />
              {isLoading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                color: '#1d1d1f',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              <ArrowLeft style={{ width: '18px', height: '18px' }} />
              Cancel
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="checkbox"]:checked::after {
          content: '';
          position: absolute;
          left: 2px;
          top: 2px;
          width: 20px;
          height: 20px;
          background-color: white;
          border-radius: 50%;
          transform: translateX(20px);
          transition: transform 0.2s;
        }
        input[type="checkbox"]::after {
          content: '';
          position: absolute;
          left: 2px;
          top: 2px;
          width: 20px;
          height: 20px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.2s;
        }
      `}</style>
    </form>
  );
}
