
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJmTq--eHXduo58hKcU_3vbrh59MalqbM",
  authDomain: "monetapp-9642a.firebaseapp.com",
  projectId: "monetapp-9642a",
  storageBucket: "monetapp-9642a.appspot.com",
  messagingSenderId: "938148996303",
  appId: "1:938148996303:web:72201d2ac963f5ad8ec3ba",
  measurementId: "G-ES2B4PLCY4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);