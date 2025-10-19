/**
 * HABS TECHNOLOGIES GROUP
 * Debug Info Component
 * Shows system status and debugging information
 */

'use client';

import { useState, useEffect } from 'react';
import { getDocuments, COLLECTIONS } from '@/lib/firestore';

export default function DebugInfo() {
  const [debugInfo, setDebugInfo] = useState({
    mediaCount: 0,
    pagesCount: 0,
    lastError: null,
    firebaseConnected: false
  });

  useEffect(() => {
    checkSystemStatus();
  }, []);

  const checkSystemStatus = async () => {
    try {
      // Check media collection
      const media = await getDocuments(COLLECTIONS.MEDIA);
      
      // Check pages collection
      const pages = await getDocuments(COLLECTIONS.PAGES);
      
      setDebugInfo({
        mediaCount: media.length,
        pagesCount: pages.length,
        lastError: null,
        firebaseConnected: true
      });
    } catch (error) {
      console.error('Debug check error:', error);
      setDebugInfo(prev => ({
        ...prev,
        lastError: error.message,
        firebaseConnected: false
      }));
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#1e293b',
      color: '#ffffff',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid #334155',
      fontSize: '0.875rem',
      zIndex: 1000,
      maxWidth: '300px'
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0', color: '#6c63ff' }}>System Status</h4>
      <div>Media Images: {debugInfo.mediaCount}</div>
      <div>Page Configs: {debugInfo.pagesCount}</div>
      <div>Firebase: {debugInfo.firebaseConnected ? '✅ Connected' : '❌ Error'}</div>
      {debugInfo.lastError && (
        <div style={{ color: '#ef4444', marginTop: '0.5rem' }}>
          Error: {debugInfo.lastError}
        </div>
      )}
      <button 
        onClick={checkSystemStatus}
        style={{
          marginTop: '0.5rem',
          padding: '0.25rem 0.5rem',
          background: '#6c63ff',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.75rem'
        }}
      >
        Refresh
      </button>
    </div>
  );
}




