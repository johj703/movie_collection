// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , collection, addDoc, query, orderBy ,onSnapshot }from 'firebase/firestore';

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

//리뷰폼제출 버튼에 이벤트 리스너 추가 . 
document.querySelector('.review-Form').addEventListener('submit', async (event) => {
 //새로고침막아주기 
  event.preventDefault();

  //작성자 , 비밀번호 리뷰 ,html 가져오기 
  const user =document.getElementById ('user').value;
  const password =document.getElementById('password').value;
  const reviewContent = document.getElementById('review').value

let doc={
  user:user, //작성자
  password:password , //비밀번호 
  content: reviewContent//리뷰내용 
};

try {
  // 리뷰 문서 추가 
  await addDoc(collection(db, 'reviews'), doc);
  console.log('리뷰가 추가되었습니다.');
} catch (e) {
  // 에러 발생시 에러 메세지
  console.error('ERROR 404 ', e);
}
});

// Function to load and display reviews
const loadReviews = () => {
  const q = query(collection(db, 'reviews'), orderBy('author', 'asc'));  //작성자 기준으로 정렬 
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = ''; // Clear previous reviews
    querySnapshot.forEach((doc) => {
      const review = doc.data();
      const reviewElement = document.createElement('div');
      reviewElement.textContent = `${review.author}: ${review.content}`;
      reviewsContainer.appendChild(reviewElement);
    });
  });
};

// Call loadReviews to load and display reviews when the page loads
document.addEventListener('DOMContentLoaded', function() {
  loadReviews();
});