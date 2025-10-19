/**
 * HABS TECHNOLOGIES GROUP
 * Dynamic Image Component
 * Fetches and displays images from the database
 */

'use client';

import { useState, useEffect } from 'react';
import { getDocument, getDocuments, COLLECTIONS } from '@/lib/firestore';
import { getImageUrl } from '@/lib/dual-storage';

// Helper function to get default image URL based on section ID
function getDefaultImageUrl(sectionId) {
  const defaultImages = {
    'hero-bg': '/images/hero/hero-placeholder.svg',
    'service-ai': '/images/services/service-ai.svg',
    'service-web': '/images/services/service-web.svg',
    'service-creative': '/images/services/service-creative.svg',
    'team-member': '/images/general/default-avatar.svg',
  };
  
  return defaultImages[sectionId] || null;
}

// Helper function to get category from section ID
function getCategoryFromSectionId(sectionId) {
  const categoryMapping = {
    'hero-bg': 'hero',
    'service-ai': 'services',
    'service-web': 'services',
    'service-creative': 'services',
    'team-member': 'team',
    'office': 'office',
    'leadership': 'leadership',
    'clients': 'clients',
    'case-studies': 'case-studies',
    'divisions': 'divisions',
    'contact': 'contact',
    'application': 'application',
  };
  
  return categoryMapping[sectionId] || 'general';
}

export default function DynamicImage({ 
  sectionId, 
  page = 'homepage', 
  alt = '', 
  className = '',
  size = 'original',
  fallback = null,
  ...props 
}) {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadImage();
  }, [sectionId, page]);

  const loadImage = async () => {
    try {
      setLoading(true);
      setError(false);

      console.log(`Loading image for section: ${sectionId}, page: ${page}`);

      // First, try to get image from page section mapping
      const pageContent = await getDocuments(COLLECTIONS.PAGES, {
        where: ['page', '==', page]
      });

      console.log('Page content found:', pageContent);

      if (pageContent.length > 0) {
        const imageId = pageContent[0].sections?.[sectionId];
        console.log('Image ID for section:', imageId);
        
        if (imageId) {
          // Get image data from MEDIA collection
          const image = await getDocument(COLLECTIONS.MEDIA, imageId);
          console.log('Image data from page mapping:', image);
          
          if (image) {
            setImageData(image);
            return;
          }
        }
      }

      // If no page mapping found, try to find image by sectionId in MEDIA collection
      console.log('No page mapping found, searching MEDIA collection for sectionId:', sectionId);
      
      const mediaImages = await getDocuments(COLLECTIONS.MEDIA, {
        where: ['sectionId', '==', sectionId]
      });

      console.log('Media images found for sectionId:', mediaImages);

      if (mediaImages.length > 0) {
        // Use the most recent image for this section
        const image = mediaImages[0];
        console.log('Using image from MEDIA collection:', image);
        setImageData(image);
        return;
      }

      // If still no image found, try to find by category and sectionId pattern
      const category = getCategoryFromSectionId(sectionId);
      if (category) {
        console.log('Searching by category:', category);
        const categoryImages = await getDocuments(COLLECTIONS.MEDIA, {
          where: ['category', '==', category]
        });

        if (categoryImages.length > 0) {
          const image = categoryImages[0];
          console.log('Using image from category:', image);
          setImageData(image);
          return;
        }
      }

      console.log('No image found for section:', sectionId);
      setError(true);
    } catch (error) {
      console.error('Error loading dynamic image:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`dynamic-image dynamic-image--loading ${className}`} {...props}>
        <div className="dynamic-image__placeholder">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !imageData) {
    if (fallback) {
      return fallback;
    }
    
    // Try to load a default placeholder image based on sectionId
    const defaultImageUrl = getDefaultImageUrl(sectionId);
    
    return (
      <div className={`dynamic-image dynamic-image--error ${className}`} {...props}>
        {defaultImageUrl ? (
          <img
            src={defaultImageUrl}
            alt={alt || 'Default image'}
            className="dynamic-image__fallback"
          />
        ) : (
          <div className="dynamic-image__placeholder">
            <span>No image selected</span>
          </div>
        )}
      </div>
    );
  }

  // Get the appropriate image URL using dual storage system
  const imageUrl = getImageUrl(imageData, size);

  return (
    <img
      src={imageUrl}
      alt={alt || imageData.alt || imageData.name}
      className={`dynamic-image ${className}`}
      {...props}
    />
  );
}

// Background Image Component
export function DynamicBackgroundImage({ 
  sectionId, 
  page = 'homepage', 
  className = '',
  children,
  ...props 
}) {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadImage();
  }, [sectionId, page]);

  const loadImage = async () => {
    try {
      setLoading(true);
      setError(false);

      // Get page content
      const pageContent = await getDocuments(COLLECTIONS.PAGES, {
        where: ['page', '==', page]
      });

      if (pageContent.length === 0) {
        setError(true);
        return;
      }

      const imageId = pageContent[0].sections?.[sectionId];
      
      if (!imageId) {
        setError(true);
        return;
      }

      // Get image data
      const image = await getDocument(COLLECTIONS.MEDIA, imageId);
      
      if (image) {
        setImageData(image);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error loading dynamic background image:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const backgroundStyle = {
    backgroundImage: imageData ? `url(${getImageUrl(imageData)})` : 
      (error ? `url(${getDefaultImageUrl(sectionId)})` : 'none'),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div 
      className={`dynamic-background-image ${className}`}
      style={backgroundStyle}
      {...props}
    >
      {children}
    </div>
  );
}
