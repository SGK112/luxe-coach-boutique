import { Product, ProductColor } from '@/types';

export interface ParsedProduct {
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: ProductColor[];
  details: string[];
  material?: string;
  dimensions?: string;
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
  isBestseller: boolean;
  rating: number;
  reviewCount: number;
}

export interface ParseError {
  row: number;
  field: string;
  message: string;
}

export interface ParseResult {
  products: ParsedProduct[];
  errors: ParseError[];
}

// Parse CSV text into products
export function parseCSV(csvText: string): ParseResult {
  const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
  const products: ParsedProduct[] = [];
  const errors: ParseError[] = [];

  if (lines.length < 2) {
    errors.push({ row: 0, field: 'file', message: 'CSV must have header row and at least one data row' });
    return { products, errors };
  }

  // Parse header row
  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  const requiredFields = ['name', 'category', 'price'];

  // Check required headers
  for (const field of requiredFields) {
    if (!headers.includes(field)) {
      errors.push({ row: 0, field, message: `Missing required column: ${field}` });
    }
  }

  if (errors.length > 0) {
    return { products, errors };
  }

  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const rowNumber = i + 1;

    try {
      const product = parseRow(headers, values, rowNumber, errors);
      if (product) {
        products.push(product);
      }
    } catch (error) {
      errors.push({
        row: rowNumber,
        field: 'row',
        message: `Failed to parse row: ${String(error)}`
      });
    }
  }

  return { products, errors };
}

// Parse a single CSV line, handling quoted values
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

// Parse a row into a product
function parseRow(headers: string[], values: string[], rowNumber: number, errors: ParseError[]): ParsedProduct | null {
  const getValue = (field: string): string => {
    const index = headers.indexOf(field);
    return index >= 0 && index < values.length ? values[index].trim() : '';
  };

  // Required fields
  const name = getValue('name');
  const category = getValue('category');
  const priceStr = getValue('price');

  if (!name) {
    errors.push({ row: rowNumber, field: 'name', message: 'Name is required' });
    return null;
  }

  if (!category) {
    errors.push({ row: rowNumber, field: 'category', message: 'Category is required' });
    return null;
  }

  const price = parseFloat(priceStr);
  if (isNaN(price) || price <= 0) {
    errors.push({ row: rowNumber, field: 'price', message: 'Valid price is required' });
    return null;
  }

  // Optional fields
  const originalPriceStr = getValue('originalprice') || getValue('original_price');
  const originalPrice = originalPriceStr ? parseFloat(originalPriceStr) : undefined;

  // Parse images (comma or pipe separated)
  const imagesStr = getValue('images') || getValue('image');
  const images = imagesStr
    ? imagesStr.split(/[|,]/).map(img => img.trim()).filter(Boolean)
    : [];

  // Parse colors (pipe separated, format: "Name:#HEX" or just "Name")
  const colorsStr = getValue('colors') || getValue('color');
  const colors: ProductColor[] = colorsStr
    ? colorsStr.split('|').map(c => {
        const parts = c.trim().split(':');
        return {
          name: parts[0].trim(),
          hex: parts[1]?.trim() || '#000000'
        };
      }).filter(c => c.name)
    : [];

  // Parse details (pipe separated)
  const detailsStr = getValue('details') || getValue('detail');
  const details = detailsStr
    ? detailsStr.split('|').map(d => d.trim()).filter(Boolean)
    : [];

  // Parse booleans
  const parseBoolean = (value: string): boolean => {
    return value.toLowerCase() === 'true' || value === '1' || value.toLowerCase() === 'yes';
  };

  return {
    name,
    description: getValue('description') || '',
    category,
    price,
    originalPrice: originalPrice && !isNaN(originalPrice) ? originalPrice : undefined,
    images,
    colors,
    details,
    material: getValue('material') || undefined,
    dimensions: getValue('dimensions') || undefined,
    inStock: getValue('instock') !== '' ? parseBoolean(getValue('instock')) : true,
    isNew: parseBoolean(getValue('isnew') || getValue('is_new')),
    isSale: parseBoolean(getValue('issale') || getValue('is_sale')) || !!originalPrice,
    isBestseller: parseBoolean(getValue('isbestseller') || getValue('is_bestseller')),
    rating: 0,
    reviewCount: 0,
  };
}

// Generate CSV template
export function generateCSVTemplate(): string {
  const headers = [
    'name',
    'description',
    'category',
    'price',
    'originalPrice',
    'images',
    'colors',
    'details',
    'material',
    'dimensions',
    'inStock',
    'isNew',
    'isSale',
    'isBestseller'
  ];

  const exampleRow = [
    'Brooklyn Shoulder Bag',
    'Refined shoulder bag with signature hardware',
    'Shoulder Bags',
    '295',
    '',
    'https://example.com/image1.jpg|https://example.com/image2.jpg',
    'Black:#000000|Tan:#D2B48C|Burgundy:#722F37',
    'Polished pebble leather|Adjustable strap|Interior zip pocket',
    'Leather',
    '10" x 8" x 3"',
    'true',
    'false',
    'false',
    'false'
  ];

  return [
    headers.join(','),
    exampleRow.map(v => v.includes(',') || v.includes('|') ? `"${v}"` : v).join(',')
  ].join('\n');
}
