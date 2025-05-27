// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFOtBQcdSFDQ4tPGVZ86fYNjwzc3ZBZvA",
  authDomain: "sk8-or-die-111e0.firebaseapp.com",
  projectId: "sk8-or-die-111e0",
  storageBucket: "sk8-or-die-111e0.appspot.com",
  messagingSenderId: "202001384898",
  appId: "1:202001384898:web:6cede09fe3eda67e93025b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database (for saving board info)
const db = getFirestore(app);

// Firebase Storage (for images)
const storage = getStorage(app);

export { db, storage };
