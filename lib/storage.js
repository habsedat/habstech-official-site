/**
 * HABS TECHNOLOGIES GROUP
 * Firebase Storage Helper Functions
 */

import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { storage } from './firebase';
import { resizeImage, generateImageSizes, generateImageMetadata, generateImageFilename } from './image-utils';

/**
 * Storage paths
 */
export const STORAGE_PATHS = {
  PUBLIC: 'public',
  MEDIA: 'media',
  APPLICATIONS: 'uploads/applications',
  SYSTEM: 'system',
};

/**
 * Upload a file to Firebase Storage with progress tracking
 */
export async function uploadFile(file, path, metadata = {}, onProgress = null) {
  try {
    const storageRef = ref(storage, path);
    
    if (onProgress) {
      // Use resumable upload for progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          },
          (error) => {
            console.error('Upload error:', error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve({
                path: uploadTask.snapshot.ref.fullPath,
                url: downloadURL,
                size: uploadTask.snapshot.metadata.size,
                contentType: uploadTask.snapshot.metadata.contentType,
              });
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    } else {
      // Use regular upload for no progress tracking
      const snapshot = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return {
        path: snapshot.ref.fullPath,
        url: downloadURL,
        size: snapshot.metadata.size,
        contentType: snapshot.metadata.contentType,
      };
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

/**
 * Upload an image with optimization and multiple sizes
 */
export async function uploadOptimizedImage(file, basePath, options = {}) {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.85,
    generateSizes = true,
    onProgress = null
  } = options;

  try {
    // Generate metadata
    const metadata = await generateImageMetadata(file);
    
    // Generate unique filename
    const filename = generateImageFilename(file.name);
    const optimizedFile = await resizeImage(file, maxWidth, maxHeight, quality);
    
    // Upload optimized version with progress tracking
    const optimizedPath = `${basePath}/${filename}`;
    const optimizedResult = await uploadFile(optimizedFile, optimizedPath, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
        originalSize: file.size.toString(),
        optimizedSize: optimizedFile.size.toString(),
        dimensions: `${metadata.dimensions.width}x${metadata.dimensions.height}`,
        uploadedAt: new Date().toISOString()
      }
    }, onProgress);

    const results = {
      original: {
        path: optimizedResult.path,
        url: optimizedResult.url,
        size: optimizedResult.size,
        contentType: optimizedResult.contentType,
        filename
      }
    };

    // Generate additional sizes if requested
    if (generateSizes) {
      const sizes = await generateImageSizes(optimizedFile);
      
      for (const [sizeName, sizeFile] of Object.entries(sizes)) {
        if (sizeName !== 'original') {
          const sizePath = `${basePath}/${sizeName}/${filename}`;
          const sizeResult = await uploadFile(sizeFile, sizePath, {
            contentType: file.type,
            customMetadata: {
              originalName: file.name,
              size: sizeName,
              uploadedAt: new Date().toISOString()
            }
          });
          
          results[sizeName] = {
            path: sizeResult.path,
            url: sizeResult.url,
            size: sizeResult.size,
            contentType: sizeResult.contentType
          };
        }
      }
    }

    return {
      ...results,
      metadata
    };
  } catch (error) {
    console.error('Error uploading optimized image:', error);
    throw error;
  }
}

/**
 * Upload a base64 string as image
 */
export async function uploadBase64(base64String, path, metadata = {}) {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadString(storageRef, base64String, 'base64', metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      path: snapshot.ref.fullPath,
      url: downloadURL,
      size: snapshot.metadata.size,
      contentType: snapshot.metadata.contentType,
    };
  } catch (error) {
    console.error('Error uploading base64:', error);
    throw error;
  }
}

/**
 * Get download URL for a file
 */
export async function getFileURL(path) {
  try {
    const storageRef = ref(storage, path);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
}

/**
 * Delete a file from storage
 */
export async function deleteFile(path) {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

/**
 * List all files in a directory
 */
export async function listFiles(path) {
  try {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);
    
    const files = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          path: itemRef.fullPath,
          url,
        };
      })
    );
    
    return files;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
}

/**
 * Generate unique filename
 */
export function generateUniqueFilename(originalName) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  const nameWithoutExt = originalName.replace(`.${extension}`, '');
  
  return `${nameWithoutExt}-${timestamp}-${random}.${extension}`;
}

/**
 * Validate file type
 */
export function validateFileType(file, allowedTypes = []) {
  if (allowedTypes.length === 0) return true;
  return allowedTypes.includes(file.type);
}

/**
 * Validate file size
 */
export function validateFileSize(file, maxSizeMB = 10) {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}


