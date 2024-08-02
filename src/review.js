// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore }from 'firebase/firestore';



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


// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

//리뷰폼제출 버튼에 이벤트 리스너 추가 . 
document.querySelector('.review-Form').addEventListener('submit', async (event) => {
 //새로고침막아주기 
  event.preventDefault();

  //작성자 , 비밀번호 리뷰 ,html 가져오기 
  const user =document.getElementById ('user').value;
  const password =document.getElementById('password').value;
  const reviewContent = document.getElementById('review').value



import { collection, addDoc } from "firebase/firestore"; 

try {
  const docRef = await addDoc(collection(db, "reviews"), {
    user: "user",//작성자
    password: "password",//비밀번호
    reviewContent: "review"//리뷰내용
  });
  console.log("리뷰가 등록되었습니다: ", docRef.id);//리뷰추가시 
} catch (e) {
  console.error("Error 404: ", e); //리뷰에러시
}

import { collection, getDocs } from "firebase/firestore"; 
//firestore 에서 reviews 컬렉선 모든 문서 가져오기 
const querySnapshot = await getDocs(collection(db, "reviews"));
querySnapshot.forEach((doc) => { //가져온 데이터 반복 
  console.log(`${doc.id} => ${doc.data()}`);  //id 와 데이터를 콘솔에출력
});