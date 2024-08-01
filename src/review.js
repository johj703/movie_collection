// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import (getFirestone, query,orderBy , addDoc),   from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = 
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

// Initialize Cloud Firestore and get a reference to the service
const db= getFirestone (app);

document.querySelector('.review-Form').addEventListener('submit', async (event) => {
 //새로고침막아주기 
  event.preventDefault();

  //html 가져오기 
  const user =document.getElementById ('user').value;
  const password =document.getElementById('password').value;
  const review = document.getElementById('review').value

  user:user , 
  password: password,
  review:review,
}};

console.log()
catch ( )


  
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });