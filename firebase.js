// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2Eaw65CFf9LKMPio3vU_BhSm6sWKPJf4",
  authDomain: "gaming-linkedin.firebaseapp.com",
  projectId: "gaming-linkedin",
  storageBucket: "gaming-linkedin.appspot.com",
  messagingSenderId: "207295354015",
  appId: "1:207295354015:web:e7264ec900b9d28f693eaa"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage}; 
