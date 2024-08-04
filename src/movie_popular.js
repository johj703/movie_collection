import { DEFAPIKEY } from "./apikey.js";
const { API_KEY } = DEFAPIKEY;

// API 데이터 불러오기
async function getPopularMovie() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`
    );
    const data = await response.json();
    console.log("Popular movies:", data);
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

// 단일 영화 객체를 받아 HTML 카드로 변환하는 함수
function createMovieCard(movie) {
  const CARD = document.createElement("div");
  CARD.className = "card";

  const POSTERPATH = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300";

  CARD.innerHTML = `
    <img class="movie-poster" src="${POSTERPATH}" alt="${movie.title}">
    <div class="reating_badge">평점 : ${movie.vote_average.toFixed(1)} / 10</div>
  `;

  CARD.addEventListener("click", () => {
    window.location.href = `/html/movie_detail.html?id=${movie.id}`;
  });

  return CARD;
}

// 영화 데이터를 가져와서 화면에 표시하는 비동기 함수
async function displayMovies(containerId) {
  const movies = await getPopularMovie();
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with ID '${containerId}' not found.`);
    return;
  }

  container.innerHTML = ""; // Clear previous content

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    container.appendChild(card);
  });
}

// 초기 페이지 로드 시 영화를 표시
displayMovies("movies-container");

// 네비게이션 이벤트 리스너
document.getElementById("views-link_Views").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".container").style.display = "none";
  document.querySelector(".movie-carousel").style.display = "none";
  document.querySelector(".movies_container").style.display = "flex";
  displayMovies("movies-container2");
  history.pushState(null, "", "#Views");
});

// 뒤로가기 이벤트 처리
window.addEventListener("popstate", function () {
  if (location.hash !== "#Views") {
    document.querySelector(".container").style.display = "block";
    document.querySelector(".movie-carousel").style.display = "block";
    document.querySelector(".movies_container").style.display = "none";
    document.getElementById("movies-container2").style.display = "none";
    displayMovies("movies-container");
  }
});