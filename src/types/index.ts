export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: ProductColor[];
  category: string;
  subcategory?: string;
  description: string;
  details: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isSale?: boolean;
  inStock: boolean;
  material?: string;
  dimensions?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}
