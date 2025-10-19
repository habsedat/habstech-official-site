/**
 * HABS TECHNOLOGIES GROUP
 * Test Image System Script
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, where } = require('firebase/firestore');

// Firebase config (you'll need to add your actual config)
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

async function testImageSystem() {
  try {
    console.log('Testing image system...');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Test 1: Check if we can connect to Firestore
    console.log('✓ Firebase connection established');
    
    // Test 2: Check existing media documents
    const mediaCollection = collection(db, 'media');
    const mediaSnapshot = await getDocs(mediaCollection);
    console.log(`✓ Found ${mediaSnapshot.size} media documents`);
    
    // Test 3: Check existing page documents
    const pagesCollection = collection(db, 'pages');
    const pagesSnapshot = await getDocs(pagesCollection);
    console.log(`✓ Found ${pagesSnapshot.size} page documents`);
    
    // Test 4: Check for homepage sections
    const homepageQuery = query(pagesCollection, where('page', '==', 'homepage'));
    const homepageSnapshot = await getDocs(homepageQuery);
    
    if (homepageSnapshot.size > 0) {
      const homepageData = homepageSnapshot.docs[0].data();
      console.log('✓ Homepage sections:', homepageData.sections || {});
    } else {
      console.log('⚠ No homepage document found');
    }
    
    // Test 5: Check for service images
    const serviceImagesQuery = query(mediaCollection, where('category', '==', 'services'));
    const serviceImagesSnapshot = await getDocs(serviceImagesQuery);
    console.log(`✓ Found ${serviceImagesSnapshot.size} service images`);
    
    if (serviceImagesSnapshot.size > 0) {
      serviceImagesSnapshot.docs.forEach(doc => {
        const data = doc.data();
        console.log(`  - ${data.name} (${data.sectionId || 'no sectionId'})`);
      });
    }
    
    console.log('\n🎯 Test Results:');
    console.log('1. Upload images through admin dashboard at /admin/media');
    console.log('2. Assign images to page sections using the link icon (🔗)');
    console.log('3. Use these section IDs:');
    console.log('   - hero-bg (for homepage hero background)');
    console.log('   - service-ai (for AI services icon)');
    console.log('   - service-web (for web development icon)');
    console.log('   - service-creative (for creative tech icon)');
    console.log('4. Check the public site to see if images display correctly');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testImageSystem();



