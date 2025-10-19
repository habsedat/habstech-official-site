/**
 * HABS TECHNOLOGIES GROUP
 * Image Optimization Utilities
 */

/**
 * Resize image to specified dimensions
 */
export function resizeImage(file, maxWidth = 1920, maxHeight = 1080, quality = 0.85) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions maintaining aspect ratio
      let { width, height } = calculateDimensions(
        img.width, 
        img.height, 
        maxWidth, 
        maxHeight
      );
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => resolve(blob),
        file.type,
        quality
      );
    };
    
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Calculate optimal dimensions maintaining aspect ratio
 */
function calculateDimensions(originalWidth, originalHeight, maxWidth, maxHeight) {
  let width = originalWidth;
  let height = originalHeight;
  
  // Scale down if too large
  if (width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }
  
  if (height > maxHeight) {
    width = (width * maxHeight) / height;
    height = maxHeight;
  }
  
  return { width: Math.round(width), height: Math.round(height) };
}

/**
 * Generate multiple image sizes for responsive use
 */
export async function generateImageSizes(file) {
  const sizes = [
    { name: 'thumbnail', width: 300, height: 200 },
    { name: 'medium', width: 800, height: 600 },
    { name: 'large', width: 1920, height: 1080 },
    { name: 'original', width: null, height: null }
  ];
  
  const results = {};
  
  for (const size of sizes) {
    if (size.name === 'original') {
      results[size.name] = file;
    } else {
      results[size.name] = await resizeImage(file, size.width, size.height);
    }
  }
  
  return results;
}

/**
 * Convert file to base64
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

/**
 * Get image dimensions
 */
export function getImageDimensions(file) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height
      });
    };
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Validate image file
 */
export function validateImageFile(file, options = {}) {
  const {
    maxSizeMB = 10,
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
    minWidth = 100,
    minHeight = 100,
    maxWidth = 5000,
    maxHeight = 5000
  } = options;
  
  const errors = [];
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
  }
  
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    errors.push(`File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum of ${maxSizeMB}MB`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Generate image metadata
 */
export async function generateImageMetadata(file) {
  const dimensions = await getImageDimensions(file);
  const validation = validateImageFile(file);
  
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    dimensions,
    validation,
    uploadedAt: new Date().toISOString()
  };
}

/**
 * Create image placeholder
 */
export function createImagePlaceholder(width, height, text = 'Image') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = width;
  canvas.height = height;
  
  // Background
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, width, height);
  
  // Border
  ctx.strokeStyle = '#d1d5db';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, width - 2, height - 2);
  
  // Text
  ctx.fillStyle = '#6b7280';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  return canvas.toDataURL();
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Generate unique filename with timestamp
 */
export function generateImageFilename(originalName, prefix = '') {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  const nameWithoutExt = originalName.replace(`.${extension}`, '').replace(/[^a-zA-Z0-9]/g, '-');
  
  const prefixPart = prefix ? `${prefix}-` : '';
  return `${prefixPart}${nameWithoutExt}-${timestamp}-${random}.${extension}`;
}




