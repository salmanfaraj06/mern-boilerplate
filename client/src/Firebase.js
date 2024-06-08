// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-template-1938f.firebaseapp.com",
  projectId: "mern-template-1938f",
  storageBucket: "mern-template-1938f.appspot.com",
  messagingSenderId: "579699338553",
  appId: "1:579699338553:web:d4f4cca32f579c6c3f8ce8",
  measurementId: "G-DC0JFQ9T06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);