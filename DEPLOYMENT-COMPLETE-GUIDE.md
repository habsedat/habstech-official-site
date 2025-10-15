# 🚀 Complete Deployment Guide - Habs Technologies

## ✅ Setup Complete Summary

Your Habs Technologies website is now fully configured with **two environments**:

- **DEV (Development)**: `habs-tech-dev` - For testing and development
- **PROD (Production)**: `habs-tech-prod` - For your live website

---

## 🎯 Two Environment Setup

### **Development Environment** 🛠️
- **Project ID**: `habs-tech-dev`
- **Environment File**: `.env.local`
- **URL**: http://localhost:3002 (or 3000)
- **Use for**: Daily development, testing new features, experimenting

### **Production Environment** 🌐
- **Project ID**: `habs-tech-prod`
- **Environment File**: `.env.production`
- **URL**: Your live domain (e.g., habstechnologies.com)
- **Use for**: Live website that customers see

---

## 💻 Daily Development Workflow

### **1. Start Development Server**
```bash
cd "C:\Users\kabia\Desktop\JHK\HABS TECHNOLOGIES GROUP\habs-technologies"
npm run dev
```

Then open: **http://localhost:3002**

### **2. Make Changes**
- Edit files in `screens/`, `components/`, or `app/`
- Changes auto-refresh in browser
- Test everything locally

### **3. Stop Server**
Press `Ctrl + C` in terminal when done

---

## 🔄 Switching Between Projects

### **Switch to DEV** (for development)
```bash
firebase use habs-tech-dev
```

### **Switch to PROD** (for deployment)
```bash
firebase use habs-tech-prod
```

### **Check which project is active**
```bash
firebase use
```

---

## 🚢 How to Deploy to Production

### **When You're Ready to Go Live:**

**Step 1: Build the Production Version**
```bash
npm run build
```

**Step 2: Export Static Files**
```bash
npx next export
```

**Step 3: Switch to Production**
```bash
firebase use habs-tech-prod
```

**Step 4: Deploy to Firebase Hosting**
```bash
firebase deploy --only hosting
```

**Or use the convenient npm script:**
```bash
npm run firebase:deploy:prod
```

This will:
- Build your site
- Export static files
- Switch to production
- Deploy everything

---

## 🎯 Quick Deployment Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build production version |
| `npm run firebase:deploy:dev` | Deploy to DEV |
| `npm run firebase:deploy:prod` | Deploy to PROD |
| `firebase:deploy:rules` | Update security rules only |
| `firebase:deploy:hosting` | Update website only |

---

## 📊 Firebase Console Links

### **Development Project**
- **Dashboard**: https://console.firebase.google.com/project/habs-tech-dev
- **Authentication**: https://console.firebase.google.com/project/habs-tech-dev/authentication
- **Firestore**: https://console.firebase.google.com/project/habs-tech-dev/firestore
- **Storage**: https://console.firebase.google.com/project/habs-tech-dev/storage

### **Production Project**
- **Dashboard**: https://console.firebase.google.com/project/habs-tech-prod
- **Authentication**: https://console.firebase.google.com/project/habs-tech-prod/authentication
- **Firestore**: https://console.firebase.google.com/project/habs-tech-prod/firestore
- **Storage**: https://console.firebase.google.com/project/habs-tech-prod/storage

---

## 🔐 Creating Admin Users

### **For Development:**
1. Go to: https://console.firebase.google.com/project/habs-tech-dev/authentication
2. Click "Add user"
3. Enter email and password
4. Go to Firestore: https://console.firebase.google.com/project/habs-tech-dev/firestore
5. Create collection: `users`
6. Add document with the user's UID as document ID:
   ```json
   {
     "displayName": "Your Name",
     "email": "admin@habstechnologies.com",
     "role": "owner",
     "status": "active",
     "createdAt": [Firestore Timestamp - use "Now"]
   }
   ```

### **For Production:**
Repeat the same steps using the production console links above.

### **Admin Roles:**
- **owner**: Full access to everything
- **admin**: Content, applications, media, settings
- **editor**: Content and media only

---

## 🌍 Connecting Your Domain

When you're ready to use your own domain (e.g., habstechnologies.com):

1. Go to Firebase Hosting: https://console.firebase.google.com/project/habs-tech-prod/hosting
2. Click "Add custom domain"
3. Enter your domain name
4. Follow the DNS setup instructions
5. Firebase will provide DNS records to add to your domain registrar
6. Wait for SSL certificate to be automatically provisioned (takes a few minutes)

---

## 🔒 Security Best Practices

### **Environment Files:**
- ✅ `.env.local` - For development (already ignored by Git)
- ✅ `.env.production` - For production (already ignored by Git)
- ❌ **NEVER** commit these files to Git
- ❌ **NEVER** share these files publicly

### **Firebase Projects:**
- ✅ DEV project - Test mode is okay
- ✅ PROD project - Always use production mode
- ✅ Separate projects keep data safe
- ✅ Security rules already deployed

### **Admin Access:**
- ✅ Use strong passwords
- ✅ Enable 2FA on Google accounts
- ✅ Limit admin users to trusted people only
- ✅ Use "owner" role only for yourself

---

## 📝 Before First Public Launch

- [ ] Test all pages work correctly
- [ ] Test contact form submissions
- [ ] Test application form submissions
- [ ] Create admin user in PRODUCTION
- [ ] Test admin dashboard in PRODUCTION
- [ ] Update content (About, Services, etc.)
- [ ] Replace placeholder images
- [ ] Add real case studies
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Run Lighthouse performance test
- [ ] Connect custom domain
- [ ] Test custom domain works
- [ ] Enable Google Analytics (optional)
- [ ] Set up email notifications (optional)

---

## 🆘 Troubleshooting

### **"Firebase not configured" error**
```bash
# Make sure .env.local exists
# Restart dev server
npm run dev
```

### **Changes not showing up**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### **Port already in use**
```bash
# Kill the process
npx kill-port 3000
npm run dev
```

### **Deployment fails**
```bash
# Make sure you're logged in
firebase login --reauth

# Make sure correct project is selected
firebase use habs-tech-prod

# Try again
firebase deploy
```

### **Can't access admin dashboard**
- Make sure you created a user in Firestore `users` collection
- Check the `role` field is set correctly
- Try logging out and back in

---

## 📚 File Structure Reference

```
habs-technologies/
├── .env.local              ← DEV credentials (you have this)
├── .env.production         ← PROD credentials (you have this)
├── .firebaserc             ← Project configuration
├── firebase.json           ← Firebase services config
├── firestore.rules         ← Database security rules
├── storage.rules           ← File storage security rules
├── app/                    ← Next.js pages
├── components/             ← Reusable components
├── screens/                ← Page implementations
├── lib/                    ← Firebase utilities
└── public/                 ← Static assets
```

---

## 🎉 You're All Set!

Your website is now fully configured with:
- ✅ Development environment
- ✅ Production environment
- ✅ Firebase authentication
- ✅ Firestore database
- ✅ Firebase storage
- ✅ Security rules deployed
- ✅ Beautiful Poppins + Merriweather fonts

**Continue developing in DEV, deploy to PROD when ready!**

---

## 📞 Quick Commands Cheatsheet

```bash
# Development
npm run dev                          # Start dev server
firebase use habs-tech-dev           # Switch to DEV

# Production Deployment
npm run build                        # Build production
firebase use habs-tech-prod          # Switch to PROD
firebase deploy --only hosting       # Deploy website

# Or use one command:
npm run firebase:deploy:prod         # Does everything

# Maintenance
firebase deploy --only firestore:rules   # Update database rules
firebase deploy --only storage           # Update storage rules
```

---

**Happy coding! 🚀**










