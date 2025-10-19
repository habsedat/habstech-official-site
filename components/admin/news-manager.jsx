/**
 * HABS TECHNOLOGIES GROUP
 * News Manager Component
 */

'use client';

import { useState, useEffect } from 'react';
import { getDocuments, addDocument, updateDocument, deleteDocument, COLLECTIONS } from '@/lib/firestore';
import Button from '../ui/button';
import Input from '../ui/input';
import Select from '../ui/select';
import StatusChip from './status-chip';
import './news-manager.css';
import '../../screens/admin/contacts.css';
import { createPortal } from 'react-dom';

const NEWS_STATUSES = [
  { value: 'draft', label: 'Draft', color: 'gray' },
  { value: 'published', label: 'Published', color: 'green' },
  { value: 'archived', label: 'Archived', color: 'red' },
];

const NEWS_CATEGORIES = [
  { value: 'company', label: 'Company News' },
  { value: 'technology', label: 'Technology' },
  { value: 'industry', label: 'Industry Updates' },
  { value: 'announcements', label: 'Announcements' },
];

export default function NewsManager() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'company',
    status: 'draft',
    featuredImage: '',
    featuredImageThumbnail: '', // Store thumbnail separately for videos
    tags: '',
    author: '',
    publishedAt: null
  });

  // Image selection state
  const [imageSelectionMethod, setImageSelectionMethod] = useState('url'); // 'url' or 'media'
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    loadNews();
    loadMediaItems();
  }, []);

  const loadMediaItems = async () => {
    try {
      const mediaData = await getDocuments(COLLECTIONS.MEDIA, {
        orderBy: ['createdAt', 'desc']
      });
      console.log('Loaded media items:', mediaData);
      setMediaItems(mediaData);
    } catch (error) {
      console.error('Error loading media items:', error);
    }
  };

  const loadNews = async () => {
    setLoading(true);
    try {
      const newsData = await getDocuments(COLLECTIONS.NEWS, {
        orderBy: ['createdAt', 'desc']
      });
      setNews(newsData);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNews = async () => {
    setLoading(true);
    try {
      const newsData = {
        ...formData,
        publishedAt: formData.status === 'published' ? new Date() : null,
        updatedAt: new Date()
      };

      if (editingNews) {
        await updateDocument(COLLECTIONS.NEWS, editingNews.id, newsData);
      } else {
        await addDocument(COLLECTIONS.NEWS, {
          ...newsData,
          createdAt: new Date()
        });
      }

      setShowModal(false);
      setEditingNews(null);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        category: 'company',
        status: 'draft',
        featuredImage: '',
        featuredImageThumbnail: '',
        tags: '',
        author: '',
        publishedAt: null
      });
      loadNews();
    } catch (error) {
      console.error('Error saving news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditNews = (newsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title || '',
      content: newsItem.content || '',
      excerpt: newsItem.excerpt || '',
      category: newsItem.category || 'company',
      status: newsItem.status || 'draft',
      featuredImage: newsItem.featuredImage || '',
      featuredImageThumbnail: newsItem.featuredImageThumbnail || '',
      tags: newsItem.tags || '',
      author: newsItem.author || '',
      publishedAt: newsItem.publishedAt || null
    });
    setShowModal(true);
  };

  const handleDeleteNews = async (newsId) => {
    if (confirm('Are you sure you want to delete this news article?')) {
      setLoading(true);
      try {
        await deleteDocument(COLLECTIONS.NEWS, newsId);
        loadNews();
      } catch (error) {
        console.error('Error deleting news:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectImageFromMedia = (mediaItem) => {
    const isVideo = mediaItem.type === 'video' || mediaItem.contentType?.startsWith('video/');
    
    let mediaUrl, thumbnailUrl;
    if (isVideo) {
      // For videos, use the actual video URL (not thumbnail)
      mediaUrl = mediaItem.publicUrl || mediaItem.firebaseUrl;
      // For videos, also store the thumbnail for poster
      thumbnailUrl = mediaItem.thumbnail || mediaItem.sizes?.thumbnail || mediaItem.sizes?.medium;
    } else {
      // For images, use the best available URL (prefer thumbnail, then medium, then original)
      mediaUrl = mediaItem.sizes?.thumbnail || 
                 mediaItem.sizes?.medium || 
                 mediaItem.sizes?.original || 
                 mediaItem.firebaseUrl || 
                 mediaItem.publicUrl;
      thumbnailUrl = mediaUrl; // For images, thumbnail is the same as the image
    }
    
    console.log('Selected media item:', mediaItem);
    console.log('Is video:', isVideo);
    console.log('Using media URL:', mediaUrl);
    console.log('Using thumbnail URL:', thumbnailUrl);
    
    setFormData({
      ...formData, 
      featuredImage: mediaUrl,
      featuredImageThumbnail: thumbnailUrl
    });
    setShowMediaPicker(false);
  };

  const handleImageMethodChange = (method) => {
    setImageSelectionMethod(method);
    if (method === 'url') {
      setFormData({...formData, featuredImage: ''});
    }
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="news-manager">
      <div className="news-manager__header">
        <div className="news-manager__title-section">
          <h2>News Management</h2>
          <p>Create and manage company news articles</p>
        </div>
        <button 
          className="news-manager__create-btn"
          onClick={() => setShowModal(true)}
        >
          + Add News Article
        </button>
      </div>

      {/* Filters */}
      <div className="news-manager__filters">
        <div className="news-manager__filters-left">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="news-manager__search"
          />
        </div>
        
        <div className="news-manager__filters-right">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="news-manager__filter"
          >
            <option value="all">All Statuses</option>
            {NEWS_STATUSES.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="news-manager__filter"
          >
            <option value="all">All Categories</option>
            {NEWS_CATEGORIES.map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* News List */}
      <div className="news-manager__list">
        {loading ? (
          <div className="news-manager__loading">Loading news articles...</div>
        ) : filteredNews.length === 0 ? (
          <div className="news-manager__empty">
            <div className="news-manager__empty-icon">📰</div>
            <h3>No news articles found</h3>
            <p>Create your first news article to get started</p>
            <button 
              className="news-manager__empty-btn"
              onClick={() => setShowModal(true)}
            >
              Add News Article
            </button>
          </div>
        ) : (
          <div className="news-manager__grid">
            {filteredNews.map((newsItem) => (
              <div key={newsItem.id} className="news-manager__item">
                <div className="news-manager__item-header">
                  <h3 className="news-manager__item-title">{newsItem.title}</h3>
                  <StatusChip status={newsItem.status} />
                </div>
                <div className="news-manager__item-meta">
                  <span className="news-manager__item-category">{newsItem.category}</span>
                  <span className="news-manager__item-date">
                    {new Date(newsItem.createdAt?.toDate?.() || newsItem.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="news-manager__item-excerpt">{newsItem.excerpt}</p>
                <div className="news-manager__item-actions">
                  <button 
                    className="news-manager__action-btn news-manager__action-btn--edit"
                    onClick={() => handleEditNews(newsItem)}
                  >
                    Edit
                  </button>
                  <button 
                    className="news-manager__action-btn news-manager__action-btn--delete"
                    onClick={() => handleDeleteNews(newsItem.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && createPortal(
        <div className="contact-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal__header">
              <h2 className="contact-modal__title">
                {editingNews ? 'Edit News Article' : 'Add News Article'}
              </h2>
              <button className="contact-modal__close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="contact-modal__content">
              <div className="news-manager__form admin-section">
                <Input
                  label="Title"
                  placeholder="Enter news title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
                
                <Input
                  label="Excerpt"
                  placeholder="Enter news excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                />
                
                <Select
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  options={NEWS_CATEGORIES}
                  placeholder="Select category"
                />
                
                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  options={NEWS_STATUSES}
                  placeholder="Select status"
                />
                
                <Input
                  label="Author"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                />
                
                {/* Enhanced Image Selection */}
                <div className="news-manager__form-group">
                  <label className="news-manager__form-label">Featured Image</label>
                  
                  {/* Image Selection Method Toggle */}
                  <div className="news-manager__image-method-toggle">
                    <button
                      type="button"
                      className={`news-manager__method-btn ${imageSelectionMethod === 'url' ? 'news-manager__method-btn--active' : ''}`}
                      onClick={() => handleImageMethodChange('url')}
                    >
                      📎 Enter URL
                    </button>
                    <button
                      type="button"
                      className={`news-manager__method-btn ${imageSelectionMethod === 'media' ? 'news-manager__method-btn--active' : ''}`}
                      onClick={() => handleImageMethodChange('media')}
                    >
                      🖼️ Choose from Media
                    </button>
                  </div>

                  {/* URL Input Method */}
                  {imageSelectionMethod === 'url' && (
                    <Input
                      placeholder="Enter image URL"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                    />
                  )}

                  {/* Media Selection Method */}
                  {imageSelectionMethod === 'media' && (
                    <div className="news-manager__media-selection">
                      <button
                        type="button"
                        className="news-manager__media-picker-btn"
                        onClick={() => setShowMediaPicker(true)}
                      >
                        {formData.featuredImage ? 'Change Image' : 'Select Image from Media'}
                      </button>
                      
                      {formData.featuredImage && (
                        <div className="news-manager__selected-image">
                          <img src={formData.featuredImage} alt="Selected" />
                          <button
                            type="button"
                            className="news-manager__remove-image-btn"
                            onClick={() => setFormData({...formData, featuredImage: ''})}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Media Preview */}
                  {formData.featuredImage && (
                    <div className="news-manager__image-preview">
                      {formData.featuredImage.includes('.mp4') || 
                       formData.featuredImage.includes('.webm') || 
                       formData.featuredImage.includes('.avi') || 
                       formData.featuredImage.includes('.mov') ||
                       formData.featuredImage.includes('video/') ||
                       formData.featuredImage.includes('firebasestorage') && formData.featuredImage.includes('.mp4') ? (
                        <video 
                          controls
                          preload="metadata"
                          className="news-manager__video-preview"
                          poster={formData.featuredImageThumbnail}
                        >
                          <source src={formData.featuredImage} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img src={formData.featuredImage} alt="Preview" />
                      )}
                    </div>
                  )}
                </div>
                
                <Input
                  label="Tags"
                  placeholder="Enter tags (comma separated)"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                />
                
                <div className="news-manager__form-group">
                  <label className="news-manager__form-label">Content</label>
                  <textarea
                    className="news-manager__form-textarea"
                    placeholder="Enter news content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={10}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="contact-modal__footer">
              <button className="button button--secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="button button--primary" onClick={handleSaveNews}>
                {editingNews ? 'Update Article' : 'Create Article'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Media Picker Modal */}
      {showMediaPicker && createPortal(
        <div className="contact-modal-overlay" onClick={() => setShowMediaPicker(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal__header">
              <h2 className="contact-modal__title">Select Image from Media</h2>
              <button className="contact-modal__close" onClick={() => setShowMediaPicker(false)}>
                ×
              </button>
            </div>
            <div className="contact-modal__content">
              <div className="news-manager__media-picker">
                {mediaItems.length === 0 ? (
                  <div className="news-manager__media-empty">
                    <div className="news-manager__media-empty-icon">🖼️</div>
                    <h3>No media files found</h3>
                    <p>Upload some images to the media library first</p>
                  </div>
                ) : (
                  <div className="news-manager__media-grid">
                    {mediaItems.filter(mediaItem => {
                      const isVideo = mediaItem.type === 'video' || mediaItem.contentType?.startsWith('video/');
                      const hasValidVideoData = isVideo && mediaItem.publicUrl && !mediaItem.thumbnail?.startsWith('blob:');
                      return !isVideo || hasValidVideoData; // Only show valid videos or all images
                    }).map((mediaItem) => {
                      const isVideo = mediaItem.type === 'video' || mediaItem.contentType?.startsWith('video/');
                      const thumbnailUrl = mediaItem.thumbnail || mediaItem.sizes?.thumbnail || mediaItem.sizes?.medium || mediaItem.sizes?.original || mediaItem.firebaseUrl || mediaItem.publicUrl;
                      
                      return (
                        <div
                          key={mediaItem.id}
                          className="news-manager__media-item"
                          onClick={() => handleSelectImageFromMedia(mediaItem)}
                        >
                          {isVideo ? (
                            <div className="news-manager__video-thumbnail">
                              {thumbnailUrl && !thumbnailUrl.startsWith('blob:') ? (
                                <img 
                                  src={thumbnailUrl} 
                                  alt={mediaItem.name}
                                  onError={(e) => {
                                    console.error('Failed to load video thumbnail:', mediaItem);
                                    e.target.style.display = 'none';
                                    const fallback = e.target.nextElementSibling;
                                    if (fallback) {
                                      fallback.style.display = 'flex';
                                    }
                                  }}
                                  onLoad={() => console.log('Video thumbnail loaded successfully:', mediaItem.name)}
                                />
                              ) : (
                                <div className="news-manager__video-placeholder">
                                  <div className="news-manager__video-placeholder-icon">🎬</div>
                                  <div className="news-manager__video-placeholder-text">Video</div>
                                </div>
                              )}
                              <div className="news-manager__video-overlay">
                                <div className="news-manager__video-icon">▶️</div>
                                <div className="news-manager__video-label">Video</div>
                              </div>
                            </div>
                          ) : (
                            <img 
                              src={thumbnailUrl} 
                              alt={mediaItem.name}
                              onError={(e) => {
                                console.error('Failed to load image:', mediaItem);
                                e.target.style.display = 'none';
                                const fallback = e.target.nextElementSibling;
                                if (fallback) {
                                  fallback.style.display = 'flex';
                                }
                              }}
                              onLoad={() => console.log('Image loaded successfully:', mediaItem.name)}
                            />
                          )}
                          <div className="news-manager__media-item-fallback">
                            <div className="news-manager__media-item-icon">{isVideo ? '🎬' : '🖼️'}</div>
                            <span className="news-manager__media-item-name">{mediaItem.name}</span>
                          </div>
                          <div className="news-manager__media-item-overlay">
                            <span className="news-manager__media-item-name">{mediaItem.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="contact-modal__footer">
              <button className="button button--secondary" onClick={() => setShowMediaPicker(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
