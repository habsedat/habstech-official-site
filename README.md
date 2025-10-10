# Habs Technologies Group — Official Website

**"Imagination in Motion"**

Professional web application for Habs Technologies Group, built with Next.js 14 and Firebase.

---

## 🚀 Features

### Public Website
- **Modern Design System** — Brand-consistent colors, typography, and components
- **Responsive Layout** — Mobile, tablet, and desktop optimized
- **SEO Optimized** — Meta tags, Open Graph, structured data
- **Accessibility** — WCAG AA compliant with keyboard navigation
- **Performance** — Optimized images, lazy loading, and caching

### Pages
- **Home** — Hero, services, divisions, featured offerings
- **About** — Mission, vision, values, leadership
- **Divisions** — All 6 specialized divisions
- **Services & Pricing** — 4 transparent pricing tiers
- **Case Studies** — Project showcases (coming soon)
- **Contact** — Simple inquiry form
- **Application** — Detailed project request form
- **Legal** — Privacy Policy, Terms of Service, Cookie Policy

### Admin Dashboard
- **Dashboard** — Overview stats and quick actions
- **Applications** — Manage project applications with status tracking
- **Content Manager** — Edit pages and site content
- **Services** — Manage pricing tiers
- **Media Library** — Upload and manage assets
- **Users** — Role-based access control (Owner, Admin, Editor)
- **Settings** — Site configuration and SEO defaults

### Security & Infrastructure
- **Firebase Authentication** — Role-based access control
- **Firestore** — Real-time database with security rules
- **Firebase Storage** — Secure file storage with access rules
- **Cloud Functions** — Serverless backend operations
- **Firebase Hosting** — Fast, secure hosting with SSL

---

## 📋 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4 + CSS Modules
- **Backend:** Firebase (Auth, Firestore, Storage, Functions, Hosting)
- **Forms:** React Hook Form
- **UI Components:** Custom component library
- **Fonts:** Exo 2 (headings), Geologica (body) - Geometric, Futuristic Sans-Serif Family
- **Analytics:** Google Analytics 4 (GA4)
- **Type Safety:** TypeScript

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase project (development and production)

### Installation

1. **Clone the repository**
   ```bash
   cd habs-technologies
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` file in the root:
   ```env
   # Firebase Configuration (Public - Client-side)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

   # Firebase Admin SDK (Private - Server-side)
   FIREBASE_ADMIN_PROJECT_ID=your_project_id
   FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your_project.iam.gserviceaccount.com
   FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"

   # Environment
   NEXT_PUBLIC_ENVIRONMENT=development
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Initialize Firebase**
   ```bash
   firebase login
   firebase use habs-tech-dev
   ```

5. **Deploy Firestore rules and indexes**
   ```bash
   firebase deploy --only firestore:rules
   firebase deploy --only firestore:indexes
   firebase deploy --only storage
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Project Structure

```
habs-technologies/
├── app/                          # Next.js App Router
│   ├── about/page.tsx
│   ├── admin/                   # Admin dashboard (hidden from public)
│   ├── api/                     # API routes
│   ├── application/page.tsx
│   ├── case-studies/page.tsx
│   ├── contact/page.tsx
│   ├── divisions/page.tsx
│   ├── legal/
│   ├── services/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # Reusable components
│   ├── admin/                   # Admin-specific components
│   ├── layout/                  # Header, Footer, Navigation
│   └── ui/                      # Button, Input, Card, Modal, etc.
├── lib/                         # Utilities and Firebase helpers
│   ├── auth.js
│   ├── firebase.js
│   ├── firestore.js
│   ├── seo.js
│   └── storage.js
├── public/                      # Static assets
│   ├── icons/
│   └── images/
├── screens/                     # Page implementations (function-named)
│   ├── about/
│   ├── admin/
│   ├── application/
│   ├── case-studies/
│   ├── contact/
│   ├── divisions/
│   ├── home/
│   ├── legal/
│   └── services/
├── styles/                      # Global styles
│   └── admin.css
├── firebase.json                # Firebase configuration
├── firestore.rules             # Firestore security rules
├── firestore.indexes.json      # Firestore indexes
├── storage.rules               # Storage security rules
└── package.json
```

---

## 🎨 Brand Design System

### Colors
- **Electric Tech Blue:** `#0E3A8A` (Primary)
- **Deep Creative Violet:** `#6C63FF` (Accent A)
- **Bright Golden Yellow:** `#FFD35C` (Accent B / Focus rings)
- **Midnight Black:** `#0E0E10` (Text)
- **Cloud Silver:** `#F5F5F5` (Light backgrounds)

### Typography (Geometric, Futuristic Sans-Serif)
- **Headings:** Exo 2 (Bold, geometric, futuristic tech aesthetic)
- **Body:** Geologica (Clean, modern, highly readable)

### Responsive Breakpoints
- **Mobile:** ≤ 767px
- **Tablet:** 768px - 1023px
- **Laptop:** 1024px - 1279px
- **Desktop:** ≥ 1280px

---

## 🚢 Deployment

### Development
```bash
npm run build
firebase use habs-tech-dev
firebase deploy
```

### Production
```bash
# Build for production
npm run build
npm run export

# Switch to production project
firebase use habs-tech-prod

# Deploy everything
firebase deploy

# Or deploy individually
firebase deploy --only hosting
firebase deploy --only firestore:rules
firebase deploy --only storage
firebase deploy --only functions
```

---

## 🔐 Admin Access

### Creating Admin Users

1. **Sign up a user** through Firebase Console or Authentication UI
2. **Add user to Firestore:**
   ```js
   // In Firestore Console, create document in `users` collection:
   {
     displayName: "Admin Name",
     email: "admin@habstechnologies.com",
     role: "owner", // or "admin", "editor"
     status: "active",
     createdAt: timestamp
   }
   ```

3. **Access admin dashboard:**
   Navigate to `/admin/dashboard` (hidden from public navigation)

### Roles
- **Owner:** Full access, can manage users
- **Admin:** Content, applications, media, settings
- **Editor:** Content and media only

---

## 📝 Content Management

### Updating Site Content
1. Log in to `/admin/dashboard`
2. Navigate to **Content Manager**
3. Edit pages, services, or divisions
4. Publish changes

### Managing Applications
1. Go to **Applications** in admin
2. Filter by status (New, In Review, Approved, etc.)
3. Click to view details and update status
4. Add internal notes

### Uploading Media
1. Go to **Media Library**
2. Upload images (max 10MB)
3. Add alt text for accessibility
4. Use in content

---

## 🧪 Testing

### Run Development
```bash
npm run dev
```

### Firebase Emulators (Local Testing)
```bash
firebase emulators:start
```

### Build Check
```bash
npm run build
```

---

## 📊 Analytics

Google Analytics 4 (GA4) tracks:
- Page views
- Form submissions (`application_submitted`, `contact_sent`)
- CTA clicks
- User engagement

Configure GA4 measurement ID in `.env.local`

---

## 🔒 Security Features

- **Role-Based Access Control** — Firestore and Storage rules
- **reCAPTCHA** — Spam protection on forms
- **Rate Limiting** — IP-based protection
- **2FA** — Recommended for Owner/Admin accounts
- **Audit Logs** — Track admin actions
- **Data Encryption** — At rest and in transit

---

## 📄 License

© 2025 Habs Technologies Group. All rights reserved.

---

## 🤝 Support

For technical support or questions:
- **Email:** dev@habstechnologies.com
- **Admin Issues:** Contact system administrator

---

## ✅ Launch Checklist

Before going live:
- [ ] Firebase projects created (dev & prod)
- [ ] Environment variables configured
- [ ] Firebase rules deployed
- [ ] Admin users created
- [ ] Content populated (services, divisions, about)
- [ ] Legal pages reviewed
- [ ] Analytics connected
- [ ] Domain connected to Firebase Hosting
- [ ] SSL certificate active
- [ ] Test all forms
- [ ] Test admin dashboard
- [ ] Performance audit (Lighthouse 90+)
- [ ] Accessibility audit (WCAG AA)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness check

---

**Built with ❤️ by Habs Technologies Group**  
*From Sierra Leone to the World*
