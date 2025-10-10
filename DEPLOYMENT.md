# Deployment Guide — Habs Technologies Group

## Prerequisites

1. **Firebase CLI installed**
   ```bash
   npm install -g firebase-tools
   ```

2. **Firebase projects created**
   - Development: `habs-tech-dev`
   - Production: `habs-tech-prod`

3. **Environment variables configured** (`.env.local`)

---

## Initial Setup

### 1. Login to Firebase
```bash
firebase login
```

### 2. Link Projects
```bash
# Set default project
firebase use habs-tech-prod

# Configure aliases
firebase use --add habs-tech-dev
firebase use --add habs-tech-prod
```

### 3. Deploy Security Rules
```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Firestore indexes
firebase deploy --only firestore:indexes

# Deploy Storage rules
firebase deploy --only storage
```

---

## Development Deployment

### Option 1: Using Firebase CLI
```bash
# Build the app
npm run build

# Switch to development project
firebase use habs-tech-dev

# Deploy
firebase deploy
```

### Option 2: Using npm script
```bash
npm run firebase:deploy:dev
```

### Deploy specific services
```bash
# Hosting only
firebase deploy --only hosting

# Functions only
firebase deploy --only functions

# Rules only
npm run firebase:deploy:rules
```

---

## Production Deployment

### Full Deployment

```bash
# 1. Build and export
npm run build
npm run export

# 2. Switch to production
firebase use habs-tech-prod

# 3. Deploy everything
firebase deploy
```

### Using npm script
```bash
npm run firebase:deploy:prod
```

### Step-by-Step Production Deploy

```bash
# 1. Test build locally
npm run build
npm run start

# 2. Run tests and linting
npm run lint

# 3. Build for production
npm run export

# 4. Switch to production project
firebase use habs-tech-prod

# 5. Deploy hosting
firebase deploy --only hosting

# 6. Deploy rules (if changed)
npm run firebase:deploy:rules

# 7. Verify deployment
# Visit: https://habstechnologies.com
```

---

## Firebase Emulators (Local Testing)

### Start all emulators
```bash
npm run firebase:emulators
```

### Access emulator UIs
- **Emulator Suite UI:** http://localhost:4000
- **Firestore:** http://localhost:8080
- **Authentication:** http://localhost:9099
- **Storage:** http://localhost:9199
- **Hosting:** http://localhost:5000

---

## Environment Variables

### Development (.env.local)
```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID=habs-tech-dev
NEXT_PUBLIC_SITE_URL=https://habs-tech-dev.web.app
```

### Production (.env.production)
```env
NEXT_PUBLIC_FIREBASE_PROJECT_ID=habs-tech-prod
NEXT_PUBLIC_SITE_URL=https://habstechnologies.com
```

---

## Post-Deployment Checklist

### After Every Deployment

- [ ] **Verify homepage loads:** https://habstechnologies.com
- [ ] **Test navigation:** All menu items work
- [ ] **Test forms:** Contact and Application forms submit
- [ ] **Check admin:** `/admin/dashboard` accessible
- [ ] **Review console:** No errors in browser console
- [ ] **Test mobile:** Responsive on mobile devices

### After Initial Production Launch

- [ ] **Custom domain configured**
- [ ] **SSL certificate active**
- [ ] **Analytics tracking** (GA4 receiving data)
- [ ] **Admin users created**
- [ ] **Firestore populated** with initial data
- [ ] **Email notifications** configured
- [ ] **Backup strategy** in place

---

## Rollback Procedure

### Quick Rollback (Firebase Hosting)

```bash
# List previous versions
firebase hosting:releases:list

# Rollback to previous version
firebase hosting:rollback
```

### Manual Rollback

```bash
# 1. Switch to last working commit
git checkout <commit-hash>

# 2. Build and deploy
npm run build
npm run export
firebase deploy --only hosting
```

---

## Troubleshooting

### Build Fails

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

### Firebase Deploy Fails

```bash
# Check you're logged in
firebase login

# Check current project
firebase use

# Deploy with debug
firebase deploy --debug
```

### Firestore Rules Not Updating

```bash
# Force deploy rules
firebase deploy --only firestore:rules --force
```

---

## Monitoring

### Firebase Console
- **Hosting:** Monitor traffic and performance
- **Firestore:** Check database usage
- **Storage:** Monitor file storage
- **Authentication:** User activity

### Google Analytics
- **Real-time:** Live user activity
- **Engagement:** Page views, events
- **Conversions:** Form submissions

---

## Backup & Recovery

### Automated Firestore Backups
Set up in Firebase Console:
1. Go to Firestore > Backups
2. Schedule daily backups
3. Set retention period (30 days recommended)

### Manual Backup
```bash
# Export Firestore data
gcloud firestore export gs://habs-tech-prod-backup/$(date +%Y%m%d)
```

---

## Security Best Practices

1. **Never commit `.env.local`** (in .gitignore)
2. **Rotate API keys** every 90 days
3. **Review security rules** before each deploy
4. **Enable 2FA** for admin users
5. **Monitor audit logs** weekly
6. **Keep dependencies updated** (`npm audit`)

---

## Support Contacts

- **Technical Lead:** dev@habstechnologies.com
- **Firebase Support:** Firebase Console → Support
- **Emergency Rollback:** Follow rollback procedure above

---

**Last Updated:** October 2024  
**Maintained by:** Habs Technologies Group Development Team





