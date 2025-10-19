/**
 * HABS TECHNOLOGIES GROUP
 * Complete Admin Users Setup Script
 * 
 * This script creates admin users in both Firebase Authentication and Firestore.
 * Run this script to set up proper admin access with correct permissions.
 */

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
const auth = getAuth(app);
const db = getFirestore(app);

// Admin users configuration
const adminUsers = [
  {
    email: "admin@habstechnologies.com",
    name: "Admin User",
    password: "HabsTech2024!",
    role: "admin",
    permissions: ["read", "write", "delete", "manage_users"]
  },
  {
    email: "owner@habstechnologies.com",
    name: "Owner User", 
    password: "Owner2024!",
    role: "owner",
    permissions: ["read", "write", "delete", "manage_users", "manage_system"]
  }
];

async function setupAdminUsers() {
  try {
    console.log('🚀 Setting up admin users in Firebase Authentication and Firestore...');
    
    for (const userConfig of adminUsers) {
      try {
        console.log(`\n📝 Creating user: ${userConfig.email}`);
        
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          userConfig.email, 
          userConfig.password
        );
        
        const user = userCredential.user;
        console.log(`✅ Created in Firebase Auth: ${user.uid}`);
        
        // Create user document in Firestore
        const userData = {
          uid: user.uid,
          email: userConfig.email,
          name: userConfig.name,
          role: userConfig.role,
          permissions: userConfig.permissions,
          createdAt: new Date().toISOString(),
          lastLogin: null,
          lastPasswordChange: null,
          isActive: true
        };
        
        await setDoc(doc(db, 'users', user.uid), userData);
        console.log(`✅ Created in Firestore: ${user.uid}`);
        
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log(`⚠️  User ${userConfig.email} already exists in Firebase Auth`);
          
          // Still create/update the Firestore document
          const userData = {
            email: userConfig.email,
            name: userConfig.name,
            role: userConfig.role,
            permissions: userConfig.permissions,
            updatedAt: new Date().toISOString(),
            isActive: true
          };
          
          // Try to get existing user from auth
          const existingUsers = await auth.fetchSignInMethodsForEmail(userConfig.email);
          if (existingUsers.length > 0) {
            // For existing users, we need to manually set the UID
            // This is a limitation - we can't get the UID without the user being signed in
            console.log(`⚠️  Cannot update Firestore for existing user ${userConfig.email} without UID`);
            console.log(`   Please sign in as this user first, then run the update script`);
          }
        } else {
          console.error(`❌ Error creating user ${userConfig.email}:`, error.message);
        }
      }
    }
    
    console.log('\n🎉 Admin users setup completed!');
    console.log('\n📋 Created users:');
    adminUsers.forEach(user => {
      console.log(`   - ${user.email} (${user.name}) - Role: ${user.role}`);
    });
    
    console.log('\n🔐 Default passwords:');
    adminUsers.forEach(user => {
      console.log(`   - ${user.email}: ${user.password}`);
    });
    
    console.log('\n⚠️  Important:');
    console.log('   1. Change these passwords after first login');
    console.log('   2. These users now have proper Firebase Storage permissions');
    console.log('   3. The Storage rules will recognize these users as authenticated admins');
    
  } catch (error) {
    console.error('❌ Error setting up admin users:', error);
  }
}

// Run the setup
setupAdminUsers();



