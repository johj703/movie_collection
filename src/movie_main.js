// API키와 옵션 임포트
import { DEFAPIKEY } from "./apikey.js";
const { API_KEY, options } = DEFAPIKEY;

// 영화 데이터를 저장할 전역 배열
let $movies = [];

// HTML에서 영화 카드를 표시할 컨테이너 요소를 가져옴
const MOVIE_CAROUSEL_TRACK = document.getElementById("movie-carousel-track");
const MAIN_CAROUSEL_CONTAINER = document.getElementById(
  "main-carousel-container"
);
const MOVIE_CAROUSEL = document.getElementById("movie-carousel");
const SEARCH_INPUT = document.getElementById("search-input");
const SEARCH_BUTTON = document.getElementById("search-button");
const PREV_MOVIE_BTN = document.getElementById("prevMovieBtn");
const NEXT_MOVIE_BTN = document.getElementById("nextMovieBtn");
const LOGO = document.getElementById("logo");

let $currentIndex = 0;

// 영화 데이터를 가져오는 비동기 함수
async function getMovies() {
  try {
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    console.log(`Fetching data from: ${URL}`);

    const RESPONSE = await fetch(URL, options);

    if (!RESPONSE.ok) {
      throw new Error(`HTTP error! status: ${RESPONSE.status}`);
    }

    const DATA = await RESPONSE.json();
    console.log("Received data:", DATA);

    // 파싱된 데이터에서 영화 목록을 추출하여 전역 변수에 저장
    $movies = DATA.results;
    // 영화를 화면에 표시하는 함수를 호출
    displayMovies();
  } catch (error) {
    console.log("Error fetching movies:", error);
  }
}

// 영화를 화면에 출력하는 함수
function displayMovies() {
  // 기존 내용 지우기
  MOVIE_CAROUSEL_TRACK.innerHTML = "";

  // 각 영화 객체에 대해 반복함(forEach 사용)
  $movies.forEach((movie) => {
    // 새로운 div 요소를 생성하여 카드를 만듬
    const CARD = document.createElement("div");
    // CARD div 요소에 클래스네임 추가
    CARD.classList.add("card");

    // 영화 이미지
    const POSTER = document.createElement("img");
    POSTER.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    POSTER.alt = movie.title;
    POSTER.classList.add("card_img");
    CARD.appendChild(POSTER);

    // 영화 평점 뱃지 생성
    const RATING_BADGE = document.createElement("div");
    RATING_BADGE.innerText = `평점 : ${movie.vote_average.toFixed(1)} / 10`;
    RATING_BADGE.classList.add("reating_badge");
    CARD.appendChild(RATING_BADGE);

    // 영화 평점 생성
    const RATING = document.createElement("p");
    RATING.innerText = `평점: ${movie.vote_average}`;
    CARD.appendChild(RATING);

    // 카드 클릭 이벤트 추가
    CARD.addEventListener("click", () => {
      window.location.href = `/html/movie_detail.html?id=${movie.id}`;
    });

    // 완성된 카드를 컨테이너에 추가
    MOVIE_CAROUSEL_TRACK.appendChild(CARD);
  });
  updateCarousel(); // 캐러셀 업데이트 호출
}

// 캐러셀을 이동시키는 함수
function updateCarousel() {
  const TRACK_WIDTH = MOVIE_CAROUSEL_TRACK.offsetWidth;
  const CARD_WIDTH = TRACK_WIDTH / 4; // 4개 카드가 한 줄에 표시되므로

  // 현재 인덱스에 따른 위치 계산
  let translateXValue = -($currentIndex * CARD_WIDTH);

  // 위치가 -3330.25px을 초과하면 처음으로 이동
  if (translateXValue <= -3430.25) {
    getMovies(); // 처음 데이터를 다시 불러오기
    $currentIndex = 0;
    translateXValue = 0;
  }

  MOVIE_CAROUSEL_TRACK.style.transform = `translateX(${translateXValue}px)`;
}

// 이전 버튼 클릭 이벤트 리스너 추가
PREV_MOVIE_BTN.addEventListener("click", () => {
  if ($currentIndex > 0) {
    $currentIndex--;
  } else {
    $currentIndex = $movies.length - 4; // 처음 카드일 경우 마지막 카드로 이동
  }
  updateCarousel();
});

// 다음 버튼 클릭 이벤트 리스너 추가
NEXT_MOVIE_BTN.addEventListener("click", () => {
  $currentIndex++;
  updateCarousel();
});

// 문자열에서 모든 공백을 제거하는 함수
function removeAllSpaces(str) {
  return str.replace(/\s+/g, "");
}

// 개선된 검색 기능
async function searchMovies() {
  const QUERY = removeAllSpaces(SEARCH_INPUT.value.trim().toLowerCase());

  // 유효성 검사: 검색어가 비어있는지 확인
  if (!QUERY) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "검색어를 입력하세요.",
      showConfirmButton: false,
      timer: 1500,
    });
    showAllCards();
    MAIN_CAROUSEL_CONTAINER.style.display = "block";
    MOVIE_CAROUSEL.style.display = "block";
    return;
  }

  try {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      QUERY
    )}&language=ko-KR&page=1`;
    console.log(`Fetching search results from: ${URL}`);

    const RESPONSE = await fetch(URL, options);

    if (!RESPONSE.ok) {
      throw new Error(`HTTP error! status: ${RESPONSE.status}`);
    }

    const DATA = await RESPONSE.json();
    console.log("Received search data:", DATA);

    // 검색 결과가 없을 경우 팝업창으로 알림
    if (DATA.results.length === 0) {
      Swal.fire("검색 결과가 없습니다!", "정확히 입력해주세요.", "warning");
      showAllCards();
      return;
    }

    // 검색된 영화 목록을 전역 변수에 저장하고 화면에 표시
    $movies = DATA.results;
    displayMovies();
  } catch (error) {
    console.log("Error fetching search results:", error);
  }

  // 검색 결과에 따라 캐러셀 보이기/숨기기
  if (MAIN_CAROUSEL_CONTAINER && MOVIE_CAROUSEL) {
    MAIN_CAROUSEL_CONTAINER.style.display = "none";
    MOVIE_CAROUSEL.style.display = "none";
  }
}

// 모든 카드를 표시하는 함수
function showAllCards() {
  const CARDS = document.querySelectorAll(".card");
  CARDS.forEach((card) => (card.style.display = "block"));
}

// 로고 클릭 시 페이지 리로드
LOGO.addEventListener("click", () => {
  location.reload();
});

// 검색 버튼 클릭시 이벤트리스너 추가
SEARCH_BUTTON.addEventListener("click", searchMovies);
SEARCH_INPUT.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchMovies();
  }
});

getMovies();