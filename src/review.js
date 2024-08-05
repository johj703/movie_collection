// 필요한 Firebase SDK 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// API 키와 옵션 임포트
import { DEFAPIKEY } from "./apikey.js";
const { API_KEY, options, FIREBASECONFIG, BASEURL } = DEFAPIKEY;

// Firebase 초기화
const app = initializeApp(FIREBASECONFIG);
const db = getFirestore(app);

// 영화 ID를 URL 쿼리 파라미터에서 가져오기
const URLPARAMS = new URLSearchParams(window.location.search);
const MOVIEID = URLPARAMS.get('id');

// HTML 요소 가져오기
const MOVIEPOSTER = document.getElementById("movie_poster");
const MOVIETITLE = document.getElementById("movie_title");
const MOVIETAGLINE = document.getElementById("movie_tagline");
const MOVIEVOTEAVERAGE = document.getElementById("movie_vote_average");
const MOVIEGENRES = document.getElementById("movie_genres");
const MOVIERELEASEDATE = document.getElementById("movie_release_date");
const MOVIERUNTIME = document.getElementById("movie_runtime");
const MOVIEOVERVIEWTEXT = document.getElementById("movie_overview_text");

// 영화 상세 정보를 가져오는 비동기 함수
async function getMovieDetails() {
    try {
        const URL = `${BASEURL}3/movie/${MOVIEID}?api_key=${API_KEY}&language=ko-KR`;
        console.log(`Fetching movie details from: ${URL}`);

        const RESPONSE = await fetch(URL, options);

        if (!RESPONSE.ok) {
            throw new Error(`HTTP error! status: ${RESPONSE.status}`);
        }

        const MOVIE = await RESPONSE.json();
        console.log("Received movie details:", MOVIE);

        // 영화 상세 정보를 페이지에 표시
        MOVIEPOSTER.src = `https://image.tmdb.org/t/p/w500/${MOVIE.poster_path}`;
        MOVIETITLE.textContent = MOVIE.title;
        MOVIETAGLINE.textContent = MOVIE.tagline;
        MOVIEVOTEAVERAGE.textContent = "평점 : " + MOVIE.vote_average.toFixed(1);
        MOVIEGENRES.innerHTML = MOVIE.genres.map(genre => `<span class="genre">${genre.name}</span>`).join(', ');
        MOVIERELEASEDATE.textContent = `상영날짜 ${MOVIE.release_date}`;
        MOVIERUNTIME.textContent = `상영시간: ${MOVIE.runtime} 분`;
        MOVIEOVERVIEWTEXT.textContent = MOVIE.overview;
    } catch (error) {
        console.log("Error fetching movie details:", error);
    }
}

// 영화 상세 정보 가져오기 호출
getMovieDetails();

// 리뷰 폼 제출 버튼에 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submit_review").addEventListener("click", async (event) => {
    // 폼 제출 처리
    event.preventDefault();
    const user = document.getElementById("review_author").value;
    const password = document.getElementById("review_password").value;
    const reviewContent = document.getElementById("review_content").value;

    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        movieId: MOVIEID,
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
    const q = query(collection(db, "reviews"), where("movieId", "==", MOVIEID));
    const querySnapshot = await getDocs(q);
    const reviewsContainer = document.getElementById("reviews");
    if (reviewsContainer) {
      reviewsContainer.innerHTML = ""; // 기존 리뷰 내용 삭제
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review_item");
        reviewElement.innerHTML = `
          <div class="review_author">${data.user}</div>
          <div class="review_content">${data.reviewContent}</div>
        `;
        reviewsContainer.appendChild(reviewElement);
      });
    } else {
      console.error("Element with id 'reviews' not found.");
    }
  } catch (e) {
    console.error("리뷰 가져오기 오류: ", e);
  }
}

// 페이지 로드 시 리뷰 가져오기 호출
fetchReviews();