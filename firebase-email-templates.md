# Firebase Email Templates Configuration

## 🔐 Password Reset Email Template

To customize the password reset email template in Firebase Console:

### 📋 Steps to Configure:

1. **Go to Firebase Console**: `https://console.firebase.google.com/`
2. **Select Project**: `habs-tech-dev`
3. **Navigate to Authentication**
4. **Go to Templates tab**
5. **Click on "Password reset"**

### 📝 Recommended Email Template:

**Subject Line:**
```
Habs Technologies Admin - Password Reset Request
```

**Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Password Reset - Habs Technologies</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #0E3A8A 0%, #6C63FF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Habs Technologies Group</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Admin Password Reset</p>
    </div>
    
    <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <h2 style="color: #0E3A8A; margin-top: 0;">Password Reset Request</h2>
        
        <p>Hello,</p>
        
        <p>You have requested to change your admin password for Habs Technologies Group. To complete this process, please click the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="%LINK%" style="background: #0E3A8A; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reset My Password</a>
        </div>
        
        <p><strong>Important Security Notes:</strong></p>
        <ul>
            <li>This link will expire in 1 hour for security reasons</li>
            <li>If you didn't request this password change, please ignore this email</li>
            <li>Your current password will remain active until you complete the reset</li>
            <li>For security, this link can only be used once</li>
        </ul>
        
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace;">%LINK%</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 14px; color: #6b7280;">
            This email was sent from Habs Technologies Group Admin System.<br>
            If you have any questions, please contact your system administrator.
        </p>
    </div>
</body>
</html>
```

### 🔧 Alternative Simple Template:

**Subject Line:**
```
Habs Tech Admin - Password Reset
```

**Email Body (Plain Text):**
```
Habs Technologies Group - Admin Password Reset

Hello,

You have requested to change your admin password. To complete this process, please click the link below:

%LINK%

This link will expire in 1 hour for security reasons.

If you didn't request this password change, please ignore this email.

Best regards,
Habs Technologies Group Admin System
```

### ⚙️ Configuration Settings:

1. **Action URL**: Set to your domain (e.g., `https://habs-tech-dev.web.app`)
2. **Email Footer**: Add your company information
3. **Custom Domain**: Configure if you have a custom email domain

### 🛡️ Security Benefits:

- ✅ **Email Verification**: Only the registered email can change the password
- ✅ **Time-Limited Links**: Reset links expire after 1 hour
- ✅ **One-Time Use**: Each link can only be used once
- ✅ **Audit Trail**: Firebase logs all password reset attempts
- ✅ **Rate Limiting**: Prevents abuse with built-in rate limiting

### 📱 User Experience:

1. User enters current password + desired new password
2. System verifies current password
3. Password reset email is sent to user's registered email
4. User clicks link in email
5. User sets new password through Firebase's secure interface
6. Password is updated and user is logged out for security
7. User logs back in with new password

This provides maximum security while maintaining a smooth user experience!


