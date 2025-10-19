/**
 * HABS TECHNOLOGIES GROUP
 * Professional Video Player Component
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import './video-player.css';

export default function VideoPlayer({ videoUrl, thumbnail, title, className = '' }) {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const thumbnailCanvasRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoThumbnail, setVideoThumbnail] = useState(null);

  // Format time in MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Generate thumbnail from video
  const generateVideoThumbnail = () => {
    const video = videoRef.current;
    if (!video || !thumbnailCanvasRef.current) return;

    try {
      const canvas = thumbnailCanvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions
      canvas.width = 320;
      canvas.height = 180;
      
      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to data URL
      const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
      setVideoThumbnail(thumbnailUrl);
    } catch (error) {
      console.log('Could not generate thumbnail (CORS issue):', error);
      // Don't set thumbnail on CORS error - use existing thumbnail or poster
      setVideoThumbnail(null);
    }
  };

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
      
      // Generate thumbnail from video
      if (video.duration > 0) {
        // Seek to 2 seconds for thumbnail
        video.currentTime = Math.min(2, video.duration * 0.1);
      }
    };

    const handleSeeked = () => {
      // Generate thumbnail after seeking
      generateVideoThumbnail();
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // Add event listeners
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('volumechange', handleVolumeChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Cleanup
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('volumechange', handleVolumeChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      className={`video-player ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="video-player__container">
        <video
          ref={videoRef}
          className="video-player__video"
          poster={videoThumbnail || thumbnail}
          preload="metadata"
          onClick={togglePlay}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="video-player__loading">
            <div className="video-player__spinner"></div>
          </div>
        )}

        {/* Play Button Overlay - REMOVED to avoid duplicate buttons */}

        {/* Controls */}
        <div className={`video-player__controls ${showControls || !isPlaying ? 'video-player__controls--visible' : ''}`}>
          {/* Progress Bar */}
          <div className="video-player__progress-container">
            <div 
              ref={progressRef}
              className="video-player__progress-bar"
              onClick={handleProgressClick}
            >
              <div 
                className="video-player__progress-fill"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              ></div>
              <div 
                className="video-player__progress-handle"
                style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="video-player__bottom-controls">
            <div className="video-player__left-controls">
              {/* Play/Pause Button */}
              <button 
                className="video-player__control-btn"
                onClick={togglePlay}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              {/* Time Display */}
              <div className="video-player__time">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="video-player__right-controls">
              {/* Volume Control */}
              <div className="video-player__volume-container">
                <button 
                  className="video-player__control-btn"
                  onClick={toggleMute}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  )}
                </button>
                <input
                  ref={volumeRef}
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="video-player__volume-slider"
                />
              </div>

              {/* Fullscreen Button */}
              <button 
                className="video-player__control-btn"
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden canvas for thumbnail generation */}
      <canvas 
        ref={thumbnailCanvasRef} 
        style={{ display: 'none' }}
        width="320" 
        height="180"
      />
    </div>
  );
}
