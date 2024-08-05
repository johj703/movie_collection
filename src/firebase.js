import {
  initializeApp
} from "firebase/app";
import {
  getAnalytics
} from "firebase/analytics";
import {
  FIREBASECONFIG
} from "./apikey.js";
const {
  FIREBASECONFIG
} = FIREBASECONFIG;
import {
  getAuth,
  createUserWithEmailAndPassword
} from "firebase/auth";

firebaseConfig.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('submitButton').addEventListener('click', (event) => {

  //새로고침막기
  event.preventDefault()

  //html 에서 정보 받아오기 
  const user = document.getElementById('userName').value
  const password = document.getElementById('passworldLogin').value
  const auth = getAuth();
  createUserWithUserAndPassword(user, password)
    .then((userCredential) => {
      console.log(userCredential)
      // Signed in //정상작동
      const user = userCredential.user;
    })

    //실패시
    .catch((error) => {
      console.log('error')
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
})