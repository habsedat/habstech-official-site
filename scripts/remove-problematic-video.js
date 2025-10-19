/**
 * HABS TECHNOLOGIES GROUP
 * Remove Problematic Video Script - Delete video with blob URL completely
 */

require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, deleteDoc } = require('firebase/firestore');
const { getStorage, ref, deleteObject } = require('firebase/storage');

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
const storage = getStorage(app);

async function removeProblematicVideo() {
  console.log('🗑️ Removing problematic video...');
  
  try {
    // Get all media documents
    const mediaRef = collection(db, 'media');
    const mediaSnapshot = await getDocs(mediaRef);
    
    console.log(`📊 Found ${mediaSnapshot.size} media items`);
    
    for (const docSnapshot of mediaSnapshot.docs) {
      const data = docSnapshot.data();
      const docId = docSnapshot.id;
      
      console.log(`\n🎬 Checking: ${data.name} (${docId})`);
      
      // Check if this is the problematic video
      if (data.name === 'H E Intro.mp4' && (data.thumbnail?.startsWith('blob:') || data.publicUrl === null)) {
        console.log(`   ❌ Found problematic video with blob URL or null publicUrl`);
        console.log(`   🔗 Firebase URL: ${data.firebaseUrl}`);
        console.log(`   🖼️ Thumbnail: ${data.thumbnail}`);
        console.log(`   📁 Public URL: ${data.publicUrl}`);
        
        // Delete from Firebase Storage
        if (data.firebasePath) {
          try {
            const videoRef = ref(storage, data.firebasePath);
            await deleteObject(videoRef);
            console.log(`   ✅ Deleted video from Firebase Storage`);
          } catch (error) {
            console.log(`   ⚠️ Could not delete from Storage: ${error.message}`);
          }
        }
        
        // Delete from Firestore
        try {
          await deleteDoc(doc(db, 'media', docId));
          console.log(`   ✅ Deleted video from Firestore database`);
          console.log(`\n🎉 Problematic video removed successfully!`);
          console.log(`   You can now re-upload the video and it will work properly.`);
          return;
        } catch (error) {
          console.log(`   ❌ Could not delete from Firestore: ${error.message}`);
        }
      } else {
        console.log(`   ℹ️ This video is fine, skipping`);
      }
    }
    
    console.log(`\nℹ️ No problematic video found to remove`);
    
  } catch (error) {
    console.error('❌ Error removing problematic video:', error);
  }
}

// Run the removal
removeProblematicVideo();


