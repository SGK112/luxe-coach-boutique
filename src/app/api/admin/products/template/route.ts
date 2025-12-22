import { NextResponse } from 'next/server';
import { generateCSVTemplate } from '@/lib/csv-parser';

// GET /api/admin/products/template - Download CSV template
export async function GET() {
  const csvContent = generateCSVTemplate();

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="products-import-template.csv"',
    },
  });
}
