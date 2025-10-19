/**
 * HABS TECHNOLOGIES GROUP
 * Setup User Document Script
 * Creates a user document in Firestore for the existing admin user
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// User ID from the exported users.json
const userId = "KkBRh0Viy7ccliJMBLjFEqupm1q1";
const userEmail = "habmfk@gmail.com";

async function setupUserDocument() {
  try {
    console.log('Setting up user document in Firestore...');
    
    // Create the user document
    await setDoc(doc(db, 'users', userId), {
      uid: userId,
      email: userEmail,
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null,
      permissions: {
        canManageUsers: true,
        canManageContent: true,
        canManageMedia: true,
        canViewAnalytics: true,
        canManageSettings: true
      }
    });
    
    console.log('✅ User document created successfully!');
    console.log(`📋 User: ${userEmail}`);
    console.log(`🆔 UID: ${userId}`);
    console.log(`👤 Role: admin`);
    console.log('\n🔐 You can now login and upload images!');
    
  } catch (error) {
    console.error('❌ Error setting up user document:', error);
  }
}

// Run the setup
setupUserDocument();
