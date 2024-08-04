// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { db } from './firebase-config.js';
console.log(1);

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
  measurementId: "G-TJ9V2VGZZ6",
};

console.log(2);

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

console.log(3);

//리뷰폼제출 버튼에 이벤트 리스너 추가 .
document
  .querySelector(".review-Form")
  .addEventListener("submit", async (event) => {
    //새로고침막아주기
    event.preventDefault();

    //작성자 , 비밀번호 리뷰 ,html 가져오기
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    const reviewContent = document.getElementById("review").value;

    //리뷰를firestore에추가
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        user: "user", //작성자
        password: "password", //비밀번호
        reviewContent: "review", //리뷰내용
        timestamp: new Date() //리뷰 작성시간 기록 
      });
      alert("리뷰가 등록되었습니다."); // alert창 띄워주기
    } catch (e) {
      console.error("Error adding review: ", e); // 실패시 에러 표시 
    }
  });
//리뷰 가져오기  실시간 업뎃 
const loadReviews = () => {
  const q = query(collection(db, "reviews"), orderBy("timestamp", "desc")); //시간 내림차순으로 정렬 
  const unsubscribe = onSnapshot(q, (querySnapshot) => { //리뷰데이터 변경 실시간 받아옴  , 리뷰가 변경 될 때 마다 querysnapshot 에 저장 됨
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = ""; 
    querySnapshot.forEach((doc) => {
      const review = doc.data();
      const reviewElement = document.createElement("div");
      reviewElement.textContent = `${review.user}: ${review.reviewContent}`;
      reviewsContainer.appendChild(reviewElement);
    });
  });
};

loadReviews();