// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration (provided)
const firebaseConfig = {
  apiKey: "AIzaSyDO0Ig2xLkO9cDKWK0RjHNB6BYKXxj0KXs",
  authDomain: "revolux-a54ca.firebaseapp.com",
  projectId: "revolux-a54ca",
  storageBucket: "revolux-a54ca.firebasestorage.app",
  messagingSenderId: "716477461569",
  appId: "1:716477461569:web:339aab1ff6603f553802c0",
  measurementId: "G-GRD1DND3RC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const waitForAuthInit = () =>
  new Promise<User | null>((resolve) => {
    const unsub = onAuthStateChanged(auth, (u) => { resolve(u); unsub(); });
  });
