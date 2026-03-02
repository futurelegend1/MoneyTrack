// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtBXrm7N8yykcWrnTG15uhtUfWBzOrk3g",
  authDomain: "moneytrack-6bdb5.firebaseapp.com",
  projectId: "moneytrack-6bdb5",
  storageBucket: "moneytrack-6bdb5.firebasestorage.app",
  messagingSenderId: "710532386679",
  appId: "1:710532386679:web:3f6a708ca1d1f25a90db72",
  measurementId: "G-96N3522RBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);