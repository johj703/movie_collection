// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbu7PSND0vXhPLkmxmPS5PQyrZbE9oOTo",
  authDomain: "teammovie-66f0f.firebaseapp.com",
  projectId: "teammovie-66f0f",
  storageBucket: "teammovie-66f0f.appspot.com",
  messagingSenderId: "607236733584",
  appId: "1:607236733584:web:62d6974161c28ffa187615",
  measurementId: "G-TJ9V2VGZZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 