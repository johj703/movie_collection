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

firebaseConfig.initializeApp(firebaseConfig);
const db = firebase.firestore();

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