// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH_muR1nncKVk1561I4WUgtPGjCcAsUG4",
  authDomain: "reactapp-600cf.firebaseapp.com",
  databaseURL: "https://reactapp-600cf-default-rtdb.firebaseio.com",
  projectId: "reactapp-600cf",
  storageBucket: "reactapp-600cf.firebasestorage.app",
  messagingSenderId: "763827779648",
  appId: "1:763827779648:web:00c9b182fb0b04fe8947a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const db = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
