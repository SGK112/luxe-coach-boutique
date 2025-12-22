import { NextRequest, NextResponse } from 'next/server';
import { parseCSV } from '@/lib/csv-parser';
import { bulkCreateProducts } from '@/lib/products-db';

// POST /api/admin/products/import - Import products from CSV
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Read file content
    const text = await file.text();

    // Parse CSV
    const { products, errors: parseErrors } = parseCSV(text);

    if (parseErrors.length > 0 && products.length === 0) {
      return NextResponse.json({
        success: false,
        imported: 0,
        errors: parseErrors,
        products: []
      });
    }

    // Create products
    const { created, errors: createErrors } = await bulkCreateProducts(products);

    // Combine all errors
    const allErrors = [
      ...parseErrors,
      ...createErrors.map(e => ({
        row: e.index + 2, // Account for header row
        field: 'create',
        message: e.error
      }))
    ];

    return NextResponse.json({
      success: created.length > 0,
      imported: created.length,
      errors: allErrors,
      products: created
    });
  } catch (error) {
    console.error('Error importing products:', error);
    return NextResponse.json(
      { error: 'Failed to import products' },
      { status: 500 }
    );
  }
}
