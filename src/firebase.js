
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

//firebase reset 
firebaseConfig.initializeApp(firebaseConfig);
const db= firebase.firestore(); 

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

document.getElementById('submitButton').addEventListener('click',(event) =>{
 
//새로고침막기
  event.preventDefault()

  //html 에서 정보 받아오기 
    const user = document.getElementById('userName').value
    const password= document.getElementById('passworldLogin').value 
    const auth = getAuth();
  createUserWithUserAndPassword( user, password)
    .then((userCredential) => {
      console.log(userCredential)
      // Signed in //정상작동
      const user = userCredential.user;
      // ...
    })

    //실패시
    .catch((error) => {
      console.log('error')
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  })