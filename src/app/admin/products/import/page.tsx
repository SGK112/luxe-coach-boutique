'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminContentWrapper from '@/components/admin/AdminContentWrapper';
import { Upload, Download, FileText, Check, AlertCircle, ArrowRight, X } from 'lucide-react';

interface ParseError {
  row: number;
  field: string;
  message: string;
}

export default function ImportProductsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    imported: number;
    errors: ParseError[];
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/products/import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error uploading:', error);
      setResult({
        success: false,
        imported: 0,
        errors: [{ row: 0, field: 'file', message: 'Failed to upload file' }]
      });
    } finally {
      setIsUploading(false);
    }
  };

  const downloadTemplate = () => {
    window.open('/api/admin/products/template', '_blank');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <AdminSidebar />

      <AdminContentWrapper>
        <AdminHeader />

        <main style={{ padding: '20px 16px', maxWidth: '800px' }} className="admin-main">
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
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(139, 92, 246, 0.25)'
            }}>
              <Upload style={{ width: '28px', height: '28px', color: '#fff' }} />
            </div>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '32px',
                fontWeight: 400,
                color: '#1d1d1f',
                marginBottom: '4px'
              }}>
                Import Products
              </h1>
              <p style={{ fontSize: '14px', color: '#6e6e73' }}>
                Bulk import products from a CSV file
              </p>
            </div>
          </div>

          {/* Step 1: Download Template */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#1d1d1f',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 600
              }}>
                1
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1d1d1f' }}>
                Download Template
              </h2>
            </div>

            <p style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '20px', lineHeight: 1.6 }}>
              Start by downloading our CSV template. Fill in your product information following the column format.
            </p>

            <button
              onClick={downloadTemplate}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                backgroundColor: '#f5f5f5',
                color: '#1d1d1f',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              <Download style={{ width: '18px', height: '18px' }} />
              Download CSV Template
            </button>

            <div style={{
              marginTop: '24px',
              padding: '20px',
              backgroundColor: '#fafafa',
              borderRadius: '12px'
            }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', marginBottom: '12px' }}>
                Column Format Guide:
              </p>
              <ul style={{ fontSize: '13px', color: '#6e6e73', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
                <li><strong>name</strong>, <strong>category</strong>, <strong>price</strong> - Required fields</li>
                <li><strong>images</strong> - Pipe-separated URLs: <code>url1|url2|url3</code></li>
                <li><strong>colors</strong> - Pipe-separated: <code>Black:#000000|Tan:#D2B48C</code></li>
                <li><strong>details</strong> - Pipe-separated: <code>Detail 1|Detail 2</code></li>
                <li><strong>inStock, isNew, isSale, isBestseller</strong> - Use <code>true</code> or <code>false</code></li>
              </ul>
            </div>
          </div>

          {/* Step 2: Upload File */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#1d1d1f',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 600
              }}>
                2
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1d1d1f' }}>
                Upload Your CSV
              </h2>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed #e5e5e5',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: file ? '#f0fdf4' : '#fafafa',
                borderColor: file ? '#86efac' : '#e5e5e5',
                transition: 'all 0.2s'
              }}
            >
              {file ? (
                <>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}>
                    <FileText style={{ width: '24px', height: '24px', color: '#fff' }} />
                  </div>
                  <p style={{ fontSize: '15px', fontWeight: 500, color: '#1d1d1f', marginBottom: '4px' }}>
                    {file.name}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6e6e73' }}>
                    {(file.size / 1024).toFixed(1)} KB - Click to change
                  </p>
                </>
              ) : (
                <>
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
                    <Upload style={{ width: '24px', height: '24px', color: '#86868b' }} />
                  </div>
                  <p style={{ fontSize: '15px', fontWeight: 500, color: '#1d1d1f', marginBottom: '4px' }}>
                    Click to select CSV file
                  </p>
                  <p style={{ fontSize: '13px', color: '#86868b' }}>
                    or drag and drop
                  </p>
                </>
              )}
            </div>

            {file && !result && (
              <button
                onClick={handleUpload}
                disabled={isUploading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  marginTop: '20px',
                  padding: '16px',
                  backgroundColor: '#1d1d1f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: isUploading ? 'not-allowed' : 'pointer',
                  opacity: isUploading ? 0.7 : 1
                }}
              >
                {isUploading ? (
                  <>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Importing...
                  </>
                ) : (
                  <>
                    Import Products
                    <ArrowRight style={{ width: '18px', height: '18px' }} />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Step 3: Results */}
          {result && (
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: result.success ? '#10b981' : '#dc2626',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {result.success ? (
                    <Check style={{ width: '18px', height: '18px' }} />
                  ) : (
                    <X style={{ width: '18px', height: '18px' }} />
                  )}
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1d1d1f' }}>
                  {result.success ? 'Import Complete' : 'Import Failed'}
                </h2>
              </div>

              {result.imported > 0 && (
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '12px',
                  marginBottom: '20px'
                }}>
                  <p style={{ fontSize: '15px', color: '#065f46', fontWeight: 500 }}>
                    Successfully imported {result.imported} product{result.imported !== 1 ? 's' : ''}
                  </p>
                </div>
              )}

              {result.errors.length > 0 && (
                <div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#dc2626',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <AlertCircle style={{ width: '16px', height: '16px' }} />
                    {result.errors.length} Error{result.errors.length !== 1 ? 's' : ''}
                  </p>
                  <div style={{
                    backgroundColor: '#fef2f2',
                    borderRadius: '12px',
                    padding: '16px',
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}>
                    {result.errors.map((error, index) => (
                      <p
                        key={index}
                        style={{
                          fontSize: '13px',
                          color: '#991b1b',
                          marginBottom: index < result.errors.length - 1 ? '8px' : 0
                        }}
                      >
                        Row {error.row}: {error.message} ({error.field})
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '24px'
              }}>
                <button
                  onClick={() => {
                    setFile(null);
                    setResult(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#f5f5f5',
                    color: '#1d1d1f',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  Import More
                </button>
                <button
                  onClick={() => router.push('/admin/products')}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#1d1d1f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  View Products
                </button>
              </div>
            </div>
          )}
        </main>
      </AdminContentWrapper>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (min-width: 768px) {
          .admin-main {
            padding: 32px 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
