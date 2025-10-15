# Admin Authentication Setup Guide

## 🔐 Setting Up Admin Users in Firebase Authentication

The admin authentication system now uses Firebase Authentication for secure user management. Here's how to set up admin users:

### 📋 Step 1: Access Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `habs-tech-dev`
3. Navigate to **Authentication**

### 📝 Step 2: Enable Email/Password Authentication

1. Click on **"Sign-in method"** tab
2. Click on **"Email/Password"**
3. Enable **"Email/Password"** provider
4. Click **"Save"**

### 👥 Step 3: Add Admin Users

1. Go to **"Users"** tab in Authentication
2. Click **"Add user"**
3. Enter admin details:
   - **Email**: `admin@habstechnologies.com`
   - **Password**: `HabsTech2024!` (or your preferred password)
4. Click **"Add user"**

### 🔧 Step 4: Add More Admin Users

Repeat Step 3 for each admin user you want to add:

**Example Admin Users:**
- **Email**: `manager@habstechnologies.com`
- **Password**: `Manager2024!`

- **Email**: `support@habstechnologies.com`
- **Password**: `Support2024!`

### 🚀 Step 5: Test the Login

1. Go to: `https://habs-tech-dev.web.app/login`
2. Use the credentials you created in Firebase Authentication
3. Login should work and redirect to the admin dashboard

### 🔒 Step 6: Change Passwords

After first login, users can change their passwords:
1. Go to **Settings** in the admin dashboard
2. Use the **Change Password** section
3. Enter current password and new password
4. Password will be updated in Firebase Authentication automatically

## 📱 Login Page Features

- ✅ **Professional Design**: Clean, modern login interface
- ✅ **Password Visibility Toggle**: Show/hide password fields
- ✅ **Form Validation**: Proper error handling
- ✅ **Loading States**: Visual feedback during login
- ✅ **Responsive Design**: Works on all devices

## 🔐 Security Features

- ✅ **Firebase Integration**: Credentials stored securely in Firestore
- ✅ **Password Change**: Users can update their passwords
- ✅ **Session Management**: Secure login/logout with persistence
- ✅ **Protected Routes**: All admin pages require authentication
- ✅ **User Info Display**: Shows logged-in user in sidebar

## 🛠️ Troubleshooting

### Login Page Shows Blank Screen
- The login page should now work properly with the separate layout
- If still having issues, check browser console for errors

### Cannot Login
- Verify the user exists in Firebase Authentication
- Check that email and password match exactly
- Ensure Email/Password authentication is enabled
- Check for typos in email address

### Password Change Not Working
- Verify user is logged in
- Check that current password is correct
- Ensure new password meets Firebase requirements (min 6 characters)
- Try logging out and back in if you get "requires recent login" error

## 📞 Support

If you need help setting up admin users or encounter any issues, please check:
1. Firebase Console for Authentication users
2. Browser console for any JavaScript errors
3. Network tab for API call failures

---

**Note**: Remember to change default passwords after first login for security!
