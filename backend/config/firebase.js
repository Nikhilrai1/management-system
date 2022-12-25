// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZqkRlXm1w-263Dg365eAh-EmHXSGdms8",
  authDomain: "herald-management-system.firebaseapp.com",
  projectId: "herald-management-system",
  storageBucket: "herald-management-system.appspot.com",
  messagingSenderId: "556545246571",
  appId: "1:556545246571:web:9e4ab725878e26bf08382e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);