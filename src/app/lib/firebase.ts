// src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcz4K6qtX-5XArzxpCva-KQMim3RfTZPA",
  authDomain: "edumorph-df51a.firebaseapp.com",
  projectId: "edumorph-df51a",
  storageBucket: "edumorph-df51a.appspot.com", // 🔄 fixed typo from 'firebasestorage.app'
  messagingSenderId: "668231860430",
  appId: "1:668231860430:web:da869fae1c454a3034d09f",
  measurementId: "G-9H92NGNTRW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth export
export const auth = getAuth(app);
