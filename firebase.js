import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' }; // Your Firebase credentials

// Firebase configuration
const firebaseConfig = {
  credential: cert(serviceAccount)
};

// Initialize Firebase app and Firestore
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
