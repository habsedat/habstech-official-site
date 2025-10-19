/**
 * HABS TECHNOLOGIES GROUP
 * Admin Service - Centralized admin operations
 */

import {
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  getDocument,
  COLLECTIONS,
} from './firestore';

import {
  uploadFile,
  uploadBase64,
  deleteFile,
  listFiles,
  generateUniqueFilename,
  validateFileType,
  validateFileSize,
  STORAGE_PATHS,
} from './storage';

/**
 * ============================================
 * APPLICATIONS MANAGEMENT
 * ============================================
 */

/**
 * Get all applications with optional filters
 */
export async function getApplications(filters = {}) {
  try {
    const options = {
      orderBy: ['createdAt', 'desc'],
    };

    if (filters.status) {
      options.where = ['status', '==', filters.status];
    }

    const applications = await getDocuments(COLLECTIONS.APPLICATIONS, options);
    return applications;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
}

/**
 * Get a single application by ID
 */
export async function getApplication(id) {
  try {
    return await getDocument(COLLECTIONS.APPLICATIONS, id);
  } catch (error) {
    console.error('Error fetching application:', error);
    throw error;
  }
}

/**
 * Update application status
 */
export async function updateApplicationStatus(id, status, notes = '') {
  try {
    await updateDocument(COLLECTIONS.APPLICATIONS, id, {
      status,
      notes,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
}

/**
 * Delete an application
 */
export async function deleteApplication(id) {
  try {
    await deleteDocument(COLLECTIONS.APPLICATIONS, id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
}

/**
 * ============================================
 * CONTACTS MANAGEMENT
 * ============================================
 */

/**
 * Get all contact submissions
 */
export async function getContacts(filters = {}) {
  try {
    const options = {
      orderBy: ['createdAt', 'desc'],
    };

    const contacts = await getDocuments(COLLECTIONS.CONTACTS, options);
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

/**
 * Get a single contact by ID
 */
export async function getContact(id) {
  try {
    return await getDocument(COLLECTIONS.CONTACTS, id);
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw error;
  }
}

/**
 * Update contact status
 */
export async function updateContactStatus(id, status, notes = '') {
  try {
    await updateDocument(COLLECTIONS.CONTACTS, id, {
      status,
      notes,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw error;
  }
}

/**
 * Delete a contact submission
 */
export async function deleteContact(id) {
  try {
    await deleteDocument(COLLECTIONS.CONTACTS, id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
}

/**
 * ============================================
 * MEDIA MANAGEMENT
 * ============================================
 */

/**
 * Upload a media file
 */
export async function uploadMedia(file, category = 'general') {
  try {
    // Validate file
    const maxSizeMB = 10;
    if (!validateFileSize(file, maxSizeMB)) {
      throw new Error(`File size exceeds ${maxSizeMB}MB limit`);
    }

    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(file.name);
    const path = `${STORAGE_PATHS.MEDIA}/${category}/${uniqueFilename}`;

    // Upload file
    const result = await uploadFile(file, path, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
        category,
        uploadedAt: new Date().toISOString(),
      },
    });

    // Save metadata to Firestore
    const mediaId = await addDocument(COLLECTIONS.MEDIA, {
      name: file.name,
      filename: uniqueFilename,
      path: result.path,
      url: result.url,
      size: result.size,
      contentType: result.contentType,
      category,
      uploadedAt: new Date().toISOString(),
    });

    return { success: true, mediaId, url: result.url, path: result.path };
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
}

/**
 * Get all media files
 */
export async function getMediaFiles(filters = {}) {
  try {
    const options = {
      orderBy: ['uploadedAt', 'desc'],
    };

    if (filters.category) {
      options.where = ['category', '==', filters.category];
    }

    const media = await getDocuments(COLLECTIONS.MEDIA, options);
    return media;
  } catch (error) {
    console.error('Error fetching media:', error);
    throw error;
  }
}

/**
 * Delete a media file
 */
export async function deleteMedia(mediaId, filePath) {
  try {
    // Delete from Firestore
    await deleteDocument(COLLECTIONS.MEDIA, mediaId);

    // Delete from Storage
    await deleteFile(filePath);

    return { success: true };
  } catch (error) {
    console.error('Error deleting media:', error);
    throw error;
  }
}

/**
 * ============================================
 * SETTINGS MANAGEMENT
 * ============================================
 */

/**
 * Get site settings
 */
export async function getSettings() {
  try {
    const settings = await getDocument(COLLECTIONS.SETTINGS, 'site');
    return settings || getDefaultSettings();
  } catch (error) {
    console.error('Error fetching settings:', error);
    return getDefaultSettings();
  }
}

/**
 * Update site settings
 */
export async function updateSettings(settings) {
  try {
    await updateDocument(COLLECTIONS.SETTINGS, 'site', settings);
    return { success: true };
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
}

/**
 * Get default settings
 */
function getDefaultSettings() {
  return {
    siteName: 'HABS Technologies Group',
    siteTagline: 'Innovation Through Technology',
    companyEmail: 'info@habstechnologies.com',
    companyPhone: '+234 123 456 7890',
    companyAddress: 'Lagos, Nigeria',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
    seo: {
      metaTitle: 'HABS Technologies Group - Innovation Through Technology',
      metaDescription: 'Leading technology solutions provider in Africa',
      metaKeywords: 'technology, software, innovation, Africa',
    },
    features: {
      applicationsEnabled: true,
      contactFormEnabled: true,
      newsletterEnabled: false,
    },
  };
}

/**
 * ============================================
 * DASHBOARD STATISTICS
 * ============================================
 */

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
  try {
    const [applications, contacts, media] = await Promise.all([
      getApplications(),
      getContacts(),
      getMediaFiles(),
    ]);

    // Calculate statistics
    const stats = {
      totalApplications: applications.length,
      newApplications: applications.filter((app) => app.status === 'new').length,
      pendingApplications: applications.filter((app) => app.status === 'pending').length,
      totalContacts: contacts.length,
      unreadContacts: contacts.filter((contact) => !contact.read).length,
      totalMedia: media.length,
      recentActivity: [
        ...applications.slice(0, 5).map((app) => ({
          type: 'application',
          title: `${app.name} - ${app.projectType}`,
          date: app.createdAt,
        })),
        ...contacts.slice(0, 5).map((contact) => ({
          type: 'contact',
          title: `${contact.name} - ${contact.email}`,
          date: contact.createdAt,
        })),
      ]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10),
    };

    return stats;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}

/**
 * ============================================
 * EXPORTS
 * ============================================
 */

export default {
  // Applications
  getApplications,
  getApplication,
  updateApplicationStatus,
  deleteApplication,

  // Contacts
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,

  // Media
  uploadMedia,
  getMediaFiles,
  deleteMedia,

  // Settings
  getSettings,
  updateSettings,

  // Dashboard
  getDashboardStats,
};








