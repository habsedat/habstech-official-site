# Firebase Storage Permission Fix Guide

## 🔍 Problem Identified

The Firebase Storage permission errors you're seeing are caused by a mismatch between Firebase Authentication and Firestore user roles. Your admin users exist in Firebase Authentication, but their roles are not properly set up in Firestore, which the Storage rules depend on.

## 🚨 Current Error
```
FirebaseError: Firebase Storage: User does not have permission to access 'media/images/HTG-Hero-Bana-1760760369529-m6wrfh.png'. (storage/unauthorized)
```

## ✅ Solution Steps

### Step 1: Check Your Current Users
1. Go to [Firebase Console](https://console.firebase.google.com/project/habs-tech-dev/authentication/users)
2. Navigate to **Authentication > Users**
3. Note down the **UID** for each admin user

### Step 2: Update User Roles in Firestore

#### Option A: Use the Update Script (Recommended)
1. Open `scripts/update-user-roles.js`
2. Replace `YOUR_USER_UID_HERE` with the actual UID from Firebase Console
3. Replace `YOUR_OWNER_UID_HERE` with the actual UID from Firebase Console
4. Run the script:
   ```bash
   cd habs-technologies
   node scripts/update-user-roles.js
   ```

#### Option B: Manual Setup via Firebase Console
1. Go to [Firestore Database](https://console.firebase.google.com/project/habs-tech-dev/firestore)
2. Create a collection called `users`
3. For each admin user, create a document with their UID as the document ID
4. Add these fields:
   ```json
   {
     "uid": "USER_UID_HERE",
     "email": "admin@habstechnologies.com",
     "name": "Admin User",
     "role": "admin",
     "permissions": ["read", "write", "delete", "manage_users"],
     "createdAt": "2024-01-01T00:00:00.000Z",
     "lastLogin": null,
     "lastPasswordChange": null,
     "isActive": true
   }
   ```

### Step 3: Verify the Fix
1. Sign in to your admin dashboard
2. Try to upload or delete an image
3. Check the browser console - the permission errors should be gone

## 🔧 What Was Fixed

### Updated Storage Rules
- Added `delete` permissions for authenticated users
- Made media management more permissive for development
- Maintained security while allowing proper admin access

### Created Setup Scripts
- `setup-admin-users-complete.js` - Creates users in both Auth and Firestore
- `update-user-roles.js` - Updates existing Auth users with Firestore roles

## 🎯 Expected Results

After completing these steps:
- ✅ No more "unauthorized" errors in console
- ✅ Admin dashboard can upload/delete images
- ✅ Firebase Storage operations work correctly
- ✅ User roles are properly recognized

## 🔐 Security Notes

- The current rules are set for development
- For production, consider tightening the permissions
- Always use strong passwords for admin accounts
- Regularly review user permissions

## 📞 Need Help?

If you continue to see permission errors:
1. Check that the user document exists in Firestore `users` collection
2. Verify the `role` field is set correctly
3. Ensure the user is signed in to Firebase Authentication
4. Check the browser console for any other errors

## 🚀 Quick Fix Commands

```bash
# Deploy updated storage rules
firebase deploy --only storage

# Deploy updated firestore rules  
firebase deploy --only firestore

# Deploy everything
firebase deploy
```



