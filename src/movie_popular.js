import { DEFAPIKEY } from "./apikey.js";
const { API_KEY, options } = DEFAPIKEY;

// API 데이터 불러오기
async function getPopularMovie() {
  try {
    const RESPONSE = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    const DATA = await RESPONSE.json();
    console.log("Popular movies:", DATA); // 여기에 콘솔 로그 추가
    return DATA.results;
  } catch (error) {
    console.log("Error fetching populr movies:", error);
    return [];
  }
}

// 단일 영화 객체를 받아 HTML 카드로 변환하는 함수
function createMovieCard(movie) {
  //새로운 div 요소 생성
  const CARD = document.createElement("div");
  CARD.className = "movie-card";

  // 영화 포스터 경로를 설정합니다. 포스터가 없으면 플레이스홀더 이미지를 사용합니다.
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300";

  // 카드의 HTML 내용 설정
  CARD.innerHTML = `
  <img class="movie-poster" src="${posterPath}" alt="${movie.title}"> 
    <div class="movie-rating">평점 : ${movie.vote_average.toFixed(1)} / 10</div>
`;

  return CARD;
}

// 영화 데이터를 가져와서 화면에 표시하는 비동기 함수
async function displayMovies() {
  const MOVIES = await getPopularMovie();
  const CONTAINER = document.getElementById("movies-container2");

  MOVIES.forEach((movie) => {
    const CARD = createMovieCard(movie);
    CONTAINER.appendChild(CARD);
  });
}

// 페이지 로드 시 영화를 표시하는 함수를 호출
displayMovies();
