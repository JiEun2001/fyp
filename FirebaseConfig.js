// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7FokrdByCyqk9abVBLVfnhQLmt3g8XKs",
  authDomain: "fyp-sva.firebaseapp.com",
  projectId: "fyp-sva",
  storageBucket: "fyp-sva.appspot.com",
  messagingSenderId: "1031172638451",
  appId: "1:1031172638451:web:b1426acddad5fac993d986",
  measurementId: "G-CVK87FZ8T8",
  databaseURL: "https://fyp-sva-default-rtdb.asia-southeast1.firebasedatabase.app/",
};


// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// export const FIREBASE_DATABASE = getDatabase();


const analytics = getAnalytics(FIREBASE_APP);