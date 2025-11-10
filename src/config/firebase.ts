// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBErNoHXnuV7pbseYhjetFi3mzJiZ_ObEQ",
  authDomain: "atsresume-58fb9.firebaseapp.com",
  projectId: "atsresume-58fb9",
  storageBucket: "atsresume-58fb9.firebasestorage.app",
  messagingSenderId: "481615823611",
  appId: "1:481615823611:web:73b90e0588df24439e265e",
  measurementId: "G-H7RMWTTESW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
