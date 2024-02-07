// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfdd7lZrDAHZQvPLgvIoMHphfZsW8-jms",
  authDomain: "tier-dating.firebaseapp.com",
  databaseURL: "https://tier-dating-default-rtdb.firebaseio.com",
  projectId: "tier-dating",
  storageBucket: "tier-dating.appspot.com",
  messagingSenderId: "641741913591",
  appId: "1:641741913591:web:3b450ee620e9005fa4c2f2",
  measurementId: "G-EY1MT9MY7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
