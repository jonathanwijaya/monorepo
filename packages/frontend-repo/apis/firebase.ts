import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlkArhRLqql2OIYPn_BLanU-KN9U0p16I",
  authDomain: "backend-ebuddy-a11db.firebaseapp.com",
  databaseURL: "https://backend-ebuddy-a11db-default-rtdb.firebaseio.com",
  projectId: "backend-ebuddy-a11db",
  storageBucket: "backend-ebuddy-a11db.firebasestorage.app",
  messagingSenderId: "1018116589710",
  appId: "1:1018116589710:web:626523322e07022be5a1df",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
