/**
 * HABS TECHNOLOGIES GROUP
 * Authentication Service for Multi-Project User Management
 */

import { 
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configurations for both projects
const FIREBASE_CONFIGS = {
  dev: {
    apiKey: "AIzaSyDsXn2xKaqadvv-bEACRZgnvqndCbGvqIM",
    authDomain: "habs-tech-dev.firebaseapp.com",
    projectId: "habs-tech-dev",
    storageBucket: "habs-tech-dev.firebasestorage.app",
    messagingSenderId: "1039476078807",
    appId: "1:1039476078807:web:31794b577882e39dbf9892",
    measurementId: "G-VKL6TP4MBV"
  },
  prod: {
    apiKey: "AIzaSyDsXn2xKaqadvv-bEACRZgnvqndCbGvqIM", // You'll need to get the prod API key
    authDomain: "habs-tech-prod.firebaseapp.com",
    projectId: "habs-tech-prod",
    storageBucket: "habs-tech-prod.firebasestorage.app",
    messagingSenderId: "1039476078807", // You'll need to get the prod sender ID
    appId: "1:1039476078807:web:31794b577882e39dbf9892", // You'll need to get the prod app ID
    measurementId: "G-VKL6TP4MBV" // You'll need to get the prod measurement ID
  }
};

// Initialize Firebase apps for both projects
const devApp = initializeApp(FIREBASE_CONFIGS.dev, 'dev');
const prodApp = initializeApp(FIREBASE_CONFIGS.prod, 'prod');

// Get auth instances
const devAuth = getAuth(devApp);
const prodAuth = getAuth(prodApp);

/**
 * Create user in Firebase Authentication for both projects
 */
export async function createUserInBothProjects(userData) {
  const { email, password, name, role } = userData;
  
  try {
    // For now, create user only in dev project to avoid production issues
    const devUserCredential = await createUserWithEmailAndPassword(devAuth, email, password);
    await updateProfile(devUserCredential.user, {
      displayName: name
    });

    return {
      success: true,
      devUid: devUserCredential.user.uid,
      prodUid: null, // Will be null until prod project is properly configured
      message: 'User created successfully in dev project'
    };
  } catch (error) {
    console.error('Error creating user:', error);
    
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
}

/**
 * Create user in specific project
 */
export async function createUserInProject(project, userData) {
  const { email, password, name } = userData;
  const auth = project === 'dev' ? devAuth : prodAuth;
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name
    });

    return {
      success: true,
      uid: userCredential.user.uid,
      message: `User created successfully in ${project} project`
    };
  } catch (error) {
    console.error(`Error creating user in ${project}:`, error);
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
}

/**
 * Test login credentials for a user
 */
export async function testUserLogin(project, email, password) {
  const auth = project === 'dev' ? devAuth : prodAuth;
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await signOut(auth); // Sign out after testing
    return {
      success: true,
      uid: userCredential.user.uid,
      message: 'Login test successful'
    };
  } catch (error) {
    console.error(`Login test failed for ${project}:`, error);
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
}

// Note: Email checking removed to prevent 400 errors from dummy password attempts

/**
 * Get auth error message
 */
export function getAuthErrorMessage(errorCode) {
  const errors = {
    'auth/email-already-in-use': 'This email is already registered in Firebase Authentication. Please use a different email address.',
    'auth/invalid-email': 'Invalid email address format.',
    'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/invalid-credential': 'Invalid credentials provided.',
    'auth/account-exists-with-different-credential': 'An account already exists with the same email address but different sign-in credentials.',
  };
  
  return errors[errorCode] || 'An error occurred. Please try again.';
}
