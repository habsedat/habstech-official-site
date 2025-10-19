/**
 * HABS TECHNOLOGIES GROUP
 * Media Manager Component
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { uploadMediaDual, deleteImageDual, getImageUrl, updatePageSection } from '@/lib/dual-storage';
import { updateDocument, getDocuments, COLLECTIONS } from '@/lib/firestore';
import { validateFileType, validateFileSize } from '@/lib/storage';
import ImageUsageGuide from './image-usage-guide';
import VideoPlayer from './video-player';
import './media-manager.css';

const IMAGE_CATEGORIES = {
  'hero': 'Hero Images',
  'team': 'Team Photos',
  'office': 'Office/Workspace',
  'services': 'Services',
  'divisions': 'Divisions',
  'case-studies': 'Case Studies',
  'clients': 'Client Photos',
  'leadership': 'Leadership',
  'contact': 'Contact Page',
  'application': 'Application Page',
  'general': 'General'
};

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp',
  'image/gif'
];

const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/avi',
  'video/mov',
  'video/wmv',
  'video/flv',
  'video/mkv',
  'video/3gp',
  'video/quicktime'
];

const ALLOWED_MEDIA_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

const MAX_FILE_SIZE_MB = 0; // NO LIMIT for videos - accept any size

export default function MediaManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [showUsageGuide, setShowUsageGuide] = useState(false);
  const fileInputRef = useRef(null);

  // Load images on component mount
  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    try {
      const imageData = await getDocuments(COLLECTIONS.MEDIA, {
        orderBy: ['createdAt', 'desc']
      });
      console.log('📸 Loaded images:', imageData);
      setImages(imageData);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      if (!validateFileType(file, ALLOWED_MEDIA_TYPES)) {
        alert(`File ${file.name} is not a valid media type. Please upload images (JPEG, PNG, WebP, GIF) or videos (MP4, WebM, AVI, MOV, etc.).`);
        return false;
      }
      // Skip size validation for videos (no limits)
      if (MAX_FILE_SIZE_MB > 0 && !validateFileSize(file, MAX_FILE_SIZE_MB)) {
        alert(`File ${file.name} is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setShowUploadModal(true);
    setUploading(true);

    for (const file of validFiles) {
      try {
        await uploadSingleFile(file);
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        alert(`Failed to upload ${file.name}. Please try again.`);
      }
    }

    setUploading(false);
    setShowUploadModal(false);
    setUploadProgress({});
    loadImages();
  };

  const uploadSingleFile = async (file) => {
    setUploadProgress(prev => ({
      ...prev,
      [file.name]: 0
    }));

    try {
      // Upload to both Firebase Storage and local public directory
      const imageData = await uploadMediaDual(file, selectedCategory, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.85,
        generateSizes: true,
        onProgress: (progress) => {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: Math.round(progress)
          }));
        }
      });

      setUploadProgress(prev => ({
        ...prev,
        [file.name]: 100
      }));

    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const deleteImage = async (imageId, imageData) => {
    if (!confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete from both Firebase Storage and local public directory
      await deleteImageDual(imageId, imageData);
      loadImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image. Please try again.');
    }
  };

  const updateImageMetadata = async (imageId, updates) => {
    try {
      await updateDocument(COLLECTIONS.MEDIA, imageId, {
        ...updates,
        updatedAt: new Date()
      });
      
      await logAction('image_updated', {
        imageId,
        updates
      });

      loadImages();
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Failed to update image. Please try again.');
    }
  };

  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.alt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const copyImageUrl = (imageData) => {
    const url = getImageUrl(imageData);
    navigator.clipboard.writeText(url);
    alert('Image URL copied to clipboard!');
  };


  return (
    <div className="media-manager">
      {/* Upload Area */}
      <div 
        className={`media-upload ${dragActive ? 'media-upload--active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="media-upload__content">
          <div className="media-upload__icon">📁</div>
          <h3 className="media-upload__title">Drop media files here or click to browse</h3>
          <p className="media-upload__subtitle">
            Supports images (JPEG, PNG, WebP, GIF) and videos (MP4, WebM, AVI, MOV, etc.) - NO SIZE LIMITS
          </p>
          <button 
            className="button button--primary"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* Filters and Search */}
      <div className="media-filters">
        <div className="media-filters__left">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="media-filters__select"
          >
            <option value="all">All Categories</option>
            {Object.entries(IMAGE_CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <button 
            className="button button--secondary"
            onClick={() => setShowUsageGuide(!showUsageGuide)}
          >
            {showUsageGuide ? 'Hide' : 'Show'} Usage Guide
          </button>
        </div>
        
        <div className="media-filters__right">
          <input
            type="text"
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="media-filters__search"
          />
        </div>
      </div>

      {/* Usage Guide */}
      {showUsageGuide && (
        <div className="media-usage-guide">
          <ImageUsageGuide />
        </div>
      )}

      {/* Image Grid */}
      <div className="media-grid">
        {loading ? (
          <div className="media-loading">Loading media...</div>
        ) : filteredImages.length === 0 ? (
          <div className="media-empty">
            <div className="media-empty__icon">🎬</div>
            <h3>No media found</h3>
            <p>Upload some images or videos to get started</p>
          </div>
        ) : (
          filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onDelete={deleteImage}
              onUpdate={updateImageMetadata}
              onCopyUrl={copyImageUrl}
            />
          ))
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="media-upload-modal">
          <div className="media-upload-modal__content">
            <h3>Uploading Media...</h3>
            <div className="media-upload-modal__progress">
              {Object.entries(uploadProgress).map(([filename, progress]) => (
                <div key={filename} className="media-upload-modal__item">
                  <div className="media-upload-modal__item-header">
                    <span className="media-upload-modal__filename">{filename}</span>
                    <span className="media-upload-modal__percentage">{progress}%</span>
                  </div>
                  <div className="media-upload-modal__bar">
                    <div 
                      className="media-upload-modal__fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            {uploading && <p>Please wait while media files are being uploaded...</p>}
          </div>
        </div>
      )}
    </div>
  );
}

// Image Card Component
function ImageCard({ image, onDelete, onUpdate, onCopyUrl }) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    alt: image.alt || '',
    description: image.description || '',
    category: image.category || 'general',
    tags: image.tags?.join(', ') || ''
  });

  const handleSave = () => {
    const updates = {
      ...editData,
      tags: editData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onUpdate(image.id, updates);
    setEditing(false);
  };


  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isVideo = image.type === 'video' || image.contentType?.startsWith('video/');
  const hasValidVideoData = isVideo && image.publicUrl && !image.thumbnail?.startsWith('blob:');
  const previewUrl = isVideo ? (image.thumbnail || image.firebaseUrl) : getImageUrl(image);
  console.log('🎬 Media URL for', image.name, ':', previewUrl, 'Type:', isVideo ? 'video' : 'image', 'Valid:', hasValidVideoData);

  return (
    <div className="image-card">
      <div className="image-card__preview">
        {isVideo && hasValidVideoData ? (
          <VideoPlayer
            videoUrl={image.publicUrl || image.firebaseUrl}
            thumbnail={image.thumbnail && !image.thumbnail.startsWith('blob:') ? image.thumbnail : null}
            title={image.name}
            className="image-card__video-player"
          />
        ) : isVideo ? (
          <div className="image-card__video-error">
            <div className="image-card__video-error-icon">⚠️</div>
            <div className="image-card__video-error-text">Video Error</div>
            <div className="image-card__video-error-name">{image.name}</div>
            <div className="image-card__video-error-message">Please re-upload this video</div>
          </div>
        ) : (
          <img 
            src={previewUrl} 
            alt={image.alt || image.name}
            className="image-card__image"
            onError={(e) => {
              console.error('❌ Failed to load image:', image.name, 'URL:', previewUrl);
              e.target.style.display = 'none';
            }}
            onLoad={() => {
              console.log('✅ Successfully loaded image:', image.name);
            }}
          />
        )}
        <div className="image-card__overlay">
          <button 
            className="image-card__action"
            onClick={() => onCopyUrl(image)}
            title="Copy URL"
          >
            📋
          </button>
          <a 
            href="/admin/image-assignment"
            className="image-card__action"
            title="Assign to Page Section"
          >
            🎯
          </a>
          <button 
            className="image-card__action"
            onClick={() => setEditing(!editing)}
            title="Edit"
          >
            ✏️
          </button>
          <button 
            className="image-card__action image-card__action--danger"
            onClick={() => onDelete(image.id, image)}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="image-card__info">
        <h4 className="image-card__name">{image.name}</h4>
        <p className="image-card__size">{formatFileSize(image.size)}</p>
        <span className={`image-card__category image-card__category--${image.category}`}>
          {IMAGE_CATEGORIES[image.category] || 'General'}
        </span>
      </div>

      {editing && (
        <div className="image-card__edit">
          <div className="image-card__edit-group">
            <label>Alt Text:</label>
            <input
              type="text"
              value={editData.alt}
              onChange={(e) => setEditData({...editData, alt: e.target.value})}
              placeholder="Describe the image for accessibility"
            />
          </div>
          
          <div className="image-card__edit-group">
            <label>Description:</label>
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({...editData, description: e.target.value})}
              placeholder="Optional description"
              rows={2}
            />
          </div>
          
          <div className="image-card__edit-group">
            <label>Category:</label>
            <select
              value={editData.category}
              onChange={(e) => setEditData({...editData, category: e.target.value})}
            >
              {Object.entries(IMAGE_CATEGORIES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          
          <div className="image-card__edit-group">
            <label>Tags (comma-separated):</label>
            <input
              type="text"
              value={editData.tags}
              onChange={(e) => setEditData({...editData, tags: e.target.value})}
              placeholder="tag1, tag2, tag3"
            />
          </div>
          
          <div className="image-card__edit-actions">
            <button 
              className="button button--primary button--sm"
              onClick={handleSave}
            >
              Save
            </button>
            <button 
              className="button button--secondary button--sm"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
