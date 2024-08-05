import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { DEFAPIKEY } from "./apikey.js";

const { API_KEY, options, FIREBASECONFIG, BASEURL } = DEFAPIKEY;

// Firebase 초기화
const app = initializeApp(FIREBASECONFIG);
const db = getFirestore(app);

// 영화 ID를 URL 쿼리 파라미터에서 가져오기
const MOVIEID = new URLSearchParams(window.location.search).get('id');

// HTML 요소 가져오기
const elements = {
  moviePoster: document.getElementById("movie_poster"),
  movieTitle: document.getElementById("movie_title"),
  movieTagline: document.getElementById("movie_tagline"),
  movieVoteAverage: document.getElementById("movie_vote_average"),
  movieGenres: document.getElementById("movie_genres"),
  movieReleaseDate: document.getElementById("movie_release_date"),
  movieRuntime: document.getElementById("movie_runtime"),
  movieOverviewText: document.getElementById("movie_overview_text"),
  submitReviewButton: document.getElementById("submit_review"),
  reviewsContainer: document.getElementById("reviews")
};

// 영화 상세 정보를 페이지에 표시
const displayMovieDetails = (movie) => {
  elements.moviePoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  elements.movieTitle.textContent = movie.title;
  elements.movieTagline.textContent = movie.tagline;
  elements.movieVoteAverage.textContent = `평점: ${movie.vote_average.toFixed(1)}`;
  elements.movieGenres.innerHTML = movie.genres.map(genre => `<span class="genre">${genre.name}</span>`).join(', ');
  elements.movieReleaseDate.textContent = `상영날짜: ${movie.release_date}`;
  elements.movieRuntime.textContent = `상영시간: ${movie.runtime} 분`;
  elements.movieOverviewText.textContent = movie.overview;
};

// 영화 상세 정보 가져오기
const fetchMovieDetails = async () => {
  try {
    const response = await fetch(`${BASEURL}3/movie/${MOVIEID}?api_key=${API_KEY}&language=ko-KR`, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const movie = await response.json();
    displayMovieDetails(movie);
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};

// 리뷰 폼 제출 처리
const submitReview = async (event) => {
  event.preventDefault();
  const user = document.getElementById("review_author").value;
  const password = document.getElementById("review_password").value;
  const reviewContent = document.getElementById("review_content").value;

  try {
    await addDoc(collection(db, "reviews"), { movieId: MOVIEID, user, password, reviewContent });
    alert("리뷰가 등록되었습니다.");
    fetchReviews();
  } catch (e) {
    console.error("리뷰 등록 중 오류 발생:", e);
    alert("리뷰 등록 중 오류 발생: " + e);
  }
};

// 리뷰를 HTML로 변환
const createReviewElement = (data, reviewId) => {
  const reviewElement = document.createElement("div");
  reviewElement.classList.add("review_item");
  reviewElement.innerHTML = `
    <div class="review_author">${data.user}</div>
    <div class="review_content">${data.reviewContent}</div>
    <button class="edit_review" data-id="${reviewId}">수정</button>
    <button class="delete_review" data-id="${reviewId}">삭제</button>
  `;
  return reviewElement;
};

// 리뷰 목록 업데이트
const updateReviews = (querySnapshot) => {
  elements.reviewsContainer.innerHTML = ""; // 기존 리뷰 내용 삭제
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const reviewId = doc.id;
    elements.reviewsContainer.appendChild(createReviewElement(data, reviewId));
  });

  attachReviewEventListeners();
};

// 리뷰 이벤트 리스너
const attachReviewEventListeners = () => {
  elements.reviewsContainer.querySelectorAll(".edit_review").forEach(button => {
    button.addEventListener("click", async (event) => {
      const reviewId = event.target.getAttribute("data-id");
      const newContent = prompt("수정할 리뷰 내용을 입력하세요:");
      if (newContent) {
        try {
          await updateDoc(doc(db, "reviews", reviewId), { reviewContent: newContent });
          alert("리뷰가 수정되었습니다.");
          fetchReviews();
        } catch (e) {
          console.error("리뷰 수정 중 오류 발생:", e);
          alert("리뷰 수정 중 오류 발생: " + e);
        }
      }
    });
  });

  elements.reviewsContainer.querySelectorAll(".delete_review").forEach(button => {
    button.addEventListener("click", async (event) => {
      const reviewId = event.target.getAttribute("data-id");
      if (confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
        try {
          await deleteDoc(doc(db, "reviews", reviewId));
          alert("리뷰가 삭제되었습니다.");
          fetchReviews();
        } catch (e) {
          console.error("리뷰 삭제 중 오류 발생:", e);
          alert("리뷰 삭제 중 오류 발생: " + e);
        }
      }
    });
  });
};

// Firestore에서 리뷰 가져오기
const fetchReviews = async () => {
  try {
    const q = query(collection(db, "reviews"), where("movieId", "==", MOVIEID));
    const querySnapshot = await getDocs(q);
    updateReviews(querySnapshot);
  } catch (e) {
    console.error("리뷰 가져오기 오류:", e);
  }
};

// 초기화 함수
const initialize = () => {
  fetchMovieDetails();
  elements.submitReviewButton.addEventListener("click", submitReview);
  fetchReviews();
};

// 페이지 로드 시 초기화 호출
document.addEventListener("DOMContentLoaded", initialize);