// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBH-68OKDXLEkoY9-sW_QU_Eed5zYs8JKA",
  authDomain: "tier-dating.firebaseapp.com",
  databaseURL: "https://tier-dating-default-rtdb.firebaseio.com",
  projectId: "tier-dating",
  storageBucket: "tier-dating.appspot.com",
  messagingSenderId: "641741913591",
  appId: "1:641741913591:web:3b450ee620e9005fa4c2f2",
  measurementId: "G-EY1MT9MY7P"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBEYz48BHlZHaYdztk6rJSC9nzGXrCALuA",
//   authDomain: "dating-app-3435c.firebaseapp.com",
//   projectId: "dating-app-3435c",
//   storageBucket: "dating-app-3435c.appspot.com",
//   messagingSenderId: "280035691921",
//   appId: "1:280035691921:web:651e83a7c5be14bea6de30",
//   measurementId: "G-PBW0CPHZPJ"
// };

 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);