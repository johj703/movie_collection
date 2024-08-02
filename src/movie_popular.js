import { DEFAPIKEY } from "./apikey.js";
const { API_KEY, options } = DEFAPIKEY;

// API 데이터 불러오기
async function getPopularMovie() {
  try {
    const RESPONSE = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    const DATA = await RESPONSE.json();
    console.log("Popular movies:", DATA);
    return DATA.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

// 단일 영화 객체를 받아 HTML 카드로 변환하는 함수
function createMovieCard(movie) {
  const CARD = document.createElement("div");
  CARD.className = "movie-card";

  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300";

  CARD.innerHTML = `
    <img class="movie-poster" src="${posterPath}" alt="${movie.title}">
    <div class="movie-rating">평점 : ${movie.vote_average.toFixed(1)} / 10</div>
  `;

  return CARD;
}

// 영화 데이터를 가져와서 화면에 표시하는 비동기 함수
async function displayMovies(containerId) {
  const MOVIES = await getPopularMovie();
  const CONTAINER = document.getElementById(containerId);
  CONTAINER.innerHTML = ""; // Clear existing content

  MOVIES.forEach((movie) => {
    const CARD = createMovieCard(movie);
    CONTAINER.appendChild(CARD);
  });
}

// 초기 페이지 로드 시 영화를 표시
displayMovies("movies-container");

// 네비게이션 이벤트 리스너
document.getElementById("views-link").addEventListener("click", function (e) {
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
    displayMovies("movies-container");
  }
});
