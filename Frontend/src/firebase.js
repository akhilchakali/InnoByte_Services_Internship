import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8YrNobE-SIf-9PMkLcGXCTa6pqtnWrPI",
  authDomain: "akhil-otp-validation-timepass.firebaseapp.com",
  projectId: "akhil-otp-validation-timepass",
  storageBucket: "akhil-otp-validation-timepass.appspot.com",
  messagingSenderId: "854215351751",
  appId: "1:854215351751:web:209d70bee3a9f0ab4c8de2"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();


export {db, getAuth, RecaptchaVerifier, signInWithPhoneNumber} 