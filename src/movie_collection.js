// API키
const API_KEY = "485a7d173048113813de904df9f34a7f";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODVhN2QxNzMwNDgxMTM4MTNkZTkwNGRmOWYzNGE3ZiIsIm5iZiI6MTcyMTg2NzkxNS4wNjczNywic3ViIjoiNjVmZDRjYWQ3NzA3MDAwMTdjMGE4MTZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cbkZQGyQg8TkXQEW93ZyqtaR4dVrGhw2j-1FJPufuus",
  },
};

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
    const RESPONSE = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`,
      options
    );

    const DATA = await RESPONSE.json();
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
    //새로운 div요소를 생성하여 카드를 만듬
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
    const TITLE = document.createElement("h2");
    TITLE.innerText = movie.title;
    CARD.appendChild(TITLE);

    // 영화 개요
    const OVERVIEW = document.createElement("p");
    OVERVIEW.innerText = movie.overview;
    CARD.appendChild(OVERVIEW);

    // 영화 평점 생성
    const RATING = document.createElement("p");
    RATING.innerText = `평점: ${movie.vote_average}`;
    CARD.appendChild(RATING);

    //카드 클릭 이벤트 추가
    CARD.addEventListener("click", () => {
      alert(`영화 ID: ${movie.id}`);
    });

    // 완성된 카드를 컨테이너에 추가
    MOVIES_CONTAINER.appendChild(CARD);
  });
}

// 문자열에서 모든 공백을 제거하는 함수
function removeAllSpaces(str) {
  return str.replace(/\s+/g, "");
}

// 개선된 검색 기능
function searchMovies() {
  const query = removeAllSpaces(SEARCH_INPUT.value.trim().toLowerCase());

  // 유효성 검사: 검색어가 비어 있는지 확인
  if (!query) {
    alert("검색어를 입력하세요.");
    showAllCards();
    return;
  }

  const cards = document.querySelectorAll(".card");
  let hasResults = false;

  cards.forEach((card, index) => {
    const title = removeAllSpaces($movies[index].title.toLowerCase());
    if (title.includes(query)) {
      card.style.display = "block";
      hasResults = true;
    } else {
      card.style.display = "none";
    }
  });

  // 검색 결과가 없을 경우 팝업창으로 알림
  if (!hasResults) {
    alert("검색 결과가 없습니다.");
    showAllCards();
  }
}

// 모든 카드를 표시하는 함수
function showAllCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => (card.style.display = "block"));
}

// 검색 버튼 클릭 이벤트 리스너 추가
SEARCH_BUTTON.addEventListener("click", searchMovies);

// 검색 입력 필드에서 엔터 키 이벤트 리스너 추가
SEARCH_INPUT.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // 폼 제출 방지
    searchMovies();
  }
});

getMovies();
