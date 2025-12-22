import { NextResponse } from 'next/server';

interface PlatformStatus {
  connected: boolean;
  accountName?: string;
}

export async function GET() {
  // Check which social platforms have credentials configured
  const platforms: Record<string, PlatformStatus> = {
    instagram: {
      connected: !!(process.env.INSTAGRAM_ACCESS_TOKEN && process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID),
    },
    facebook: {
      connected: !!(process.env.FACEBOOK_PAGE_ID && process.env.FACEBOOK_ACCESS_TOKEN),
    },
    twitter: {
      connected: !!(
        process.env.TWITTER_API_KEY &&
        process.env.TWITTER_API_SECRET &&
        process.env.TWITTER_ACCESS_TOKEN
      ),
    },
    tiktok: {
      connected: !!(process.env.TIKTOK_ACCESS_TOKEN && process.env.TIKTOK_OPEN_ID),
    },
    pinterest: {
      connected: !!(process.env.PINTEREST_ACCESS_TOKEN),
    },
  };

  const connectedCount = Object.values(platforms).filter(p => p.connected).length;

  return NextResponse.json({
    platforms,
    connectedCount,
    totalPlatforms: Object.keys(platforms).length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { platform } = body;

    if (!platform) {
      return NextResponse.json({
        success: false,
        error: 'Platform not specified'
      }, { status: 400 });
    }

    // Here you would test the specific platform's API
    // For now, just return based on env var existence
    const platformChecks: Record<string, boolean> = {
      instagram: !!(process.env.INSTAGRAM_ACCESS_TOKEN),
      facebook: !!(process.env.FACEBOOK_ACCESS_TOKEN),
      twitter: !!(process.env.TWITTER_API_KEY),
      tiktok: !!(process.env.TIKTOK_ACCESS_TOKEN),
      pinterest: !!(process.env.PINTEREST_ACCESS_TOKEN),
    };

    const isConnected = platformChecks[platform] || false;

    return NextResponse.json({
      success: true,
      platform,
      connected: isConnected,
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Invalid request'
    }, { status: 400 });
  }
}
