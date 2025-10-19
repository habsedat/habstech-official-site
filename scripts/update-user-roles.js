/**
 * HABS TECHNOLOGIES GROUP
 * Update User Roles Script
 * 
 * This script updates existing Firebase Auth users with proper roles in Firestore.
 * Use this if you already have users in Firebase Auth but need to add their roles to Firestore.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsXn2xKaqadvv-bEACRZgnvqndCbGvqIM",
  authDomain: "habs-tech-dev.firebaseapp.com",
  projectId: "habs-tech-dev",
  storageBucket: "habs-tech-dev.firebasestorage.app",
  messagingSenderId: "1039476078807",
  appId: "1:1039476078807:web:31794b577882e39dbf9892",
  measurementId: "G-VKL6TP4MBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// User roles to update (you'll need to get the UIDs from Firebase Console)
const userRoles = [
  {
    uid: "YOUR_USER_UID_HERE", // Replace with actual UID from Firebase Console
    email: "admin@habstechnologies.com",
    name: "Admin User",
    role: "admin",
    permissions: ["read", "write", "delete", "manage_users"]
  },
  {
    uid: "YOUR_OWNER_UID_HERE", // Replace with actual UID from Firebase Console
    email: "owner@habstechnologies.com", 
    name: "Owner User",
    role: "owner",
    permissions: ["read", "write", "delete", "manage_users", "manage_system"]
  }
];

async function updateUserRoles() {
  try {
    console.log('🔄 Updating user roles in Firestore...');
    
    for (const userConfig of userRoles) {
      if (userConfig.uid === "YOUR_USER_UID_HERE" || userConfig.uid === "YOUR_OWNER_UID_HERE") {
        console.log(`⚠️  Please update the UID for ${userConfig.email} in the script`);
        continue;
      }
      
      try {
        console.log(`\n📝 Updating user: ${userConfig.email} (${userConfig.uid})`);
        
        // Check if user document exists
        const userDoc = await getDoc(doc(db, 'users', userConfig.uid));
        
        const userData = {
          uid: userConfig.uid,
          email: userConfig.email,
          name: userConfig.name,
          role: userConfig.role,
          permissions: userConfig.permissions,
          updatedAt: new Date().toISOString(),
          isActive: true
        };
        
        if (userDoc.exists()) {
          // Update existing document
          userData.createdAt = userDoc.data().createdAt; // Preserve original creation date
          userData.lastLogin = userDoc.data().lastLogin; // Preserve last login
          userData.lastPasswordChange = userDoc.data().lastPasswordChange; // Preserve password change date
        } else {
          // Create new document
          userData.createdAt = new Date().toISOString();
          userData.lastLogin = null;
          userData.lastPasswordChange = null;
        }
        
        await setDoc(doc(db, 'users', userConfig.uid), userData);
        console.log(`✅ Updated user role: ${userConfig.role}`);
        
      } catch (error) {
        console.error(`❌ Error updating user ${userConfig.email}:`, error.message);
      }
    }
    
    console.log('\n🎉 User roles update completed!');
    console.log('\n📋 Instructions:');
    console.log('   1. Go to Firebase Console > Authentication > Users');
    console.log('   2. Copy the UID for each user');
    console.log('   3. Update the UIDs in this script');
    console.log('   4. Run this script again');
    console.log('\n🔐 After updating:');
    console.log('   - Users will have proper Firebase Storage permissions');
    console.log('   - Admin dashboard will work correctly');
    console.log('   - No more "unauthorized" errors');
    
  } catch (error) {
    console.error('❌ Error updating user roles:', error);
  }
}

// Run the update
updateUserRoles();



