# 🚀 Quick Start - Get Running in 3 Steps!

## Step 1: Create `.env.local` File ✏️

**In VS Code or your file explorer:**

1. Right-click in the `habs-technologies` folder
2. Select "New File"
3. Name it exactly: `.env.local` (with the dot!)
4. Open `ENV-SETUP-GUIDE.md` and copy all the configuration
5. Paste it into `.env.local`
6. Save the file

**OR use Terminal:**

```bash
cd habs-technologies
```

Then create and edit the file with your preferred editor.

---

## Step 2: Install Dependencies 📦

```bash
npm install
```

This will install all required packages including Firebase.

---

## Step 3: Initialize Firebase CLI 🔥

Run these commands one by one:

```bash
# Login to Firebase
firebase login

# Select your DEV project
firebase use habs-tech-dev

# Deploy Firestore rules (security settings)
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage
```

---

## Step 4: Run Development Server 🎉

```bash
npm run dev
```

Then open your browser to: **http://localhost:3000**

---

## 🎯 What You Should See

✅ Homepage loads with your branding  
✅ Navigation menu works  
✅ All pages display correctly  
✅ No Firebase errors in console  

---

## ⚠️ First Time? Enable Firebase Services

Before the site works fully, enable these in Firebase Console:

### 1. Authentication
- Go to: https://console.firebase.google.com/project/habs-tech-dev/authentication
- Click "Get Started"
- Enable "Email/Password" provider

### 2. Firestore Database
- Go to: https://console.firebase.google.com/project/habs-tech-dev/firestore
- Click "Create Database"
- Select "Start in TEST mode" (for development)
- Choose location closest to you (or United States)

### 3. Storage
- Go to: https://console.firebase.google.com/project/habs-tech-dev/storage
- Click "Get Started"
- Select "Start in TEST mode"

---

## 🆘 Troubleshooting

### "Firebase not configured"
- Make sure `.env.local` file exists
- Restart dev server: `Ctrl+C` then `npm run dev`

### "Port 3000 already in use"
```bash
npx kill-port 3000
npm run dev
```

### Firebase login fails
```bash
firebase logout
firebase login --reauth
```

---

## 📋 Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `firebase use habs-tech-dev` | Switch to DEV project |
| `firebase deploy --only firestore:rules` | Update security rules |
| `firebase emulators:start` | Run local Firebase emulators |

---

## ✅ Next Steps After Setup

1. **Test the homepage** - Make sure everything loads
2. **Try the contact form** - Test form submissions
3. **Check admin panel** - Visit `/admin/dashboard` (need to create admin user first)
4. **Start customizing** - Edit content in `screens/` folder

---

**Need help? Open `ENV-SETUP-GUIDE.md` for detailed instructions!**


















