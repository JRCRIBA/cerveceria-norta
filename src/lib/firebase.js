import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, enableMultiTabIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Inicialización Singleton de Firebase para Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Habilitar persistencia offline en el navegador (IndexedDB)
if (typeof window !== "undefined") {
  try {
    enableMultiTabIndexedDbPersistence(db).catch((err) => {
      if (err.code === "failed-precondition") {
        console.warn("[Firebase] Múltiples pestañas abiertas, persistencia en pestaña principal.");
      } else if (err.code === "unimplemented") {
        console.warn("[Firebase] El navegador no soporta persistencia IndexedDB.");
      }
    });
  } catch (e) {
    console.warn("[Firebase] Error configurando persistencia offline:", e);
  }
}

export { app, db, storage, auth };
