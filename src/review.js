// 필요한 Firebase SDK 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

import { API_KEY, options, FIREBASECONFIG, BASEURL } from "./apikey.js";
const { API_KEY, options, FIREBASECONFIG, BASEURL } = DEFAPIKEY;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log(1);

console.log(2);

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