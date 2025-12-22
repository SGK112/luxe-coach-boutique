import fs from 'fs/promises';
import path from 'path';
import { Product, Category, ProductColor } from '@/types';

const DATA_FILE = path.join(process.cwd(), 'src/data/products.json');

export interface ProductsDB {
  products: Product[];
  categories: Category[];
}

export interface ProductFilters {
  search?: string;
  category?: string;
  inStock?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  isBestseller?: boolean;
  sort?: 'name' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

// Read the entire database
export async function readProductsDB(): Promise<ProductsDB> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products database:', error);
    return { products: [], categories: [] };
  }
}

// Write the entire database
export async function writeProductsDB(data: ProductsDB): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Generate URL-friendly slug from name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Get all products with optional filtering and pagination
export async function getProducts(filters?: ProductFilters): Promise<PaginatedProducts> {
  const db = await readProductsDB();
  let products = [...db.products];

  // Apply search filter
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
    );
  }

  // Apply category filter
  if (filters?.category) {
    products = products.filter(p =>
      p.category.toLowerCase() === filters.category?.toLowerCase() ||
      p.category.toLowerCase().replace(/\s+/g, '-') === filters.category?.toLowerCase()
    );
  }

  // Apply stock filter
  if (filters?.inStock !== undefined) {
    products = products.filter(p => p.inStock === filters.inStock);
  }

  // Apply flag filters
  if (filters?.isNew) {
    products = products.filter(p => p.isNew);
  }
  if (filters?.isSale) {
    products = products.filter(p => p.isSale);
  }
  if (filters?.isBestseller) {
    products = products.filter(p => p.isBestseller);
  }

  // Apply sorting
  if (filters?.sort) {
    switch (filters.sort) {
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.sort((a, b) => {
          const dateA = (a as any).createdAt ? new Date((a as any).createdAt).getTime() : 0;
          const dateB = (b as any).createdAt ? new Date((b as any).createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  // Calculate pagination
  const total = products.length;
  const page = filters?.page || 1;
  const limit = filters?.limit || 20;
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  return {
    products: products.slice(offset, offset + limit),
    total,
    page,
    totalPages
  };
}

// Get all products without pagination (for store pages)
export async function getAllProducts(): Promise<Product[]> {
  const db = await readProductsDB();
  return db.products;
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const db = await readProductsDB();
  return db.products.find(p => p.id === id) || null;
}

// Get a single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = await readProductsDB();
  return db.products.find(p => p.slug === slug) || null;
}

// Create a new product
export async function createProduct(data: Omit<Product, 'id' | 'slug'>): Promise<Product> {
  const db = await readProductsDB();

  const product: Product = {
    ...data,
    id: generateId(),
    slug: generateSlug(data.name),
  };

  // Add timestamps
  (product as any).createdAt = new Date().toISOString();
  (product as any).updatedAt = new Date().toISOString();

  db.products.push(product);
  await writeProductsDB(db);

  return product;
}

// Update an existing product
export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
  const db = await readProductsDB();
  const index = db.products.findIndex(p => p.id === id);

  if (index === -1) {
    return null;
  }

  // Update slug if name changed
  if (data.name && data.name !== db.products[index].name) {
    data.slug = generateSlug(data.name);
  }

  db.products[index] = {
    ...db.products[index],
    ...data,
  };

  // Update timestamp
  (db.products[index] as any).updatedAt = new Date().toISOString();

  await writeProductsDB(db);

  return db.products[index];
}

// Delete a product
export async function deleteProduct(id: string): Promise<boolean> {
  const db = await readProductsDB();
  const index = db.products.findIndex(p => p.id === id);

  if (index === -1) {
    return false;
  }

  db.products.splice(index, 1);
  await writeProductsDB(db);

  return true;
}

// Bulk create products (for CSV import)
export async function bulkCreateProducts(products: Omit<Product, 'id' | 'slug'>[]): Promise<{ created: Product[]; errors: { index: number; error: string }[] }> {
  const db = await readProductsDB();
  const created: Product[] = [];
  const errors: { index: number; error: string }[] = [];

  for (let i = 0; i < products.length; i++) {
    try {
      const data = products[i];

      if (!data.name) {
        errors.push({ index: i, error: 'Name is required' });
        continue;
      }

      if (!data.price || data.price <= 0) {
        errors.push({ index: i, error: 'Valid price is required' });
        continue;
      }

      const product: Product = {
        ...data,
        id: generateId(),
        slug: generateSlug(data.name),
      };

      (product as any).createdAt = new Date().toISOString();
      (product as any).updatedAt = new Date().toISOString();

      db.products.push(product);
      created.push(product);
    } catch (error) {
      errors.push({ index: i, error: String(error) });
    }
  }

  if (created.length > 0) {
    await writeProductsDB(db);
  }

  return { created, errors };
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const db = await readProductsDB();
  return db.categories;
}

// Create a new category
export async function createCategory(data: Omit<Category, 'id' | 'slug'>): Promise<Category> {
  const db = await readProductsDB();

  const category: Category = {
    ...data,
    id: generateId(),
    slug: generateSlug(data.name),
  };

  db.categories.push(category);
  await writeProductsDB(db);

  return category;
}

// Update a category
export async function updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
  const db = await readProductsDB();
  const index = db.categories.findIndex(c => c.id === id);

  if (index === -1) {
    return null;
  }

  if (data.name && data.name !== db.categories[index].name) {
    data.slug = generateSlug(data.name);
  }

  db.categories[index] = {
    ...db.categories[index],
    ...data,
  };

  await writeProductsDB(db);

  return db.categories[index];
}

// Delete a category
export async function deleteCategory(id: string): Promise<boolean> {
  const db = await readProductsDB();
  const index = db.categories.findIndex(c => c.id === id);

  if (index === -1) {
    return false;
  }

  db.categories.splice(index, 1);
  await writeProductsDB(db);

  return true;
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const db = await readProductsDB();
  return db.products.filter(p =>
    p.category.toLowerCase() === category.toLowerCase() ||
    p.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
  );
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  const db = await readProductsDB();
  return db.products.filter(p => p.isBestseller || p.isNew).slice(0, 4);
}

// Get sale products
export async function getSaleProducts(): Promise<Product[]> {
  const db = await readProductsDB();
  return db.products.filter(p => p.isSale);
}
