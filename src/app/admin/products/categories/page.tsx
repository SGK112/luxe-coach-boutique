'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { Category } from '@/types';
import { FolderOpen, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState('');
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newName.trim()) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, image: newImage }),
      });

      if (response.ok) {
        const data = await response.json();
        setCategories([...categories, data.category]);
        setNewName('');
        setNewImage('');
        setIsAdding(false);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = async (id: string) => {
    if (!editName.trim()) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editName, image: editImage }),
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(categories.map(c => c.id === id ? data.category : c));
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error updating category:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteCategory) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/categories?id=${deleteCategory.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories(categories.filter(c => c.id !== deleteCategory.id));
        setDeleteCategory(null);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditImage(category.image || '');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <AdminSidebar />

      <div style={{ flex: 1, marginLeft: '260px' }}>
        <AdminHeader />

        <main style={{ padding: '32px 40px', maxWidth: '800px' }}>
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
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.25)'
              }}>
                <FolderOpen style={{ width: '28px', height: '28px', color: '#fff' }} />
              </div>
              <div>
                <h1 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '32px',
                  fontWeight: 400,
                  color: '#1d1d1f',
                  marginBottom: '4px'
                }}>
                  Categories
                </h1>
                <p style={{ fontSize: '14px', color: '#6e6e73' }}>
                  Manage product categories
                </p>
              </div>
            </div>

            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
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
                  cursor: 'pointer'
                }}
              >
                <Plus style={{ width: '18px', height: '18px' }} />
                Add Category
              </button>
            )}
          </div>

          {/* Add New Category Form */}
          {isAdding && (
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#1d1d1f',
                marginBottom: '20px'
              }}>
                New Category
              </h3>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Category name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{
                    flex: 1,
                    height: '48px',
                    padding: '0 16px',
                    backgroundColor: '#fafafa',
                    border: '1px solid #e5e5e5',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <input
                  type="url"
                  placeholder="Image URL (optional)"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  style={{
                    flex: 1,
                    height: '48px',
                    padding: '0 16px',
                    backgroundColor: '#fafafa',
                    border: '1px solid #e5e5e5',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleAdd}
                  disabled={!newName.trim() || isSaving}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    backgroundColor: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: !newName.trim() || isSaving ? 'not-allowed' : 'pointer',
                    opacity: !newName.trim() || isSaving ? 0.5 : 1
                  }}
                >
                  <Save style={{ width: '16px', height: '16px' }} />
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setNewName('');
                    setNewImage('');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    backgroundColor: '#f5f5f5',
                    color: '#1d1d1f',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  <X style={{ width: '16px', height: '16px' }} />
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Categories List */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            overflow: 'hidden'
          }}>
            {isLoading ? (
              <div style={{
                padding: '60px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid #f0f0f0',
                  borderTopColor: '#1d1d1f',
                  borderRadius: '50%',
                  margin: '0 auto',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
            ) : categories.length === 0 ? (
              <div style={{
                padding: '60px',
                textAlign: 'center'
              }}>
                <FolderOpen style={{
                  width: '48px',
                  height: '48px',
                  color: '#c7c7cc',
                  margin: '0 auto 16px'
                }} />
                <p style={{ fontSize: '16px', color: '#1d1d1f', fontWeight: 500, marginBottom: '8px' }}>
                  No categories yet
                </p>
                <p style={{ fontSize: '14px', color: '#86868b' }}>
                  Create your first category to organize products
                </p>
              </div>
            ) : (
              categories.map((category, index) => (
                <div
                  key={category.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px 24px',
                    borderBottom: index < categories.length - 1 ? '1px solid #f5f5f5' : 'none'
                  }}
                >
                  {/* Category Image */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                    position: 'relative',
                    flexShrink: 0
                  }}>
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
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
                        <FolderOpen style={{ width: '24px', height: '24px', color: '#c7c7cc' }} />
                      </div>
                    )}
                  </div>

                  {/* Category Info / Edit Form */}
                  {editingId === category.id ? (
                    <div style={{ flex: 1, display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={{
                          flex: 1,
                          height: '44px',
                          padding: '0 14px',
                          backgroundColor: '#fafafa',
                          border: '1px solid #e5e5e5',
                          borderRadius: '10px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                      <input
                        type="url"
                        value={editImage}
                        onChange={(e) => setEditImage(e.target.value)}
                        placeholder="Image URL"
                        style={{
                          flex: 1,
                          height: '44px',
                          padding: '0 14px',
                          backgroundColor: '#fafafa',
                          border: '1px solid #e5e5e5',
                          borderRadius: '10px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                      <button
                        onClick={() => handleEdit(category.id)}
                        disabled={isSaving}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: '#10b981',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <Save style={{ width: '18px', height: '18px', color: '#fff' }} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: '#f5f5f5',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <X style={{ width: '18px', height: '18px', color: '#6e6e73' }} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '15px',
                          fontWeight: 500,
                          color: '#1d1d1f',
                          marginBottom: '4px'
                        }}>
                          {category.name}
                        </p>
                        <p style={{ fontSize: '13px', color: '#86868b' }}>
                          {category.slug}
                        </p>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => startEdit(category)}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            backgroundColor: '#f5f5f5',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Edit2 style={{ width: '16px', height: '16px', color: '#6e6e73' }} />
                        </button>
                        <button
                          onClick={() => setDeleteCategory(category)}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            backgroundColor: '#fef2f2',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 style={{ width: '16px', height: '16px', color: '#dc2626' }} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteCategory}
        onClose={() => setDeleteCategory(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteCategory?.name}"? Products in this category will not be deleted.`}
        isLoading={isDeleting}
      />

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
