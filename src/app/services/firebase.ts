import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import type { User } from "firebase/auth";

// Pegamos tudo do .env (Vite)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  // storageBucket, measurementId etc. só se você for usar
};

// garante singleton (evita “Firebase App named '[DEFAULT]' already exists” no HMR)
function ensureApp(): FirebaseApp {
  return getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
}

export const app = ensureApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// util: esperar o primeiro estado de auth (útil nos guards)
export const waitForAuthInit = () =>
  new Promise<User | null>((resolve) => {
    const { onAuthStateChanged } = await import("firebase/auth");
    const unsub = onAuthStateChanged(auth, (u) => { resolve(u); unsub(); });
  });
