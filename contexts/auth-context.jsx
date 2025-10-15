/**
 * HABS TECHNOLOGIES GROUP
 * Authentication Context
 */

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, updatePassword, reauthenticateWithCredential, EmailAuthProvider, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || 'Admin User',
          role: 'admin',
          loginTime: new Date().toISOString(),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || 'Admin User',
        role: 'admin',
        loginTime: new Date().toISOString(),
      });
      
      return { success: true, message: 'Login successful' };
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      return { success: false, message: errorMessage };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      if (newPassword.length < 8) {
        return { success: false, message: 'New password must be at least 8 characters long' };
      }
      
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return { success: false, message: 'User not authenticated' };
      }
      
      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      
      // Send password reset email with proper configuration
      await sendPasswordResetEmail(auth, currentUser.email, {
        url: `${window.location.origin}/admin/settings?passwordChange=true`,
        handleCodeInApp: false
      });
      
      // Also try to send a custom email notification
      try {
        // This is a fallback - you might want to implement a custom email service
        console.log('Password reset email sent to:', currentUser.email);
        console.log('New password requested:', newPassword);
        
        // You could integrate with SendGrid, Mailgun, or other email services here
        // For now, we'll rely on Firebase's built-in email system
      } catch (emailError) {
        console.warn('Custom email notification failed:', emailError);
      }
      
      return { 
        success: true, 
        message: 'Password reset email sent successfully! Please check your email inbox (including spam folder) and follow the instructions to complete the password change. The email may take a few minutes to arrive.' 
      };
    } catch (error) {
      console.error('Password change error:', error);
      let errorMessage = 'Failed to send password reset email. Please try again.';
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Current password is incorrect.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many password reset attempts. Please try again later.';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Please log out and log back in before changing your password.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'User account not found.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.code === 'auth/missing-email') {
        errorMessage = 'Email address is required.';
      }
      
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if there's an error
      setUser(null);
      router.push('/login');
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    changePassword,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
