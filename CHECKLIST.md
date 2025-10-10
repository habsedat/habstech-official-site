# Pre-Launch Checklist — Habs Technologies Group

Use this checklist before deploying to production.

---

## 🔧 Configuration

### Firebase Setup
- [ ] Firebase projects created (dev & prod)
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)
- [ ] Logged into Firebase (`firebase login`)
- [ ] Projects linked (`.firebaserc` configured)
- [ ] Environment variables set (`.env.local` and `.env.production`)

### Services Enabled
- [ ] Firebase Authentication (Email/Password)
- [ ] Firestore Database
- [ ] Firebase Storage
- [ ] Firebase Hosting
- [ ] Google Analytics (GA4)

### Security Rules Deployed
- [ ] Firestore rules (`firebase deploy --only firestore:rules`)
- [ ] Firestore indexes (`firebase deploy --only firestore:indexes`)
- [ ] Storage rules (`firebase deploy --only storage`)

---

## 👥 Admin Users

### Create Admin Accounts
- [ ] At least one Owner account created
- [ ] User document added to Firestore `users` collection
- [ ] Admin can log in to `/admin/dashboard`
- [ ] 2FA enabled for Owner/Admin accounts (recommended)

### Test Admin Access
- [ ] Can access Dashboard
- [ ] Can view Applications
- [ ] Can edit Content
- [ ] Can upload Media
- [ ] Can manage Users

---

## 📝 Content

### Pages Populated
- [ ] **Home:** Content reviewed and updated
- [ ] **About:** Mission, vision, values finalized
- [ ] **Divisions:** All 6 divisions described
- [ ] **Services:** Pricing tiers confirmed
- [ ] **Legal:** Privacy, Terms, Cookies reviewed by legal team

### Initial Data
- [ ] Services/pricing added to Firestore
- [ ] Divisions added to Firestore
- [ ] Site settings configured
- [ ] SEO defaults set (title, description, OG image)

### Media Assets
- [ ] Logo uploaded (SVG + PNG)
- [ ] Favicon added (`/public/favicon.ico`)
- [ ] OG default image (`/public/images/og-default.jpg`)
- [ ] Brand images optimized and uploaded

---

## 🎨 Branding

### Visual Identity
- [ ] Logo correct and displays properly
- [ ] Brand colors match specification
- [ ] Typography (Exo 2, Geologica) geometric, futuristic sans-serif loading correctly
- [ ] Favicon displays in browser tab

### Consistency Check
- [ ] All pages use correct brand colors
- [ ] Headlines use Exo 2 (geometric, futuristic heading font)
- [ ] Body text uses Geologica (clean, modern body font)
- [ ] Accent elements use approved palette only

---

## 🧪 Testing

### Functionality
- [ ] **Navigation:** All menu items work
- [ ] **Forms:** Contact form submits successfully
- [ ] **Forms:** Application form submits successfully
- [ ] **Admin:** Login works
- [ ] **Admin:** Forms appear in Applications inbox
- [ ] **Links:** All internal links work
- [ ] **Links:** All external links open correctly

### Cross-Browser
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, if available)

### Responsive Design
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Laptop (1024px - 1279px)
- [ ] Desktop (1280px+)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Alt text on all images
- [ ] Color contrast ≥ 7:1 (use contrast checker)
- [ ] Screen reader test (optional but recommended)

### Performance
- [ ] Lighthouse Desktop score ≥ 90
- [ ] Lighthouse Mobile score ≥ 85
- [ ] Images optimized (WebP where possible)
- [ ] No console errors

---

## 🔒 Security

### Authentication
- [ ] Email/Password auth enabled
- [ ] Strong password policy enforced
- [ ] 2FA available for admins

### Data Protection
- [ ] Firestore rules limit read/write access
- [ ] Storage rules protect sensitive files
- [ ] API routes validate input
- [ ] reCAPTCHA configured on forms

### Best Practices
- [ ] `.env.local` not committed to git
- [ ] Admin routes hidden from public sitemap
- [ ] Sensitive data encrypted
- [ ] HTTPS enforced

---

## 📊 Analytics & Monitoring

### Google Analytics
- [ ] GA4 property created
- [ ] Measurement ID added to `.env.local`
- [ ] Tracking code loads on all pages
- [ ] Key events configured:
  - [ ] `application_submitted`
  - [ ] `contact_sent`
  - [ ] `cta_clicked`

### Firebase Monitoring
- [ ] Firestore usage alerts set
- [ ] Storage usage alerts set
- [ ] Hosting bandwidth alerts set

---

## 🌐 Domain & Hosting

### Custom Domain
- [ ] Domain purchased (habstechnologies.com)
- [ ] Domain connected to Firebase Hosting
- [ ] DNS records configured
- [ ] SSL certificate active and valid
- [ ] WWW redirect configured (if needed)

### Hosting Configuration
- [ ] Firebase Hosting connected
- [ ] Build deployed successfully
- [ ] Custom domain serves content
- [ ] Redirects working (if any)

---

## 📧 Email Configuration

### Transactional Emails
- [ ] Email service configured (SendGrid, Mailgun, etc.)
- [ ] Admin notification emails working
- [ ] User confirmation emails working
- [ ] Email templates branded

### SMTP Settings
- [ ] Sender email verified
- [ ] SPF/DKIM configured
- [ ] Test emails sent and received

---

## 📄 Legal & Compliance

### Policies
- [ ] Privacy Policy reviewed by legal
- [ ] Terms of Service reviewed by legal
- [ ] Cookie Policy accurate
- [ ] GDPR compliance verified (if applicable)

### Consent Management
- [ ] Cookie banner implemented (if needed)
- [ ] Form consent checkboxes required
- [ ] Data retention policy documented

---

## 🚀 Deployment

### Pre-Deploy
- [ ] Final content freeze (30-60 min)
- [ ] All tests passing
- [ ] No linter errors
- [ ] Git commits up to date
- [ ] Backup of current data

### Deploy Process
- [ ] Switch to production project (`firebase use habs-tech-prod`)
- [ ] Build for production (`npm run build && npm run export`)
- [ ] Deploy to Firebase (`firebase deploy`)
- [ ] Warm cache on key pages

### Post-Deploy Verification
- [ ] **Homepage:** Loads without errors
- [ ] **Navigation:** All pages accessible
- [ ] **Forms:** Submit successfully
- [ ] **Admin:** Login and dashboard work
- [ ] **Mobile:** Responsive design correct
- [ ] **Performance:** Lighthouse scores acceptable
- [ ] **Analytics:** Tracking events firing

---

## 📣 Go-Live

### Announcement
- [ ] Internal team notified
- [ ] Stakeholders informed
- [ ] Social media posts scheduled (optional)
- [ ] Press release prepared (optional)

### Monitoring (First 24 Hours)
- [ ] Monitor Firebase Console for errors
- [ ] Check Analytics for traffic
- [ ] Review form submissions
- [ ] Watch for support requests

---

## 🔄 Post-Launch

### Week 1
- [ ] Daily monitoring of analytics
- [ ] Respond to form submissions within 24 hours
- [ ] Address any bugs or issues
- [ ] Collect user feedback

### Month 1
- [ ] Review Analytics reports
- [ ] Update content as needed
- [ ] Add first case studies
- [ ] Plan feature enhancements

### Ongoing
- [ ] Weekly analytics review
- [ ] Monthly content updates
- [ ] Quarterly security audits
- [ ] Continuous performance optimization

---

## ✅ Launch Approval

**Approved by:**

- [ ] Technical Lead: __________________ Date: __________
- [ ] Project Manager: _________________ Date: __________
- [ ] Business Owner: __________________ Date: __________

**Production URL:** https://habstechnologies.com

**Launch Date:** __________________

---

**Checklist Version:** 1.0  
**Last Updated:** October 2024  
**Maintained by:** Habs Technologies Group Development Team


