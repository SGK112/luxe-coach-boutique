'use client';

import { ProductColor } from '@/types';
import { Plus, X } from 'lucide-react';

interface ColorVariantManagerProps {
  colors: ProductColor[];
  onChange: (colors: ProductColor[]) => void;
}

export default function ColorVariantManager({ colors, onChange }: ColorVariantManagerProps) {
  const addColor = () => {
    onChange([...colors, { name: '', hex: '#000000' }]);
  };

  const updateColor = (index: number, field: 'name' | 'hex', value: string) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], [field]: value };
    onChange(newColors);
  };

  const removeColor = (index: number) => {
    onChange(colors.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <label style={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#1d1d1f'
        }}>
          Color Variants
        </label>
        <button
          type="button"
          onClick={addColor}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            backgroundColor: '#f5f5f5',
            color: '#1d1d1f',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          <Plus style={{ width: '14px', height: '14px' }} />
          Add Color
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {colors.length === 0 ? (
          <p style={{
            fontSize: '14px',
            color: '#86868b',
            textAlign: 'center',
            padding: '24px',
            backgroundColor: '#fafafa',
            borderRadius: '12px'
          }}>
            No colors added yet. Click "Add Color" to add variants.
          </p>
        ) : (
          colors.map((color, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                backgroundColor: '#fafafa',
                borderRadius: '12px'
              }}
            >
              {/* Color Preview */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: color.hex || '#000000',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  flexShrink: 0
                }}
              />

              {/* Color Name */}
              <input
                type="text"
                placeholder="Color name (e.g., Black)"
                value={color.name}
                onChange={(e) => updateColor(index, 'name', e.target.value)}
                style={{
                  flex: 1,
                  height: '40px',
                  padding: '0 14px',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />

              {/* Color Picker */}
              <div style={{ position: 'relative' }}>
                <input
                  type="color"
                  value={color.hex || '#000000'}
                  onChange={(e) => updateColor(index, 'hex', e.target.value)}
                  style={{
                    width: '40px',
                    height: '40px',
                    padding: 0,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>

              {/* Hex Input */}
              <input
                type="text"
                placeholder="#000000"
                value={color.hex}
                onChange={(e) => {
                  let value = e.target.value;
                  if (!value.startsWith('#')) value = '#' + value;
                  updateColor(index, 'hex', value);
                }}
                style={{
                  width: '90px',
                  height: '40px',
                  padding: '0 12px',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  outline: 'none',
                  textTransform: 'uppercase'
                }}
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeColor(index)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#fef2f2',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <X style={{ width: '16px', height: '16px', color: '#dc2626' }} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
