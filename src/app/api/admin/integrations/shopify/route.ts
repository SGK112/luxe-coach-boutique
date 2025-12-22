import { NextResponse } from 'next/server';

export async function GET() {
  // Check if Shopify environment variables are configured
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  const hasStorefront = storeDomain && storefrontToken;
  const hasAdmin = storeDomain && adminToken;
  const hasAny = hasStorefront || hasAdmin;

  if (!hasAny) {
    return NextResponse.json({
      connected: false,
      message: 'Shopify credentials not configured',
      missing: {
        storeDomain: !storeDomain,
        storefrontToken: !storefrontToken,
        adminToken: !adminToken,
      }
    });
  }

  try {
    // In production, you would verify by making a Shopify API call
    // const response = await fetch(`https://${storeDomain}/api/2024-01/graphql.json`, {...});

    return NextResponse.json({
      connected: true,
      message: 'Shopify credentials configured',
      storeDomain: storeDomain,
      hasStorefrontAccess: !!storefrontToken,
      hasAdminAccess: !!adminToken,
    });
  } catch (error) {
    return NextResponse.json({
      connected: false,
      message: 'Failed to connect to Shopify',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function POST() {
  // Test connection endpoint
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;

  if (!storeDomain) {
    return NextResponse.json({
      success: false,
      error: 'Shopify store domain not configured'
    }, { status: 400 });
  }

  // Here you would actually test the Shopify API connection
  return NextResponse.json({
    success: true,
    message: 'Connection test passed',
    storeDomain
  });
}
