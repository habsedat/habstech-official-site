/**
 * HABS TECHNOLOGIES GROUP
 * Update News Thumbnail Script - Manually update news article with thumbnail
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

async function updateNewsThumbnail() {
  console.log('🔧 Updating news article thumbnail...');
  
  try {
    // Get all news documents
    const newsRef = collection(db, 'news');
    const newsSnapshot = await getDocs(newsRef);
    
    console.log(`📊 Found ${newsSnapshot.size} news articles`);
    
    for (const docSnapshot of newsSnapshot.docs) {
      const data = docSnapshot.data();
      const docId = docSnapshot.id;
      
      console.log(`\n📰 Checking: ${data.title || 'Untitled'} (${docId})`);
      console.log(`   Featured Image: ${data.featuredImage}`);
      
      // Check if this is the video article
      if (data.featuredImage && data.featuredImage.includes('.mp4') && data.featuredImage.includes('firebasestorage')) {
        console.log(`   ✅ Found the video article`);
        
        // Create a proper thumbnail URL
        const videoUrl = data.featuredImage;
        const thumbnailUrl = videoUrl.replace('.mp4', '_thumb.jpg');
        
        console.log(`   🖼️ Video URL: ${videoUrl}`);
        console.log(`   🖼️ Thumbnail URL: ${thumbnailUrl}`);
        
        // Update the news article with the thumbnail
        try {
          await updateDoc(doc(db, 'news', docId), {
            featuredImageThumbnail: thumbnailUrl
          });
          console.log(`   ✅ Updated news article with thumbnail URL`);
          console.log(`   🎉 News article now has proper thumbnail!`);
          return;
        } catch (error) {
          console.log(`   ❌ Could not update news article: ${error.message}`);
        }
      }
    }
    
    console.log(`\nℹ️ No video article found to update`);
    
  } catch (error) {
    console.error('❌ Error updating news thumbnail:', error);
  }
}

// Run the update
updateNewsThumbnail();
