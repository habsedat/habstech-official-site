/**
 * HABS TECHNOLOGIES GROUP
 * Firebase Storage Helper Functions
 */

import {
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { storage } from './firebase';

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
 * Upload a file to Firebase Storage
 */
export async function uploadFile(file, path, metadata = {}) {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      path: snapshot.ref.fullPath,
      url: downloadURL,
      size: snapshot.metadata.size,
      contentType: snapshot.metadata.contentType,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
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


