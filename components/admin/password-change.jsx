/**
 * HABS TECHNOLOGIES GROUP
 * Password Change Component
 */

'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import './password-change.css';

export default function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { changePassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validation
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters long' });
      setLoading(false);
      return;
    }

    const result = await changePassword(currentPassword, newPassword);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    
    setLoading(false);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="password-change">
      <div className="password-change__header">
        <h3 className="password-change__title">Change Password</h3>
        <p className="password-change__subtitle">Request a password change via email confirmation</p>
      </div>

      <form onSubmit={handleSubmit} className="password-change__form">
        {message && (
          <div className={`password-change__message password-change__message--${message.type}`}>
            <span className="password-change__message-icon">
              {message.type === 'success' ? '✅' : '⚠️'}
            </span>
            {message.text}
          </div>
        )}

        <div className="password-change__field">
          <label htmlFor="current-password" className="password-change__label">
            Current Password
          </label>
          <div className="password-change__input-container">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="password-change__input"
              placeholder="Enter current password"
              required
              disabled={loading}
            />
            <button
              type="button"
              className="password-change__toggle"
              onClick={() => togglePasswordVisibility('current')}
              disabled={loading}
            >
              {showPasswords.current ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className="password-change__field">
          <label htmlFor="new-password" className="password-change__label">
            Desired New Password
          </label>
          <div className="password-change__input-container">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="password-change__input"
              placeholder="Enter desired new password (min 8 characters)"
              required
              disabled={loading}
            />
            <button
              type="button"
              className="password-change__toggle"
              onClick={() => togglePasswordVisibility('new')}
              disabled={loading}
            >
              {showPasswords.new ? '🙈' : '👁️'}
            </button>
          </div>
          <p className="password-change__field-note">
            This will be your new password after email confirmation
          </p>
        </div>

        <div className="password-change__field">
          <label htmlFor="confirm-password" className="password-change__label">
            Confirm Desired Password
          </label>
          <div className="password-change__input-container">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="password-change__input"
              placeholder="Confirm desired new password"
              required
              disabled={loading}
            />
            <button
              type="button"
              className="password-change__toggle"
              onClick={() => togglePasswordVisibility('confirm')}
              disabled={loading}
            >
              {showPasswords.confirm ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="password-change__button"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="password-change__spinner"></span>
              Sending Email...
            </>
          ) : (
            'Send Password Reset Email'
          )}
        </button>
      </form>

      <div className="password-change__help">
        <h4>How the email confirmation process works:</h4>
        <ul>
          <li><strong>Step 1:</strong> Enter your current password to verify your identity</li>
          <li><strong>Step 2:</strong> Enter your desired new password (minimum 8 characters)</li>
          <li><strong>Step 3:</strong> Click "Send Password Reset Email" - this will send an email to your registered email address</li>
          <li><strong>Step 4:</strong> Check your email inbox AND spam folder for the password reset email</li>
          <li><strong>Step 5:</strong> Click the link in the email to complete the password change</li>
          <li><strong>Step 6:</strong> You'll be logged out and must log back in with your new password</li>
        </ul>
        <p style={{marginTop: '1rem', padding: '0.75rem', background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '6px', fontSize: '0.875rem', color: '#92400e'}}>
          <strong>⚠️ Important:</strong> The password change is only completed after you click the link in the email. Until then, your current password remains active. Check both inbox and spam folder!
        </p>
        <p style={{marginTop: '0.75rem', padding: '0.75rem', background: '#eff6ff', border: '1px solid #3b82f6', borderRadius: '6px', fontSize: '0.875rem', color: '#1e40af'}}>
          <strong>📧 Email Delivery:</strong> If you don't receive the email within 5 minutes, check your spam folder or contact your system administrator to verify email configuration.
        </p>
      </div>
    </div>
  );
}
