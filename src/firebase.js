import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/** Região das Cloud Functions (deve coincidir com `setGlobalOptions` no backend). */
const DEFAULT_FUNCTIONS_REGION = "europe-west1";

/**
 * True quando as variáveis mínimas da Web app estão no `.env`.
 * (A API key é pública; a segurança vem das Firestore rules.)
 */
export function isFirebaseConfigured() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.storageBucket &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId,
  );
}

let app;

export function getFirebaseApp() {
  if (!isFirebaseConfigured()) return null;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  return app;
}

export function getFirebaseFunctions() {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  const region =
    import.meta.env.VITE_FIREBASE_FUNCTIONS_REGION || DEFAULT_FUNCTIONS_REGION;
  return getFunctions(firebaseApp, region);
}

export function getFirebaseAuth() {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  return getAuth(firebaseApp);
}
