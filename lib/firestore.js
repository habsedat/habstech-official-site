/**
 * HABS TECHNOLOGIES GROUP
 * Firestore Helper Functions
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Collection names
 */
export const COLLECTIONS = {
  PAGES: 'pages',
  DIVISIONS: 'divisions',
  SERVICES: 'services',
  CASE_STUDIES: 'caseStudies',
  APPLICATIONS: 'applications',
  CONTACTS: 'contacts',
  MEDIA: 'media',
  USERS: 'users',
  SETTINGS: 'settings',
  LOGS: 'logs',
};

/**
 * Get a single document by ID
 */
export async function getDocument(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Get all documents from a collection
 */
export async function getDocuments(collectionName, options = {}) {
  try {
    const colRef = collection(db, collectionName);
    const constraints = [];
    
    if (options.where) {
      constraints.push(where(...options.where));
    }
    
    if (options.orderBy) {
      constraints.push(orderBy(...options.orderBy));
    }
    
    if (options.limit) {
      constraints.push(limit(options.limit));
    }
    
    const q = constraints.length > 0 ? query(colRef, ...constraints) : colRef;
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Get published documents only
 */
export async function getPublishedDocuments(collectionName, options = {}) {
  return getDocuments(collectionName, {
    ...options,
    where: ['published', '==', true],
  });
}

/**
 * Add a new document
 */
export async function addDocument(collectionName, data) {
  try {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Update a document
 */
export async function updateDocument(collectionName, docId, data) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Delete a document
 */
export async function deleteDocument(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Get site settings
 */
export async function getSettings() {
  try {
    const settings = await getDocument(COLLECTIONS.SETTINGS, 'site');
    return settings || {};
  } catch (error) {
    console.error('Error getting settings:', error);
    return {};
  }
}

/**
 * Log an action (for audit trail)
 */
export async function logAction(action, details, userId = null) {
  try {
    await addDocument(COLLECTIONS.LOGS, {
      action,
      details,
      userId,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error logging action:', error);
  }
}

/**
 * Subscribe to real-time updates for a collection
 * Returns an unsubscribe function
 */
export function subscribeToCollection(collectionName, callback, options = {}) {
  try {
    const colRef = collection(db, collectionName);
    const constraints = [];
    
    if (options.where) {
      constraints.push(where(...options.where));
    }
    
    if (options.orderBy) {
      constraints.push(orderBy(...options.orderBy));
    }
    
    if (options.limit) {
      constraints.push(limit(options.limit));
    }
    
    const q = constraints.length > 0 ? query(colRef, ...constraints) : colRef;
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(docs);
    }, (error) => {
      console.error(`Error listening to ${collectionName}:`, error);
      callback([]);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error(`Error subscribing to ${collectionName}:`, error);
    return () => {}; // Return empty unsubscribe function
  }
}

export { serverTimestamp, Timestamp };


