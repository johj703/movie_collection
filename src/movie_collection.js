// API키와 옵션 임포트
import { DEFAPIKEY } from "./apikey.js";
const { API_KEY, options } = DEFAPIKEY;

// 영화 데이터를 저장할 전역 배열
let $movies = [];

// HTML에서 영화 카드를 표시할 컨테이너 요소를 가져옴
const MOVIES_CONTAINER = document.getElementById("movies_container");

// 검색 입력 필드와 버튼 요소 가져오기
const SEARCH_INPUT = document.getElementById("search-input");
const SEARCH_BUTTON = document.getElementById("search-button");

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
  MOVIES_CONTAINER.innerHTML = "";

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

    // 영화 제목
    // const TITLE = document.createElement("h2");
    // TITLE.innerText = movie.title;
    // CARD.appendChild(TITLE);

    // 영화 평점 뱃지 생성
    const RETIMG_BADGE = document.createElement("div");
    RETIMG_BADGE.innerText = `평점 : 10 / ${movie.vote_average.toFixed(1)}`;
    RETIMG_BADGE.classList.add("reating_badge");
    CARD.appendChild(RETIMG_BADGE);
    // // 영화 개요
    // const OVERVIEW = document.createElement("p");
    // OVERVIEW.innerText = movie.overview;
    // CARD.appendChild(OVERVIEW);

    // 카드 클릭 이벤트 추가
    CARD.addEventListener("click", () => {
      alert(`영화 ID: ${movie.id}`);

    });

    // 완성된 카드를 컨테이너에 추가
    MOVIES_CONTAINER.appendChild(CARD);
  });
}

// 문열에서 모든 공백을 제거하는 함수
function removeAllSpaces(str) {
  return str.replace(/\s+/g, "");
}

// 개선된 검색 기능
function searchMovies() {
  const QUERY = removeAllSpaces(SEARCH_INPUT.value.trim().toLowerCase());

  // 유효성 검사: 검색어가 비어있는지 확인
  if (!QUERY) {
    alert("검색어를 입력하세요.");
    showAllCards();
    return;
  }

  // 모든 영화 카드 선택 및 검색결과가 있는지 추적하는 변수 세팅
  const CARDS = document.querySelectorAll(".card");
  let $hasResult = false;

  // 검색어와 일치하는지 확인하는 함수
  CARDS.forEach((card, index) => {
    const TITLE = removeAllSpaces($movies[index].title.toLowerCase());
    if (TITLE.includes(QUERY)) {
      card.style.display = "block";
      $hasResult = true;
    } else {
      card.style.display = "none";
    }
  });

  // 검색 결과가 없을 경우 팝업창으로 알림
  if (!$hasResult) {
    alert("검색 결과가 없습니다.");
    showAllCards();
  }
}

// 모든 카드를 표시하는 함수
function showAllCards() {
  const CARDS = document.querySelectorAll(".card");
  CARDS.forEach((card) => (card.style.display = "block"));
}

// 검색 버튼 클릭시 이벤트리스너 추가
SEARCH_BUTTON.addEventListener("click", searchMovies);
SEARCH_INPUT.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchMovies();
  }
});

getMovies();
