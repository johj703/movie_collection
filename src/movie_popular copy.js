import { DEFAPIKEY } from './apikey.js';
const { API_KEY } = DEFAPIKEY;

// API 데이터 불러오기
async function getTopRatedMovies() {
  try {
    const RESPONSE = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`
    );
    const DATA = await RESPONSE.json();
    console.log('Top rated movies:', DATA);
    return DATA.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
}

// 단일 영화 객체를 받아 HTML 카드로 변환하는 함수
function createMovieCard(movie) {
  const CARD = document.createElement('div');
  CARD.className = 'movie-card';

  const POSTERPATH = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/200x300';

  CARD.innerHTML = `
    <img class="movie-poster" src="${POSTERPATH}" alt="${movie.title}">
    <div class="rating_badge">평점 : ${movie.vote_average.toFixed(1)} / 10</div>
  `;

  CARD.addEventListener('click', () => {
    window.location.href = `/html/movie_detail.html?id=${movie.id}`;
  });

  return CARD;
}

// 영화 데이터를 가져와서 화면에 표시하는 비동기 함수
async function displayMovies(containerId) {
  const MOVIES = await getTopRatedMovies();
  const CONTAINER = document.getElementById(containerId);

  if (!CONTAINER) {
    console.error(`Container with ID '${containerId}' not found.`);
    return;
  }

  CONTAINER.innerHTML = ''; // Clear previous content

  MOVIES.forEach((movie) => {
    const CARD = createMovieCard(movie);
    CONTAINER.appendChild(CARD);
  });
}

// 최고의 평점 영화를 캐러셀에 표시하는 함수
async function displayTopRatedMoviesCarousel() {
  const MOVIES = await getTopRatedMovies();
  const CAROUSEL_TRACK = document.getElementById(
    'top-rated-movie-carousel-track'
  );

  if (!CAROUSEL_TRACK) {
    console.error('Top rated movie carousel track not found.');
    return;
  }

  CAROUSEL_TRACK.innerHTML = '<h3 style="color: white"><최고의 평점></h3>'; // Reset content

  MOVIES.forEach((movie) => {
    const CARD = createMovieCard(movie);
    CAROUSEL_TRACK.appendChild(CARD);
  });

  // 캐러셀 네비게이션 기능 추가
  const prevBtn = document.getElementById('prevTopRatedMovieBtn');
  const nextBtn = document.getElementById('nextTopRatedMovieBtn');
  let scrollPosition = 0;

  nextBtn.addEventListener('click', () => {
    scrollPosition += 200; // Adjust this value based on your card width
    CAROUSEL_TRACK.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  });

  prevBtn.addEventListener('click', () => {
    scrollPosition -= 200; // Adjust this value based on your card width
    CAROUSEL_TRACK.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  });
}

// 페이지 요소 표시/숨김 함수
function togglePageElements(showTopRated) {
  const container = document.querySelector('.container');
  const popularCarousel = document.querySelector('#movie-carousel');
  const topRatedCarousel = document.querySelector('#top-rated-movie-carousel');
  const moviesContainer = document.querySelector('.movies_container');
  const navigationContainer = document.querySelector(
    '.movies-navigation-container'
  );

  if (showTopRated) {
    container.style.display = 'none';
    popularCarousel.style.display = 'none';
    topRatedCarousel.style.display = 'none';
    moviesContainer.style.display = 'none';
    navigationContainer.style.display = 'flex';
  } else {
    container.style.display = 'block';
    popularCarousel.style.display = 'block';
    topRatedCarousel.style.display = 'block';
    moviesContainer.style.display = 'none';
    navigationContainer.style.display = 'none';
  }
}

// 네비게이션 이벤트 리스너
document
  .getElementById('views-link_Views')
  .addEventListener('click', function (e) {
    e.preventDefault();
    togglePageElements(true);
    displayMovies('movies-navigation-container');
    history.pushState(null, '', '#Views');
  });

// 메인 페이지로 돌아가는 함수
function returnToMainPage() {
  togglePageElements(false);
  history.pushState(null, '', '/');
}

// 로고 클릭 이벤트 리스너
document.getElementById('logo').addEventListener('click', function (e) {
  e.preventDefault();
  returnToMainPage();
});

// 뒤로가기 이벤트 처리
window.addEventListener('popstate', function () {
  if (location.hash === '#Views') {
    togglePageElements(true);
    displayMovies('movies-navigation-container');
  } else {
    returnToMainPage();
  }
});

// 초기 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function () {
  togglePageElements(false);
  displayTopRatedMoviesCarousel(); // 최고의 평점 캐러셀 표시
});
