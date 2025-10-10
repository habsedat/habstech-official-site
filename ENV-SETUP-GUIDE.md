# Environment Variables Setup Guide

## 🔐 Create Your `.env.local` File

Since `.env.local` files are protected for security, you need to create this file manually.

### Step 1: Create the File

In the `habs-technologies` folder, create a new file named exactly `.env.local`

### Step 2: Copy This Content

Copy and paste the following content into your `.env.local` file:

```env
# ============================================
# HABS TECHNOLOGIES GROUP - ENVIRONMENT CONFIGURATION
# DEV Environment
# ============================================
# IMPORTANT: Never commit this file to version control
# This file contains sensitive credentials for Firebase

# ============================================
# FIREBASE CONFIGURATION (Client-side - Public)
# ============================================
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDsXn2xKaqadvv-bEACRZgnvqndCbGvqIM
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=habs-tech-dev.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=habs-tech-dev
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=habs-tech-dev.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1039476078807
NEXT_PUBLIC_FIREBASE_APP_ID=1:1039476078807:web:31794b577882e39dbf9892
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-VKL6TP4MBV

# ============================================
# FIREBASE ADMIN SDK (Server-side - Private)
# ============================================
# TODO: Add these later when you need server-side Firebase features
# FIREBASE_ADMIN_PROJECT_ID=habs-tech-dev
# FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@habs-tech-dev.iam.gserviceaccount.com
# FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"

# ============================================
# SITE CONFIGURATION
# ============================================
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ============================================
# OPTIONAL: Email Configuration (Future)
# ============================================
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USER=
# SMTP_PASSWORD=
# CONTACT_EMAIL=info@habstechnologies.com
```

### Step 3: Save the File

Save the file as `.env.local` (with the dot at the beginning)

### Step 4: Verify

The file should be:
- Location: `habs-technologies/.env.local`
- Hidden from Git (automatically ignored)
- Contains all the Firebase credentials above

---

## ✅ You're Done!

Once you've created this file, you can run:

```bash
npm run dev
```

And your application will connect to your Firebase DEV project!

---

## 🔄 Later: Production Configuration

When you're ready to deploy, we'll create separate environment variables for your production Firebase project.


