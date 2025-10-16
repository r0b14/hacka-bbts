import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// Read config from Vite env. If values are missing, avoid initializing Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

let app: ReturnType<typeof initializeApp> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;

const hasConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId);

if (hasConfig) {
  try {
    app = initializeApp(firebaseConfig as any);
    auth = getAuth(app);
  } catch (err) {
    // If initialization fails (invalid key, etc.), don't throw — fallback to stub behavior
    // Log for developer visibility
    // eslint-disable-next-line no-console
    console.warn('Firebase init failed:', err);
    app = null;
    auth = null;
  }
} else {
  // eslint-disable-next-line no-console
  console.info('Firebase config not provided — running in mock/offline mode.');
}

export { app, auth };

export const waitForAuthInit = () =>
  new Promise<User | null>((resolve) => {
    if (!auth) return resolve(null);
    const unsub = onAuthStateChanged(auth as any, (u) => {
      resolve(u);
      unsub();
    });
  });
