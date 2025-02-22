import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, } from "firebase/firestore/lite";
const env = import.meta.env
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_AUTH_DOMAIN,
  projectId: env.VITE_PROJECT_ID,
  storageBucket: env.VITE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_MESSAGE_SENDER_ID,
  appId: env.VITE_API_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseApp = getFirestore(app);
export const firebaseAuth = getAuth(app)
// app.automaticDataCollectionEnabled;