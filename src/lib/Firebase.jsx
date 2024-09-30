import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvIsVYR03Jnhd3HZQ4mImsw9W1fn3PQy0",
  authDomain: "nexchat-b2fbd.firebaseapp.com",
  projectId: "nexchat-b2fbd",
  storageBucket: "nexchat-b2fbd.appspot.com",
  messagingSenderId: "493852947339",
  appId: "1:493852947339:web:639aaf7ebee58b410fb58e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =  getAuth();
export const db = getFirestore();
