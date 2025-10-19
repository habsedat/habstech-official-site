/**
 * HABS TECHNOLOGIES GROUP
 * Media Upload API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const category = formData.get('category') || 'general';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Create directory if it doesn't exist
    const publicDir = join(process.cwd(), 'public', 'images', category);
    await mkdir(publicDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop();
    const nameWithoutExt = file.name.replace(`.${extension}`, '');
    const filename = `${nameWithoutExt}-${timestamp}-${random}.${extension}`;

    // Save file to public directory
    const filePath = join(publicDir, filename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/images/${category}/${filename}`;

    return NextResponse.json({
      success: true,
      filename,
      publicUrl,
      category
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}



