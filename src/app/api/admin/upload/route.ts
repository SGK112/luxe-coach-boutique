import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, deleteImage, isCloudinaryConfigured } from '@/lib/cloudinary';

// POST /api/admin/upload - Upload images
export async function POST(request: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!isCloudinaryConfigured()) {
      // Return a fallback response - images can be added via URL instead
      return NextResponse.json(
        {
          error: 'Cloudinary not configured. Please add images via URL instead.',
          configured: false
        },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    const uploadResults = [];

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        continue;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        continue;
      }

      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;

      // Upload to Cloudinary
      const result = await uploadImage(buffer, filename);
      uploadResults.push(result);
    }

    return NextResponse.json({
      success: true,
      images: uploadResults,
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/upload - Delete an image
export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteImage(publicId);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete image' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
