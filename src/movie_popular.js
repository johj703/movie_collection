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

  // CAROUSEL_TRACK.innerHTML = '<h3 style="color: white"><최고의 평점></h3>'; // Reset content

  MOVIES.forEach((movie) => {
    const CARD = createMovieCard(movie);
    CAROUSEL_TRACK.appendChild(CARD);
  });

  setupCarouselNavigation(
    'top-rated-movie-carousel-track',
    'prevTopRatedMovieBtn',
    'nextTopRatedMovieBtn'
  );
}

// 캐러셀 네비게이션 설정 함수
function setupCarouselNavigation(trackId, prevBtnId, nextBtnId) {
  const CAROUSEL_TRACK = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);

  if (!CAROUSEL_TRACK || !prevBtn || !nextBtn) {
    console.error('Carousel elements not found.');
    return;
  }

  const scrollAmount = CAROUSEL_TRACK.offsetWidth;

  nextBtn.addEventListener('click', () => {
    CAROUSEL_TRACK.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  });

  prevBtn.addEventListener('click', () => {
    CAROUSEL_TRACK.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  });
}

// 페이지 요소 표시/숨김 함수
function togglePageElements(page) {
  const container = document.querySelector('.container');
  const carousels = document.querySelectorAll(
    '.movie-carousel, .carousel-container'
  );
  const moviesContainer = document.querySelector('.movies_container');
  const navigationContainer = document.querySelector(
    '.movies-navigation-container'
  );

  container.style.display = 'none';
  carousels.forEach((carousel) => (carousel.style.display = 'none'));
  moviesContainer.style.display = 'none';
  navigationContainer.style.display = 'none';

  switch (page) {
    case 'main':
      container.style.display = 'block';
      carousels.forEach((carousel) => (carousel.style.display = 'block'));
      break;
    case 'views':
    case 'hot':
    case 'choice':
      navigationContainer.style.display = 'flex';
      break;
  }
}

// 네비게이션 이벤트 리스너
document
  .getElementById('views-link_Views')
  .addEventListener('click', function (e) {
    e.preventDefault();
    togglePageElements('views');
    displayMovies('movies-navigation-container');
    history.pushState(null, '', '#Views');
  });

document
  .getElementById('views-link_Hot')
  .addEventListener('click', function (e) {
    e.preventDefault();
    togglePageElements('hot');
    // 여기에 인기급상승 영화 표시 로직 추가
    history.pushState(null, '', '#Hot');
  });

document
  .getElementById('views-link_Choice')
  .addEventListener('click', function (e) {
    e.preventDefault();
    togglePageElements('choice');
    // 여기에 너이영 추천 영화 표시 로직 추가
    history.pushState(null, '', '#Choice');
  });

// 메인 페이지로 돌아가는 함수
function returnToMainPage() {
  togglePageElements('main');
  displayTopRatedMoviesCarousel(); // 메인 페이지로 돌아갈 때 최고의 평점 캐러셀 다시 표시
  history.pushState(null, '', '/');
}

// 로고 클릭 이벤트 리스너
document.getElementById('logo').addEventListener('click', function (e) {
  e.preventDefault();
  returnToMainPage();
});

// 뒤로가기 이벤트 처리
window.addEventListener('popstate', function () {
  switch (location.hash) {
    case '#Views':
      togglePageElements('views');
      displayMovies('movies-navigation-container');
      break;
    case '#Hot':
      togglePageElements('hot');
      // 인기급상승 영화 표시 로직 추가
      break;
    case '#Choice':
      togglePageElements('choice');
      // 너이영 추천 영화 표시 로직 추가
      break;
    default:
      returnToMainPage();
  }
});

// 초기 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function () {
  returnToMainPage();
});

// 최고의 평점 영화 표시 함수
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

  // 컨테이너 스타일 조정
  CONTAINER.style.display = 'flex';
  CONTAINER.style.flexWrap = 'wrap';
  CONTAINER.style.justifyContent = 'center';
  CONTAINER.style.gap = '20px';
  CONTAINER.style.padding = '20px';
}