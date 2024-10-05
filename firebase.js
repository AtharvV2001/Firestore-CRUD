import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
dotenv.config();
// Decode the Base64 string and parse it as JSON
const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8'));



// Firebase configuration
const firebaseConfig = {
  credential: cert(serviceAccount)
};

// Initialize Firebase app and Firestore
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
