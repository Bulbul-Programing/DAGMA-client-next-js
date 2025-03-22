// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrLVS0h3yTZQoEy1ba-HbqeZPRpGxcUQU",
  authDomain: "dagma-edu-next.firebaseapp.com",
  projectId: "dagma-edu-next",
  storageBucket: "dagma-edu-next.firebasestorage.app",
  messagingSenderId: "909610284072",
  appId: "1:909610284072:web:9825e91ec996d00f3ab11d",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export default app;
