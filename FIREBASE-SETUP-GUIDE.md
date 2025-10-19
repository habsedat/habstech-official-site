# Firebase Setup Guide for habs-tech-dev

## 🔧 **Step 1: Get Firebase Configuration**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **habs-tech-dev**
3. Click on the gear icon ⚙️ → Project Settings
4. Scroll down to "Your apps" section
5. If you don't have a web app, click "Add app" → Web (</>) → Register app
6. Copy the configuration object

## 🔧 **Step 2: Create Environment File**

Create a file called `.env.local` in your project root with this content:

```env
# HABS TECHNOLOGIES GROUP - Firebase Configuration
# Project: habs-tech-dev

# Firebase Configuration (replace with your actual values)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=habs-tech-dev.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=habs-tech-dev
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=habs-tech-dev.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id-here
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id-here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id-here

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=admin@habstechnologies.com
NEXT_PUBLIC_ADMIN_PASSWORD=your-admin-password-here
```

## 🔧 **Step 3: Enable Firebase Services**

In your Firebase Console for habs-tech-dev:

1. **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable Email/Password
   - Add your admin email

2. **Firestore Database**:
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules (see firestore.rules file)

3. **Storage**:
   - Go to Storage
   - Get started
   - Set up security rules (see storage.rules file)

## 🔧 **Step 4: Deploy Firebase Rules**

Run these commands in your project directory:

```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Deploy rules
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

## 🔧 **Step 5: Test the Setup**

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3001/admin/login`
3. Try logging in with your admin credentials
4. If successful, you can now use the image assignment system

## 🎯 **What the Image Assignment System Does**

The system I created allows you to:

1. **Upload Images**: Go to `/admin/media` and upload images
2. **Assign Images Visually**: Go to `/admin/image-assignment` and click on website sections to assign images
3. **See Results**: Images automatically appear on your public website

### **Simple Workflow:**
1. Upload an image in the admin dashboard
2. Go to the visual assignment page
3. Click on the image you want to assign
4. Click on the website section where you want it to appear
5. The image automatically shows up on your public website

This replaces the need to hardcode image paths or manually edit code.

## 🚨 **If You're Still Confused**

The system is designed to be simple:
- **Upload** → **Click to Assign** → **Done**

No technical knowledge required. Just visual clicking to assign images to website sections.

Would you like me to walk you through it step by step once you have Firebase set up?



