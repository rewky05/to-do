// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {//hide these keys in a .env file?
  apiKey: "I",
  authDomain: "hid",
  projectId: "the",
  storageBucket: "key",
  messagingSenderId: "this won't work",
  appId: "without your own key"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)