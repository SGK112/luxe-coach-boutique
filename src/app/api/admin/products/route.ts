import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct, getAllProducts } from '@/lib/products-db';

// GET /api/admin/products - Get all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      inStock: searchParams.get('inStock') === 'true' ? true : searchParams.get('inStock') === 'false' ? false : undefined,
      isNew: searchParams.get('isNew') === 'true' || undefined,
      isSale: searchParams.get('isSale') === 'true' || undefined,
      isBestseller: searchParams.get('isBestseller') === 'true' || undefined,
      sort: (searchParams.get('sort') as any) || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
    };

    // If no pagination requested, return all products
    if (searchParams.get('all') === 'true') {
      const products = await getAllProducts();
      return NextResponse.json({ products, total: products.length });
    }

    const result = await getProducts(filters);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/admin/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 }
      );
    }

    if (!body.price || body.price <= 0) {
      return NextResponse.json(
        { error: 'Valid price is required' },
        { status: 400 }
      );
    }

    if (!body.category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }

    // Set defaults for optional fields
    const productData = {
      name: body.name,
      price: parseFloat(body.price),
      originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : undefined,
      images: body.images || [],
      colors: body.colors || [],
      category: body.category,
      subcategory: body.subcategory || undefined,
      description: body.description || '',
      details: body.details || [],
      rating: body.rating || 0,
      reviewCount: body.reviewCount || 0,
      isNew: body.isNew || false,
      isBestseller: body.isBestseller || false,
      isSale: body.isSale || false,
      inStock: body.inStock !== false,
      material: body.material || undefined,
      dimensions: body.dimensions || undefined,
    };

    const product = await createProduct(productData);

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
