// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
