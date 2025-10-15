# Quick Setup Guide — Habs Technologies Group

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd habs-technologies
npm install
```

### Step 2: Create Environment File
Create `.env.local` in the root directory:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development
```

### Step 3: Run Development Server
```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📝 Before First Deployment

### 1. Create Firebase Projects
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create two projects:
  - `habs-tech-dev` (Development)
  - `habs-tech-prod` (Production)
- Enable services:
  - ✅ Authentication
  - ✅ Firestore Database
  - ✅ Storage
  - ✅ Hosting

### 2. Get Firebase Credentials
1. Project Settings → General
2. Scroll to "Your apps" → Web app
3. Copy configuration values
4. Add to `.env.local`

### 3. Deploy Security Rules
```bash
firebase login
firebase use habs-tech-prod
firebase deploy --only firestore:rules
firebase deploy --only storage
```

### 4. Create First Admin User
1. Enable Email/Password auth in Firebase Console
2. Create a user in Authentication
3. Add user document in Firestore `users` collection:
   ```json
   {
     "displayName": "Your Name",
     "email": "admin@habstechnologies.com",
     "role": "owner",
     "status": "active"
   }
   ```

### 5. Test Admin Access
- Navigate to: `http://localhost:3000/admin/dashboard`
- Log in with admin credentials

---

## ✅ Verification Checklist

- [ ] Dependencies installed successfully
- [ ] `.env.local` created with Firebase credentials
- [ ] Dev server runs without errors
- [ ] Homepage displays correctly
- [ ] Navigation works (all menu items)
- [ ] Forms render (Contact, Application)
- [ ] Admin dashboard accessible
- [ ] Firestore rules deployed
- [ ] Storage rules deployed

---

## 🆘 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Firebase errors
```bash
# Reinstall Firebase
npm uninstall firebase firebase-admin
npm install firebase firebase-admin
```

### Build errors
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📚 Next Steps

1. **Read full README:** See `README.md` for complete documentation
2. **Review deployment guide:** See `DEPLOYMENT.md` for production deploy
3. **Customize content:** Update pages in `screens/` folder
4. **Add branding:** Replace placeholder images in `public/`
5. **Configure emails:** Set up transactional emails for forms

---

## 🎯 Key Directories

- **`app/`** — Next.js pages and routes
- **`screens/`** — Page implementations
- **`components/`** — Reusable UI components
- **`lib/`** — Firebase utilities
- **`styles/`** — Global styles

---

## 📞 Need Help?

- **Documentation:** `README.md`, `DEPLOYMENT.md`
- **Issues:** Check error messages in terminal
- **Support:** dev@habstechnologies.com

---

**You're all set! Start building.** 🚀













