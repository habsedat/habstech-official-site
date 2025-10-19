/**
 * HABS TECHNOLOGIES GROUP
 * Fix Video Thumbnail Script - Generate proper thumbnail for existing video
 */

require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

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

async function fixVideoThumbnail() {
  console.log('🔧 Fixing video thumbnail...');
  
  try {
    // Get all media documents
    const mediaRef = collection(db, 'media');
    const mediaSnapshot = await getDocs(mediaRef);
    
    for (const docSnapshot of mediaSnapshot.docs) {
      const data = docSnapshot.data();
      const docId = docSnapshot.id;
      
      // Check if this is the problematic video
      if (data.name === 'H E Intro.mp4' && data.type === 'video') {
        console.log(`\n🎬 Found problematic video: ${data.name}`);
        console.log(`   Current thumbnail: ${data.thumbnail}`);
        console.log(`   Current publicUrl: ${data.publicUrl}`);
        
        // Create a default video thumbnail (base64 encoded)
        const defaultThumbnail = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMWUyOTNiIi8+CjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiMzMzQxNTUiIHJ4PSI4Ii8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjkwIiByPSI0MCIgZmlsbD0iIzZjNjNmZiIgZmlsbC1vcGFjaXR5PSIwLjkiLz4KPHBhdGggZD0iTTE0MCA4MEwxODAgMTIwTDE0MCAxNjBWMjBaIiBmaWxsPSJ3aGl0ZSIvPgo8dGV4dCB4PSIxNjAiIHk9IjE0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjY2JkNWUxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WaWRlbzwvdGV4dD4KPC9zdmc+';
        
        // Update the video document
        await updateDoc(doc(db, 'media', docId), {
          thumbnail: defaultThumbnail,
          publicUrl: data.firebaseUrl, // Use Firebase URL as public URL
          publicPath: data.firebaseUrl, // Use Firebase URL as public path
          updatedAt: new Date(),
          updatedBy: 'fix-script'
        });
        
        console.log(`   ✅ Fixed thumbnail and public URLs`);
        console.log(`   New thumbnail: ${defaultThumbnail.substring(0, 50)}...`);
        console.log(`   New publicUrl: ${data.firebaseUrl}`);
        
        console.log(`\n🎉 Video thumbnail fixed successfully!`);
        return;
      }
    }
    
    console.log(`\nℹ️ No problematic video found to fix`);
    
  } catch (error) {
    console.error('❌ Error fixing video thumbnail:', error);
  }
}

// Run the fix
fixVideoThumbnail();


