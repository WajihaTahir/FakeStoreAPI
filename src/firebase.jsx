// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDquqhtBZtzlKgFCy-N-j2M7PK-CJ5REk0",
  authDomain: "fir-auth-ac0eb.firebaseapp.com",
  projectId: "fir-auth-ac0eb",
  storageBucket: "fir-auth-ac0eb.appspot.com",
  messagingSenderId: "264537033114",
  appId: "1:264537033114:web:0f5f1c9cbf63ea352a1223"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  //to check which user is authenticated
export {app, auth};

