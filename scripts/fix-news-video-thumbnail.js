/**
 * HABS TECHNOLOGIES GROUP
 * Fix News Video Thumbnail Script - Update existing news articles with video thumbnails
 */

require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc } = require('firebase/firestore');

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixNewsVideoThumbnails() {
  console.log('🔧 Fixing news video thumbnails...');
  
  try {
    // Get all news documents
    const newsRef = collection(db, 'news');
    const newsSnapshot = await getDocs(newsRef);
    
    console.log(`📊 Found ${newsSnapshot.size} news articles`);
    
    for (const docSnapshot of newsSnapshot.docs) {
      const data = docSnapshot.data();
      const docId = docSnapshot.id;
      
      console.log(`\n📰 Checking: ${data.title} (${docId})`);
      console.log(`   Featured Image: ${data.featuredImage}`);
      console.log(`   Current Thumbnail: ${data.featuredImageThumbnail || 'none'}`);
      
      // Check if this is a video article without a thumbnail
      const isVideo = data.featuredImage && (
        data.featuredImage.includes('.mp4') || 
        data.featuredImage.includes('.webm') || 
        data.featuredImage.includes('.avi') || 
        data.featuredImage.includes('.mov') ||
        data.featuredImage.includes('video/') ||
        data.featuredImage.includes('firebasestorage') && data.featuredImage.includes('.mp4')
      );
      
      if (isVideo && !data.featuredImageThumbnail) {
        console.log(`   ✅ Found video article without thumbnail`);
        
        // Try to generate a thumbnail URL from the video URL
        let thumbnailUrl = null;
        
        if (data.featuredImage.includes('firebasestorage')) {
          // For Firebase Storage URLs, try to create a thumbnail URL
          // Replace the video file extension with _thumb.jpg
          thumbnailUrl = data.featuredImage
            .replace('.mp4', '_thumb.jpg')
            .replace('.webm', '_thumb.jpg')
            .replace('.avi', '_thumb.jpg')
            .replace('.mov', '_thumb.jpg');
        } else {
          // For other URLs, try the same approach
          thumbnailUrl = data.featuredImage
            .replace('.mp4', '_thumb.jpg')
            .replace('.webm', '_thumb.jpg')
            .replace('.avi', '_thumb.jpg')
            .replace('.mov', '_thumb.jpg');
        }
        
        console.log(`   🖼️ Generated thumbnail URL: ${thumbnailUrl}`);
        
        // Update the news article with the thumbnail
        try {
          await updateDoc(doc(db, 'news', docId), {
            featuredImageThumbnail: thumbnailUrl
          });
          console.log(`   ✅ Updated news article with thumbnail`);
        } catch (error) {
          console.log(`   ❌ Could not update news article: ${error.message}`);
        }
      } else if (isVideo && data.featuredImageThumbnail) {
        console.log(`   ℹ️ Video article already has thumbnail`);
      } else {
        console.log(`   ℹ️ Not a video article, skipping`);
      }
    }
    
    console.log(`\n🎉 News video thumbnail fix completed!`);
    
  } catch (error) {
    console.error('❌ Error fixing news video thumbnails:', error);
  }
}

// Run the fix
fixNewsVideoThumbnails();


