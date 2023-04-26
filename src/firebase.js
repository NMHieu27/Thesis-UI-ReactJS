// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4hK2MCoFX7GVNRfaCpW-azbTnH2MJ3zQ",
  authDomain: "chat-thisis.firebaseapp.com",
  projectId: "chat-thisis",
  storageBucket: "chat-thisis.appspot.com",
  messagingSenderId: "837648834115",
  appId: "1:837648834115:web:490807fd0fec55f3c27ef6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
