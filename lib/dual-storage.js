/**
 * HABS TECHNOLOGIES GROUP
 * Dual Storage Helper - Firebase Storage + Local Public Directory
 */

import { uploadOptimizedImage, uploadFile, deleteFile } from './storage';
import { addDocument, updateDocument, deleteDocument, getDocument, getDocuments, COLLECTIONS } from './firestore';
import { logAction } from './firestore';

/**
 * Upload media file (image or video) to both Firebase Storage and local public directory
 */
export async function uploadMediaDual(file, category = 'general', options = {}) {
  const isVideo = file.type.startsWith('video/');
  
  if (isVideo) {
    return await uploadVideoDual(file, category, options);
  } else {
    return await uploadImageDual(file, category, options);
  }
}

/**
 * Upload image to both Firebase Storage and local public directory
 */
export async function uploadImageDual(file, category = 'general', options = {}) {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.85,
    generateSizes = true,
    onProgress = null
  } = options;

  try {
    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop();
    const nameWithoutExt = file.name.replace(`.${extension}`, '');
    const filename = `${nameWithoutExt}-${timestamp}-${random}.${extension}`;
    
    // Upload to Firebase Storage
    const firebaseResult = await uploadOptimizedImage(file, `media/images`, {
      maxWidth,
      maxHeight,
      quality,
      generateSizes,
      onProgress
    });

    // Save to local public directory via API
    const publicPath = await saveToPublicDirectoryAPI(file, filename, category);

    // Create image metadata
    const imageData = {
      name: file.name,
      filename: filename,
      firebasePath: firebaseResult.original.path,
      firebaseUrl: firebaseResult.original.url,
      publicPath: publicPath,
      publicUrl: publicPath,
      size: firebaseResult.original.size,
      contentType: firebaseResult.original.contentType,
      dimensions: firebaseResult.metadata.dimensions,
      sizes: {
        thumbnail: firebaseResult.thumbnail?.url,
        medium: firebaseResult.medium?.url,
        large: firebaseResult.large?.url,
        original: firebaseResult.original.url
      },
      category: category,
      sectionId: null, // Will be set when assigned to a page section
      alt: '',
      description: '',
      tags: [],
      published: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save metadata to Firestore
    const docId = await addDocument(COLLECTIONS.MEDIA, imageData);
    
    // Log the action
    await logAction('image_uploaded_dual', {
      docId,
      filename: filename,
      originalName: file.name,
      originalSize: file.size,
      optimizedSize: firebaseResult.original.size,
      dimensions: firebaseResult.metadata.dimensions,
      category: category
    });

    return {
      id: docId,
      ...imageData
    };

  } catch (error) {
    console.error('Error uploading image to dual storage:', error);
    throw error;
  }
}

/**
 * Upload video to both Firebase Storage and local public directory
 */
export async function uploadVideoDual(file, category = 'general', options = {}) {
  const { onProgress = null } = options;

  try {
    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop();
    const nameWithoutExt = file.name.replace(`.${extension}`, '');
    const filename = `${nameWithoutExt}-${timestamp}-${random}.${extension}`;
    
    // Upload to Firebase Storage
    const firebaseResult = await uploadFile(file, `media/videos/${filename}`, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
        category: category,
        uploadedAt: new Date().toISOString()
      }
    }, onProgress);

    // Save to local public directory via API
    const publicPath = await saveToPublicDirectoryAPI(file, filename, category);

    // Generate video thumbnail and upload to Firebase Storage
    const thumbnailUrl = await generateAndUploadVideoThumbnail(file, filename);

    // Create video metadata
    const videoData = {
      name: file.name,
      filename: filename,
      firebasePath: firebaseResult.path,
      firebaseUrl: firebaseResult.url,
      publicPath: publicPath || firebaseResult.url, // Use Firebase URL if publicPath is null
      publicUrl: publicPath || firebaseResult.url, // Use Firebase URL if publicPath is null
      size: firebaseResult.size,
      contentType: firebaseResult.contentType,
      type: 'video',
      thumbnail: thumbnailUrl,
      category: category,
      sectionId: null,
      alt: '',
      description: '',
      tags: [],
      published: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save metadata to Firestore
    const docId = await addDocument(COLLECTIONS.MEDIA, videoData);
    
    // Log the action
    await logAction('video_uploaded_dual', {
      docId,
      filename: filename,
      originalName: file.name,
      originalSize: file.size,
      category: category
    });

    return {
      id: docId,
      ...videoData
    };

  } catch (error) {
    console.error('Error uploading video to dual storage:', error);
    throw error;
  }
}

/**
 * Generate thumbnail from video file and upload to Firebase Storage
 */
async function generateAndUploadVideoThumbnail(videoFile, videoFilename) {
  try {
    // Generate thumbnail blob
    const thumbnailBlob = await generateVideoThumbnailBlob(videoFile);
    
    if (!thumbnailBlob) {
      // Return default video icon if thumbnail generation fails
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik0xMjAgODBMMjAwIDEyMEwxMjAgMTYwVjgwWiIgZmlsbD0iIzljYTNiOCIvPgo8L3N2Zz4K';
    }
    
    // Create thumbnail filename
    const thumbnailFilename = videoFilename.replace(/\.[^/.]+$/, '_thumb.jpg');
    
    // Upload thumbnail to Firebase Storage
    const thumbnailResult = await uploadFile(thumbnailBlob, `media/thumbnails/${thumbnailFilename}`, {
      contentType: 'image/jpeg',
      customMetadata: {
        originalVideo: videoFilename,
        generatedAt: new Date().toISOString()
      }
    });
    
    return thumbnailResult.url;
  } catch (error) {
    console.error('Error generating and uploading video thumbnail:', error);
    // Return default video icon on error
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik0xMjAgODBMMjAwIDEyMEwxMjAgMTYwVjgwWiIgZmlsbD0iIzljYTNiOCIvPgo8L3N2Zz4K';
  }
}

/**
 * Generate thumbnail blob from video file
 */
async function generateVideoThumbnailBlob(videoFile) {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    video.addEventListener('loadedmetadata', () => {
      // Set canvas dimensions
      canvas.width = 320;
      canvas.height = 180;
      
      // Seek to 10% of video duration for thumbnail
      video.currentTime = video.duration * 0.1;
    });
    
    video.addEventListener('seeked', () => {
      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.8);
    });
    
    video.addEventListener('error', () => {
      resolve(null);
    });
    
    // Load video file
    video.src = URL.createObjectURL(videoFile);
    video.load();
  });
}

/**
 * Save file to local public directory via API
 */
async function saveToPublicDirectoryAPI(file, filename, category) {
  try {
    // For static export, we can't use API routes
    // Instead, we'll just return null and rely on Firebase Storage
    console.log('✅ Static export mode: Skipping local public directory upload - using Firebase Storage only');
    return null;
  } catch (error) {
    console.error('❌ Error saving to public directory via API:', error);
    // Fallback to Firebase URL if API fails
    return null;
  }
}

/**
 * Delete image from both Firebase Storage and local public directory
 */
export async function deleteImageDual(imageId, imageData) {
  try {
    // Delete from Firebase Storage
    if (imageData.firebasePath) {
      await deleteFile(imageData.firebasePath);
    }

    // Delete from local public directory via API (skip in static export mode)
    if (imageData.publicPath && imageData.publicPath.startsWith('/images/')) {
      try {
        // For static export, we can't use API routes
        console.log('✅ Static export mode: Skipping local public directory deletion - using Firebase Storage only');
      } catch (error) {
        console.error('❌ Error deleting from public directory:', error);
      }
    }

    // Delete from Firestore
    await deleteDocument(COLLECTIONS.MEDIA, imageId);
    
    // Log the action
    await logAction('image_deleted_dual', {
      imageId,
      firebasePath: imageData.firebasePath,
      publicPath: imageData.publicPath
    });

    return true;
  } catch (error) {
    console.error('Error deleting image from dual storage:', error);
    throw error;
  }
}

/**
 * Get image URL - prioritize local, fallback to Firebase
 */
export function getImageUrl(imageData, size = 'original') {
  // Try local public URL first
  if (imageData.publicUrl && imageData.publicUrl.startsWith('/images/')) {
    return imageData.publicUrl;
  }
  
  // Fallback to Firebase URL
  if (size !== 'original' && imageData.sizes && imageData.sizes[size]) {
    return imageData.sizes[size];
  }
  
  return imageData.firebaseUrl || imageData.url;
}

/**
 * Update page section with image
 */
export async function updatePageSection(page, sectionId, imageId) {
  try {
    // Get existing page content
    const pages = await getDocuments(COLLECTIONS.PAGES, {
      where: ['page', '==', page]
    });

    let pageData;
    if (pages.length === 0) {
      // Create new page document
      pageData = {
        page: page,
        sections: {},
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const docId = await addDocument(COLLECTIONS.PAGES, pageData);
      pageData.id = docId;
    } else {
      pageData = pages[0];
    }

    // Update section with image ID
    const updatedSections = {
      ...pageData.sections,
      [sectionId]: imageId
    };

    await updateDocument(COLLECTIONS.PAGES, pageData.id, {
      sections: updatedSections,
      updatedAt: new Date()
    });

    // Also update the image's sectionId field for direct lookup
    await updateDocument(COLLECTIONS.MEDIA, imageId, {
      sectionId: sectionId,
      updatedAt: new Date()
    });

    // Log the action
    await logAction('page_section_updated', {
      page: page,
      sectionId: sectionId,
      imageId: imageId
    });

    return true;
  } catch (error) {
    console.error('Error updating page section:', error);
    throw error;
  }
}

/**
 * Get page sections with images
 */
export async function getPageSections(page) {
  try {
    const pages = await getDocuments(COLLECTIONS.PAGES, {
      where: ['page', '==', page]
    });

    if (pages.length === 0) {
      return {};
    }

    const pageData = pages[0];
    const sections = {};

    // Load image data for each section
    for (const [sectionId, imageId] of Object.entries(pageData.sections || {})) {
      if (imageId) {
        const imageData = await getDocument(COLLECTIONS.MEDIA, imageId);
        if (imageData) {
          sections[sectionId] = imageData;
        }
      }
    }

    return sections;
  } catch (error) {
    console.error('Error getting page sections:', error);
    return {};
  }
}
