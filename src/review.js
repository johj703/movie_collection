// 필요한 Firebase SDK 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

console.log(1);

// Firebase의 제품을 사용하기 위해 필요한 SDK 추가
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase 웹 앱의 설정
// Firebase JS SDK v7.20.0 이상에서는 measurementId는 선택사항입니다.
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

// 리뷰 폼 제출 버튼에 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".review-Form").addEventListener("submit", async (event) => {
    // 폼 제출 처리
    event.preventDefault();
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    const reviewContent = document.getElementById("review").value;
    
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        user: user,
        password: password,
        reviewContent: reviewContent,
      });
      console.log("리뷰가 등록되었습니다: ", docRef.id);
      alert("리뷰가 등록되었습니다.");
      fetchReviews();
    } catch (e) {
      console.error("리뷰 등록 중 오류 발생: ", e);
      alert("리뷰 등록 중 오류 발생: " + e);
    }
  });
});

// Firestore에서 리뷰 가져오기
async function fetchReviews() {
  try {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    const reviewsContainer = document.getElementById("reviewsContainer");
    if (reviewsContainer) {
      reviewsContainer.innerHTML = ""; // 기존 리뷰 내용 삭제
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `
          <strong>작성자:</strong> ${data.user} <br>
          <strong>리뷰:</strong> ${data.reviewContent} <br>
        `;
        reviewsContainer.appendChild(reviewElement);
      });
    } else {
      console.error("Element with id 'reviews-container' not found.");
    }
  } catch (e) {
    console.error("리뷰 가져오기 오류: ", e);
  }
}