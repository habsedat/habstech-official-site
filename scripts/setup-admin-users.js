/**
 * HABS TECHNOLOGIES GROUP
 * Admin Users Setup Script
 * 
 * This script helps you set up admin users in Firestore.
 * Run this script to create the initial admin credentials.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "habs-tech-dev.firebaseapp.com",
  projectId: "habs-tech-dev",
  storageBucket: "habs-tech-dev.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Admin users configuration
const adminUsers = [
  {
    email: "admin@habstechnologies.com",
    name: "Admin User",
    password: "HabsTech2024!",
    role: "admin",
    createdAt: new Date().toISOString(),
    lastLogin: null,
    lastPasswordChange: null
  },
  {
    email: "manager@habstechnologies.com", 
    name: "Manager User",
    password: "Manager2024!",
    role: "admin",
    createdAt: new Date().toISOString(),
    lastLogin: null,
    lastPasswordChange: null
  }
  // Add more admin users as needed
];

async function setupAdminUsers() {
  try {
    console.log('Setting up admin users in Firestore...');
    
    // Create the admin credentials document
    await setDoc(doc(db, 'admin', 'credentials'), {
      users: adminUsers,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    console.log('✅ Admin users setup completed successfully!');
    console.log('📋 Created users:');
    adminUsers.forEach(user => {
      console.log(`   - ${user.email} (${user.name})`);
    });
    console.log('\n🔐 Default passwords:');
    adminUsers.forEach(user => {
      console.log(`   - ${user.email}: ${user.password}`);
    });
    console.log('\n⚠️  Remember to change these passwords after first login!');
    
  } catch (error) {
    console.error('❌ Error setting up admin users:', error);
  }
}

// Run the setup
setupAdminUsers();










