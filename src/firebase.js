// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCLJ_oeLYi7GF9h_9Z1t38dBeFuneXL_s",
  authDomain: "thesis-ou.firebaseapp.com",
  projectId: "thesis-ou",
  storageBucket: "thesis-ou.appspot.com",
  messagingSenderId: "374793303687",
  appId: "1:374793303687:web:c374bd27155e0bce5c6a22",
  measurementId: "G-1W47JDVVGT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
