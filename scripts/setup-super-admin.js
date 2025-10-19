require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const { getAuth, createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');

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
const auth = getAuth(app);

async function setupSuperAdmin() {
  try {
    console.log('Setting up super admin...');
    
    // Create super admin user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'admin@habstech.com', 
      'Admin123!'
    );
    
    // Update profile
    await updateProfile(userCredential.user, {
      displayName: 'Super Admin'
    });
    
    console.log('Super admin created in Firebase Auth:', userCredential.user.uid);
    
    // Create user document in Firestore with super_admin role
    const userData = {
      name: 'Super Admin',
      email: 'admin@habstech.com',
      role: 'super_admin',
      status: 'active',
      phone: '',
      department: 'Administration',
      notes: 'Initial super admin user',
      devUid: userCredential.user.uid,
      prodUid: null,
      createdAt: new Date(),
      createdBy: 'system',
      updatedAt: new Date(),
      updatedBy: 'system'
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    
    console.log('Super admin document created in Firestore');
    console.log('✅ Super admin setup complete!');
    console.log('Email: admin@habstech.com');
    console.log('Password: Admin123!');
    console.log('Role: super_admin');
    
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Super admin already exists. Updating role...');
      
      // If user exists, we need to sign in and update their role
      // This is a simplified approach - in production you'd handle this differently
      console.log('Please manually update the user role in Firestore to "super_admin"');
    } else {
      console.error('Error setting up super admin:', error);
    }
  }
}

// Run the setup
setupSuperAdmin();
