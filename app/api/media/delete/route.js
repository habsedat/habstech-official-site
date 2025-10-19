/**
 * HABS TECHNOLOGIES GROUP
 * Media Delete API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function DELETE(request) {
  try {
    const { path: filePath } = await request.json();

    if (!filePath) {
      return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
    }

    // Ensure the path is within the public/images directory for security
    if (!filePath.startsWith('/images/')) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    // Construct full file path
    const fullPath = join(process.cwd(), 'public', filePath);

    // Delete the file
    await unlink(fullPath);

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting file:', error);
    
    // If file doesn't exist, that's okay
    if (error.code === 'ENOENT') {
      return NextResponse.json({
        success: true,
        message: 'File was already deleted or does not exist'
      });
    }

    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}



