import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration — reads values from Vite env vars (VITE_FIREBASE_*) with sensible fallbacks
const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string) ?? "AIzaSyB9ILnoN9eavg4UAGtRrKrdqpyq7eK_m9c",
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) ?? "skillpath-5b424.firebaseapp.com",
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) ?? "skillpath-5b424",
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) ?? "skillpath-5b424.appspot.com",
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) ?? "880932647502",
  appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) ?? "1:880932647502:web:73a831674703875b07491f",
  measurementId: (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string) ?? "G-M8QZ97R8EE",
};

// Warn if API key looks missing or placeholder-ish to help debugging
const placeholderKey = "your_firebase_api_key";
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === placeholderKey || firebaseConfig.apiKey.startsWith("your_") || firebaseConfig.apiKey === "AIzaSyB9ILnoN9eavg4UAGtRrKrdqpyq7eK_m9c") {
  // Don't print the key — just a helpful message
  // eslint-disable-next-line no-console
  console.error("Firebase API key is missing or appears invalid. Please set VITE_FIREBASE_API_KEY in your .env (or .env.development) with your project's API key and restart the dev server.");
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
