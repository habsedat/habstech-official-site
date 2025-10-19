/**
 * HABS TECHNOLOGIES GROUP
 * Visual Image Assignment Manager
 */

'use client';

import { useState, useEffect } from 'react';
import { getDocuments, updateDocument, addDocument, COLLECTIONS } from '@/lib/firestore';
import { getImageUrl } from '@/lib/dual-storage';
import './image-assignment-manager.css';

// Website sections that can have images assigned
const WEBSITE_SECTIONS = {
  homepage: {
    name: 'Homepage',
    sections: [
      {
        id: 'hero-bg',
        name: 'Hero Background',
        description: 'Main hero section background image',
        preview: '/images/hero/hero-placeholder.svg',
        type: 'background'
      },
      {
        id: 'service-ai',
        name: 'AI Solutions Icon',
        description: 'Icon for AI Solutions service card',
        preview: '/images/services/service-ai.svg',
        type: 'icon'
      },
      {
        id: 'service-web',
        name: 'Web Development Icon',
        description: 'Icon for Web Development service card',
        preview: '/images/services/service-web.svg',
        type: 'icon'
      },
      {
        id: 'service-creative',
        name: 'Creative Tech Icon',
        description: 'Icon for Creative Tech service card',
        preview: '/images/services/service-creative.svg',
        type: 'icon'
      }
    ]
  },
  about: {
    name: 'About Page',
    sections: [
      {
        id: 'about-hero',
        name: 'About Hero Background',
        description: 'Hero section background for about page',
        preview: '/images/hero/hero-placeholder.svg',
        type: 'background'
      },
      {
        id: 'team-member-1',
        name: 'Team Member 1',
        description: 'First team member photo',
        preview: '/images/general/default-avatar.svg',
        type: 'photo'
      },
      {
        id: 'team-member-2',
        name: 'Team Member 2',
        description: 'Second team member photo',
        preview: '/images/general/default-avatar.svg',
        type: 'photo'
      }
    ]
  },
  divisions: {
    name: 'Divisions Page',
    sections: [
      {
        id: 'division-ai-studio',
        name: 'Habs AI Studio Icon',
        description: 'Icon for Habs AI Studio division',
        preview: '/images/services/service-ai.svg',
        type: 'icon'
      },
      {
        id: 'division-ai-forge',
        name: 'Habs AI Forge Icon',
        description: 'Icon for Habs AI Forge division',
        preview: '/images/services/service-ai.svg',
        type: 'icon'
      },
      {
        id: 'division-media',
        name: 'Habs Media Icon',
        description: 'Icon for Habs Media division',
        preview: '/images/services/service-creative.svg',
        type: 'icon'
      },
      {
        id: 'division-play',
        name: 'Habs Play Icon',
        description: 'Icon for Habs Play division',
        preview: '/images/services/service-creative.svg',
        type: 'icon'
      },
      {
        id: 'division-motion',
        name: 'Habs Motion Icon',
        description: 'Icon for Habs Motion division',
        preview: '/images/services/service-creative.svg',
        type: 'icon'
      },
      {
        id: 'division-connect',
        name: 'Habs Connect Icon',
        description: 'Icon for Habs Connect division',
        preview: '/images/services/service-web.svg',
        type: 'icon'
      }
    ]
  }
};

export default function ImageAssignmentManager() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [pageSections, setPageSections] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load uploaded images
      const images = await getDocuments(COLLECTIONS.MEDIA, {
        orderBy: ['createdAt', 'desc']
      });
      setUploadedImages(images);

      // Load page sections
      const pages = await getDocuments(COLLECTIONS.PAGES);
      const sectionsData = {};
      
      pages.forEach(page => {
        sectionsData[page.page] = page.sections || {};
      });
      
      setPageSections(sectionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setShowAssignmentModal(true);
  };

  const handleSectionClick = (page, section) => {
    if (selectedImage) {
      assignImageToSection(selectedImage, page, section.id);
    } else {
      setSelectedSection({ page, section });
      setShowAssignmentModal(true);
    }
  };

  const assignImageToSection = async (image, page, sectionId) => {
    try {
      // Get or create page document
      const pages = await getDocuments(COLLECTIONS.PAGES, {
        where: ['page', '==', page]
      });

      let pageData;
      if (pages.length === 0) {
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
        [sectionId]: image.id
      };

      await updateDocument(COLLECTIONS.PAGES, pageData.id, {
        sections: updatedSections,
        updatedAt: new Date()
      });

      // Update image's sectionId field
      await updateDocument(COLLECTIONS.MEDIA, image.id, {
        sectionId: sectionId,
        updatedAt: new Date()
      });

      // Update local state
      setPageSections(prev => ({
        ...prev,
        [page]: {
          ...prev[page],
          [sectionId]: image.id
        }
      }));

      setShowAssignmentModal(false);
      setSelectedImage(null);
      setSelectedSection(null);
      
      alert(`Image "${image.name}" assigned to ${page} - ${sectionId}`);
    } catch (error) {
      console.error('Error assigning image:', error);
      alert('Failed to assign image. Please try again.');
    }
  };

  const getAssignedImage = (page, sectionId) => {
    const imageId = pageSections[page]?.[sectionId];
    if (imageId) {
      return uploadedImages.find(img => img.id === imageId);
    }
    return null;
  };

  if (loading) {
    return (
      <div className="image-assignment-loading">
        <div className="spinner"></div>
        <p>Loading image assignment data...</p>
      </div>
    );
  }

  return (
    <div className="image-assignment-manager">
      {/* Uploaded Images Panel */}
      <div className="image-assignment__images-panel">
        <h3>Uploaded Images</h3>
        <p>Click on an image to select it for assignment</p>
        
        <div className="image-assignment__images-grid">
          {uploadedImages.length === 0 ? (
            <div className="image-assignment__empty">
              <p>No images uploaded yet.</p>
              <a href="/admin/media" className="button button--primary">
                Upload Images
              </a>
            </div>
          ) : (
            uploadedImages.map((image) => (
              <div
                key={image.id}
                className={`image-assignment__image-item ${selectedImage?.id === image.id ? 'selected' : ''}`}
                onClick={() => handleImageSelect(image)}
              >
                <img
                  src={getImageUrl(image)}
                  alt={image.name}
                  className="image-assignment__image-preview"
                />
                <div className="image-assignment__image-info">
                  <h4>{image.name}</h4>
                  <p>{image.category}</p>
                  {image.sectionId && (
                    <span className="image-assignment__assigned-badge">
                      Assigned to: {image.sectionId}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Website Sections Panel */}
      <div className="image-assignment__sections-panel">
        <h3>Website Sections</h3>
        <p>Click on any section to assign the selected image</p>
        
        {Object.entries(WEBSITE_SECTIONS).map(([pageKey, pageData]) => (
          <div key={pageKey} className="image-assignment__page">
            <h4 className="image-assignment__page-title">{pageData.name}</h4>
            
            <div className="image-assignment__sections-grid">
              {pageData.sections.map((section) => {
                const assignedImage = getAssignedImage(pageKey, section.id);
                
                return (
                  <div
                    key={section.id}
                    className={`image-assignment__section-item ${assignedImage ? 'has-image' : ''}`}
                    onClick={() => handleSectionClick(pageKey, section)}
                  >
                    <div className="image-assignment__section-preview">
                      {assignedImage ? (
                        <img
                          src={getImageUrl(assignedImage)}
                          alt={assignedImage.name}
                          className="image-assignment__section-image"
                        />
                      ) : (
                        <img
                          src={section.preview}
                          alt={section.name}
                          className="image-assignment__section-placeholder"
                        />
                      )}
                    </div>
                    
                    <div className="image-assignment__section-info">
                      <h5>{section.name}</h5>
                      <p>{section.description}</p>
                      <span className={`image-assignment__section-type ${section.type}`}>
                        {section.type}
                      </span>
                      {assignedImage && (
                        <div className="image-assignment__assigned-info">
                          <small>Assigned: {assignedImage.name}</small>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Assignment Modal */}
      {showAssignmentModal && (
        <div className="image-assignment__modal">
          <div className="image-assignment__modal-content">
            <h3>Assign Image to Section</h3>
            
            {selectedImage && selectedSection ? (
              <div className="image-assignment__modal-assignment">
                <div className="image-assignment__modal-image">
                  <img src={getImageUrl(selectedImage)} alt={selectedImage.name} />
                  <h4>{selectedImage.name}</h4>
                </div>
                
                <div className="image-assignment__modal-arrow">→</div>
                
                <div className="image-assignment__modal-section">
                  <div className="image-assignment__section-preview">
                    <img
                      src={selectedSection.section.preview}
                      alt={selectedSection.section.name}
                    />
                  </div>
                  <h4>{selectedSection.section.name}</h4>
                  <p>{selectedSection.section.description}</p>
                </div>
                
                <div className="image-assignment__modal-actions">
                  <button
                    className="button button--primary"
                    onClick={() => assignImageToSection(selectedImage, selectedSection.page, selectedSection.section.id)}
                  >
                    Assign Image
                  </button>
                  <button
                    className="button button--secondary"
                    onClick={() => {
                      setShowAssignmentModal(false);
                      setSelectedImage(null);
                      setSelectedSection(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="image-assignment__modal-selection">
                <p>Please select an image first, then click on a section to assign it.</p>
                <button
                  className="button button--secondary"
                  onClick={() => setShowAssignmentModal(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}



