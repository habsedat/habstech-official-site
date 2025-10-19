/**
 * HABS TECHNOLOGIES GROUP
 * Fix Video Data Script - Update existing video URLs
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

async function fixVideoData() {
  console.log('🔧 Starting video data fix...');
  
  try {
    // Get all media documents
    const mediaRef = collection(db, 'media');
    const mediaSnapshot = await getDocs(mediaRef);
    
    console.log(`📊 Found ${mediaSnapshot.size} media items`);
    
    let fixedCount = 0;
    
    for (const docSnapshot of mediaSnapshot.docs) {
      const data = docSnapshot.data();
      const docId = docSnapshot.id;
      
      console.log(`\n🎬 Processing: ${data.name} (${docId})`);
      console.log(`   Type: ${data.type || 'unknown'}`);
      console.log(`   Firebase URL: ${data.firebaseUrl || 'none'}`);
      console.log(`   Thumbnail: ${data.thumbnail || 'none'}`);
      
      // Check if this is a video with blob URL
      if (data.type === 'video' || data.contentType?.startsWith('video/')) {
        console.log(`   ✅ This is a video file`);
        
        // Check if thumbnail is a blob URL
        if (data.thumbnail && data.thumbnail.startsWith('blob:')) {
          console.log(`   🔧 Fixing blob thumbnail URL...`);
          
          // Update the document to remove the blob thumbnail
          await updateDoc(doc(db, 'media', docId), {
            thumbnail: null, // Remove blob URL
            updatedAt: new Date(),
            updatedBy: 'fix-script'
          });
          
          console.log(`   ✅ Fixed thumbnail URL for ${data.name}`);
          fixedCount++;
        } else {
          console.log(`   ℹ️  Thumbnail URL is already correct`);
        }
      } else {
        console.log(`   ℹ️  This is an image file, skipping`);
      }
    }
    
    console.log(`\n🎉 Video data fix complete!`);
    console.log(`   Fixed ${fixedCount} video items`);
    
  } catch (error) {
    console.error('❌ Error fixing video data:', error);
  }
}

// Run the fix
fixVideoData();


