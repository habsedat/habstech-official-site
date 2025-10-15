/**
 * HABS TECHNOLOGIES GROUP
 * File Upload API Route
 */

import { NextResponse } from 'next/server';
import { uploadFile, generateUniqueFilename, validateFileType, validateFileSize } from '@/lib/storage';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_SIZE_MB = 10;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'media';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!validateFileType(file, ALLOWED_TYPES)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Validate file size
    if (!validateFileSize(file, MAX_SIZE_MB)) {
      return NextResponse.json(
        { error: `File size must be less than ${MAX_SIZE_MB}MB` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(file.name);
    const filePath = `${folder}/${uniqueFilename}`;

    // Upload to Firebase Storage
    const result = await uploadFile(file, filePath, {
      contentType: file.type,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'File uploaded successfully',
        file: result 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}





