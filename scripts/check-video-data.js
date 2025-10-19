/**
 * HABS TECHNOLOGIES GROUP
 * Check Video Data Script - Debug video thumbnail issues
 */

require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

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

async function checkVideoData() {
  console.log('🔍 Checking video data...');
  
  try {
    // Get all media documents
    const mediaRef = collection(db, 'media');
    const mediaSnapshot = await getDocs(mediaRef);
    
    console.log(`📊 Found ${mediaSnapshot.size} media items`);
    
    for (const docSnapshot of mediaSnapshot.docs) {
      const data = docSnapshot.data();
      const docId = docSnapshot.id;
      
      console.log(`\n🎬 Media Item: ${data.name} (${docId})`);
      console.log(`   Type: ${data.type || 'unknown'}`);
      console.log(`   Content Type: ${data.contentType || 'unknown'}`);
      console.log(`   Firebase URL: ${data.firebaseUrl || 'none'}`);
      console.log(`   Public URL: ${data.publicUrl || 'none'}`);
      console.log(`   Thumbnail: ${data.thumbnail || 'none'}`);
      console.log(`   Public Path: ${data.publicPath || 'none'}`);
      
      if (data.type === 'video' || data.contentType?.startsWith('video/')) {
        console.log(`   ✅ This is a video file`);
        
        if (!data.thumbnail || data.thumbnail.startsWith('blob:')) {
          console.log(`   ❌ PROBLEM: No proper thumbnail or blob URL`);
        } else {
          console.log(`   ✅ Thumbnail looks good`);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking video data:', error);
  }
}

// Run the check
checkVideoData();


