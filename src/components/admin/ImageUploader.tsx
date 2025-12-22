'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, ImageIcon, GripVertical } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUploader({ images, onChange, maxImages = 5 }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const newImages = data.images.map((img: { url: string }) => img.url);
        onChange([...images, ...newImages].slice(0, maxImages));
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddUrl = () => {
    if (urlInput.trim() && images.length < maxImages) {
      onChange([...images, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    const newImages = [...images];
    const [removed] = newImages.splice(from, 1);
    newImages.splice(to, 0, removed);
    onChange(newImages);
  };

  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: '14px',
        fontWeight: 500,
        color: '#1d1d1f',
        marginBottom: '12px'
      }}>
        Product Images
      </label>

      {/* Image Grid */}
      {images.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '12px',
          marginBottom: '16px'
        }}>
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#f5f5f5',
                border: index === 0 ? '2px solid #1d1d1f' : '1px solid #e5e5e5'
              }}
            >
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="120px"
              />

              {/* Primary Badge */}
              {index === 0 && (
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  fontSize: '10px',
                  padding: '4px 8px',
                  backgroundColor: '#1d1d1f',
                  color: '#fff',
                  borderRadius: '6px',
                  fontWeight: 600
                }}>
                  PRIMARY
                </span>
              )}

              {/* Actions */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                display: 'flex',
                gap: '4px'
              }}>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, 0)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title="Make primary"
                  >
                    <GripVertical style={{ width: '14px', height: '14px', color: '#1d1d1f' }} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: '#dc2626',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X style={{ width: '14px', height: '14px', color: '#fff' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length < maxImages && (
        <>
          {/* Upload Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed #e5e5e5',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: '#fafafa',
              transition: 'all 0.2s'
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              {isUploading ? (
                <div style={{
                  width: '24px',
                  height: '24px',
                  border: '2px solid #e5e5e5',
                  borderTopColor: '#1d1d1f',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              ) : (
                <Upload style={{ width: '24px', height: '24px', color: '#86868b' }} />
              )}
            </div>

            <p style={{ fontSize: '14px', color: '#1d1d1f', fontWeight: 500, marginBottom: '4px' }}>
              {isUploading ? 'Uploading...' : 'Click to upload images'}
            </p>
            <p style={{ fontSize: '12px', color: '#86868b' }}>
              PNG, JPG up to 5MB ({maxImages - images.length} remaining)
            </p>
          </div>

          {/* Or add URL */}
          <div style={{ marginTop: '16px' }}>
            <p style={{
              fontSize: '12px',
              color: '#86868b',
              textAlign: 'center',
              marginBottom: '12px'
            }}>
              Or add image URL
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                style={{
                  flex: 1,
                  height: '44px',
                  padding: '0 14px',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={handleAddUrl}
                disabled={!urlInput.trim()}
                style={{
                  padding: '0 20px',
                  backgroundColor: '#1d1d1f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: urlInput.trim() ? 'pointer' : 'not-allowed',
                  opacity: urlInput.trim() ? 1 : 0.5
                }}
              >
                Add
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
