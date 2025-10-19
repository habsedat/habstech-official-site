/**
 * HABS TECHNOLOGIES GROUP
 * News Page
 */

'use client';

import { useState, useEffect } from 'react';
import { getDocuments, COLLECTIONS } from '@/lib/firestore';
import './news.css';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  status: string;
  featuredImage?: string;
  featuredImageThumbnail?: string;
  tags?: string;
  author?: string;
  publishedAt?: { toDate: () => Date } | Date | string;
  createdAt?: { toDate: () => Date } | Date | string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'company', label: 'Company News' },
    { value: 'technology', label: 'Technology' },
    { value: 'industry', label: 'Industry Updates' },
    { value: 'announcements', label: 'Announcements' },
  ];

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const newsData = await getDocuments(COLLECTIONS.NEWS, {
        orderBy: ['publishedAt', 'desc']
      }) as NewsArticle[];
      
      // Only show published news
      const publishedNews = newsData.filter((item: NewsArticle) => item.status === 'published');
      setNews(publishedNews);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = news.filter((item: NewsArticle) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const formatDate = (date: NewsArticle['publishedAt']) => {
    if (!date) return '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dateObj = (date as any).toDate ? (date as any).toDate() : new Date(date as string);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const getDisplayContent = (article: NewsArticle) => {
    // Use excerpt if available, otherwise use truncated content
    if (article.excerpt) {
      return article.excerpt;
    }
    return truncateText(article.content, 150);
  };

  const shouldShowReadMore = (article: NewsArticle) => {
    // Show read more if content is longer than excerpt or if content is long
    if (article.excerpt && article.content && article.content.length > article.excerpt.length) {
      return true;
    }
    if (!article.excerpt && article.content && article.content.length > 150) {
      return true;
    }
    return false;
  };

  const toggleExpanded = (articleId: string) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId);
  };

  if (loading) {
    return (
      <div className="news-page">
        <div className="news-page__loading">
          <div className="news-page__spinner"></div>
          <p>Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page">
      <div className="news-page__container">
        {/* Header */}
        <div className="news-page__header">
          <h1 className="news-page__title">Company News</h1>
          <p className="news-page__subtitle">
            Stay updated with the latest news, announcements, and insights from HABS Technologies Group
          </p>
        </div>

        {/* Filters */}
        <div className="news-page__filters">
          <div className="news-page__search">
            <input
              type="text"
              placeholder="Search news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="news-page__search-input"
            />
          </div>
          
          <div className="news-page__categories">
            {categories.map(category => (
              <button
                key={category.value}
                className={`news-page__category-btn ${selectedCategory === category.value ? 'news-page__category-btn--active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="news-page__empty">
            <div className="news-page__empty-icon">📰</div>
            <h3>No news articles found</h3>
            <p>Check back later for the latest updates from HABS Technologies Group.</p>
          </div>
        ) : (
          <div className="news-page__grid">
            {filteredNews.map((article) => (
              <article key={article.id} className="news-page__article">
                {article.featuredImage && (
                  <div className="news-page__article-image">
                    {article.featuredImage.includes('.mp4') || 
                     article.featuredImage.includes('.webm') || 
                     article.featuredImage.includes('.avi') || 
                     article.featuredImage.includes('.mov') ||
                     article.featuredImage.includes('video/') ||
                     article.featuredImage.includes('firebasestorage') && article.featuredImage.includes('.mp4') ? (
                      <div className="news-page__video-container">
                        <video 
                          controls
                          preload="metadata"
                          className="news-page__video"
                          poster={article.featuredImageThumbnail || 
                                  (article.featuredImage.includes('firebasestorage') ? 
                                    article.featuredImage.replace('.mp4', '_thumb.jpg').replace('.webm', '_thumb.jpg').replace('.avi', '_thumb.jpg').replace('.mov', '_thumb.jpg') :
                                    undefined)}
                          onLoadedMetadata={(e) => {
                            // Try to generate a thumbnail from the video
                            const video = e.target as HTMLVideoElement;
                            if (video.duration > 0 && !article.featuredImageThumbnail) {
                              // Seek to 2 seconds to generate thumbnail
                              video.currentTime = Math.min(2, video.duration * 0.1);
                            }
                          }}
                          onSeeked={(e) => {
                            // Generate thumbnail after seeking
                            const video = e.target as HTMLVideoElement;
                            if (!article.featuredImageThumbnail) {
                              try {
                                const canvas = document.createElement('canvas');
                                const ctx = canvas.getContext('2d');
                                if (ctx) {
                                  canvas.width = 320;
                                  canvas.height = 180;
                                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                                  const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
                                  video.poster = thumbnailUrl;
                                }
                              } catch (error) {
                                console.log('Could not generate thumbnail:', error);
                              }
                            }
                          }}
                        >
                          <source src={article.featuredImage} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      <img 
                        src={article.featuredImage} 
                        alt={article.title}
                        loading="lazy"
                      />
                    )}
                  </div>
                )}
                
                <div className="news-page__article-content">
                  <div className="news-page__article-meta">
                    <span className="news-page__article-category">
                      {categories.find(cat => cat.value === article.category)?.label || article.category}
                    </span>
                    <span className="news-page__article-date">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  
                  <h2 className="news-page__article-title">
                    {article.title}
                  </h2>
                  
                  <div className="news-page__article-content-text">
                    {expandedArticle === article.id ? (
                      <div className="news-page__article-full-content">
                        <p>{article.content}</p>
                        <button 
                          className="news-page__read-more-btn"
                          onClick={() => toggleExpanded(article.id)}
                        >
                          Read Less
                        </button>
                      </div>
                    ) : (
                      <div className="news-page__article-preview">
                        <p>{getDisplayContent(article)}</p>
                        {shouldShowReadMore(article) && (
                          <button 
                            className="news-page__read-more-btn"
                            onClick={() => toggleExpanded(article.id)}
                          >
                            Read Full News
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {article.author && (
                    <div className="news-page__article-author">
                      By {article.author}
                    </div>
                  )}
                  
                  {article.tags && (
                    <div className="news-page__article-tags">
                      {article.tags.split(',').map((tag, index) => (
                        <span key={index} className="news-page__article-tag">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
