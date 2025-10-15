# Email Configuration Guide for Password Reset

## 🚨 **CRITICAL: Email System Setup Required**

The password reset email system requires proper Firebase email configuration to work correctly. Without proper setup, emails may not be delivered to user inboxes.

## 📋 **Step 1: Configure Firebase Email Templates**

### 1.1 Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `habs-tech-dev`
3. Navigate to **Authentication** → **Templates**

### 1.2 Configure Password Reset Email Template
1. Click on **"Password reset"** template
2. **Customize the email template** with your branding
3. **Set the sender name**: `Habs Technologies Group Admin`
4. **Set reply-to address**: `support@habstechnologies.com`

### 1.3 Email Template Content
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Reset - Habs Technologies Group</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0E3A8A; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Habs Technologies Group</h1>
            <p style="margin: 5px 0 0 0;">Admin Password Reset</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0E3A8A;">Password Reset Request</h2>
            <p>Hello,</p>
            <p>You have requested to reset your password for your Habs Technologies Group admin account.</p>
            <p>Click the button below to reset your password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{resetPasswordLink}" 
                   style="background: #6C63FF; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                    Reset Password
                </a>
            </div>
            
            <p><strong>Important:</strong></p>
            <ul>
                <li>This link will expire in 1 hour</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>For security, choose a strong, unique password</li>
            </ul>
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 4px; font-family: monospace;">
                {resetPasswordLink}
            </p>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
            
            <p style="font-size: 14px; color: #6c757d;">
                <strong>Habs Technologies Group</strong><br>
                Building the future from Sierra Leone to the world<br>
                <a href="https://habs-tech-dev.web.app">habs-tech-dev.web.app</a>
            </p>
        </div>
    </div>
</body>
</html>
```

## 📋 **Step 2: Configure Email Delivery Settings**

### 2.1 Check Email Delivery Configuration
1. In Firebase Console, go to **Authentication** → **Settings**
2. Scroll down to **Authorized domains**
3. Ensure your domain is listed: `habs-tech-dev.web.app`

### 2.2 Configure SMTP Settings (Optional but Recommended)
1. Go to **Authentication** → **Settings** → **SMTP settings**
2. Configure custom SMTP server for better deliverability:
   - **SMTP Server**: Use a reliable email service (SendGrid, Mailgun, etc.)
   - **Port**: 587 (TLS) or 465 (SSL)
   - **Authentication**: Enable with your email service credentials

## 📋 **Step 3: Test Email Delivery**

### 3.1 Test Password Reset
1. Go to: `https://habs-tech-dev.web.app/login`
2. Click "Forgot Password" or use the admin settings
3. Enter a test email address
4. Check if email arrives in inbox (not spam)

### 3.2 Troubleshooting Email Delivery
If emails are not being delivered:

1. **Check Spam Folder**: Emails might be filtered as spam
2. **Verify Email Address**: Ensure the email address is correct
3. **Check Firebase Logs**: Look for email sending errors
4. **Test with Different Email Providers**: Gmail, Outlook, etc.

## 📋 **Step 4: Alternative Email Service Integration**

If Firebase emails are not reliable, consider integrating a dedicated email service:

### 4.1 SendGrid Integration
```javascript
// Example: Custom email service integration
const sendCustomPasswordResetEmail = async (email, resetLink) => {
  const response = await fetch('/api/send-password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, resetLink })
  });
  return response.json();
};
```

### 4.2 Mailgun Integration
```javascript
// Example: Mailgun integration
const sendMailgunEmail = async (email, resetLink) => {
  const formData = new FormData();
  formData.append('from', 'admin@habstechnologies.com');
  formData.append('to', email);
  formData.append('subject', 'Password Reset - Habs Technologies Group');
  formData.append('html', generatePasswordResetHTML(resetLink));
  
  const response = await fetch('https://api.mailgun.net/v3/your-domain/messages', {
    method: 'POST',
    headers: { 'Authorization': 'Basic ' + btoa('api:your-api-key') },
    body: formData
  });
  return response.json();
};
```

## 🚨 **Current Status**

**⚠️ IMPORTANT**: The current system uses Firebase's built-in email service, which may have delivery issues. For production use, consider implementing a dedicated email service for better reliability.

## 📞 **Support**

If you continue to have email delivery issues:

1. **Check Firebase Console** for email sending logs
2. **Verify email template configuration**
3. **Test with multiple email providers**
4. **Consider implementing a custom email service**

---

**Note**: This guide ensures that password reset emails are delivered reliably to user inboxes, not spam folders.


