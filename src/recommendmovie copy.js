import { DEFAPIKEY } from './apikey.js';
const { API_KEY } = DEFAPIKEY;

// JSON 파일에서 영화 데이터를 불러오는 함수
async function fetchMoviesFromJSON() {
  try {
    const RESPONSE = await fetch('/json/movies.json');
    if (!RESPONSE.ok) {
      throw new Error('네트워크 응답이 올바르지 않습니다.');
    }
    const MOVIES = await RESPONSE.json();
    return MOVIES;
  } catch (error) {
    console.error('영화 데이터를 가져오는데 실패했습니다:', error);
    return [];
  }
}

// 특정 영화 ID를 사용해 영화 정보를 가져오는 함수
async function fetchMovieDetails(movieId) {
  const URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
  try {
    const RESPONSE = await fetch(URL);
    if (!RESPONSE.ok) {
      throw new Error('네트워크 응답이 올바르지 않습니다.');
    }
    const MOVIEDATA = await RESPONSE.json();
    return MOVIEDATA;
  } catch (error) {
    console.error('영화 정보를 가져오는데 실패했습니다:', error);
    return null;
  }
}

// 영화 카드 생성 함수
function createMovieCard(movieData) {
  const CARD = document.createElement('div');
  CARD.classList.add('movie-card');
  CARD.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${
      movieData.poster_path || 'https://via.placeholder.com/200x300'
    }" alt="${movieData.title} 포스터" class="movie-poster">
    <div class="rating_badge">평점 : ${movieData.vote_average.toFixed(
      1
    )} / 10</div>
  `;
  CARD.addEventListener('click', () => {
    window.location.href = `/html/movie_detail.html?id=${movieData.id}`;
  });
  return CARD;
}

// 영화 데이터를 HTML로 변환하여 표시하는 함수
async function displayMovies(containerId) {
  const MOVIES = await fetchMoviesFromJSON();
  const CONTAINER = document.getElementById(containerId);
  if (!CONTAINER) {
    console.error(`컨테이너 ${containerId}를 찾을 수 없습니다.`);
    return;
  }

  CONTAINER.innerHTML = ''; // 기존 내용을 지우기

  for (const MOVIE of MOVIES) {
    const MOVIEDATA = await fetchMovieDetails(MOVIE.id);
    if (MOVIEDATA) {
      const CARD = createMovieCard(MOVIEDATA);
      CONTAINER.appendChild(CARD);
    }
  }
}

// 캐러셀에 영화 표시 함수
async function displayMoviesCarousel(carouselId) {
  const MOVIES = await fetchMoviesFromJSON();
  const CAROUSEL = document.getElementById(carouselId);
  if (!CAROUSEL) {
    console.error(`캐러셀 ${carouselId}를 찾을 수 없습니다.`);
    return;
  }

  CAROUSEL.innerHTML = '<h3 style="color: white"><너이영 추천></h3>'; // Reset content

  for (const MOVIE of MOVIES) {
    const MOVIEDATA = await fetchMovieDetails(MOVIE.id);
    if (MOVIEDATA) {
      const CARD = createMovieCard(MOVIEDATA);
      CAROUSEL.appendChild(CARD);
    }
  }

  setupCarouselNavigation(carouselId);
}

// 캐러셀 네비게이션 설정 함수
function setupCarouselNavigation(carouselId) {
  const CAROUSEL = document.getElementById(carouselId);
  const PREV_BTN = document.querySelector(
    `#${carouselId.replace('-track', '')} .prev-btn`
  );
  const NEXT_BTN = document.querySelector(
    `#${carouselId.replace('-track', '')} .next-btn`
  );

  if (!CAROUSEL || !PREV_BTN || !NEXT_BTN) {
    console.error('캐러셀 요소를 찾을 수 없습니다.');
    return;
  }

  const scrollAmount = CAROUSEL.offsetWidth;

  NEXT_BTN.addEventListener('click', () => {
    CAROUSEL.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  });

  PREV_BTN.addEventListener('click', () => {
    CAROUSEL.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  });
}

// 페이지 요소 표시/숨김 함수
function togglePageElements(page) {
  const container = document.querySelector('.container');
  const carousels = document.querySelectorAll('.movie-carousel');
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
    case 'choice':
      navigationContainer.style.display = 'flex';
      break;
  }
}

// 네비게이션 이벤트 리스너
document
  .getElementById('views-link_Choice')
  .addEventListener('click', function (e) {
    e.preventDefault();
    togglePageElements('choice');
    displayMovies('movies-navigation-container');
    history.pushState(null, '', '#Choice');
  });

// 메인 페이지로 돌아가는 함수
function returnToMainPage() {
  togglePageElements('main');
  displayMoviesCarousel('choice-movie-carousel-track');
  history.pushState(null, '', '/');
}

// 로고 클릭 이벤트 리스너
document.getElementById('logo').addEventListener('click', function (e) {
  e.preventDefault();
  returnToMainPage();
});

// 뒤로가기 이벤트 처리
window.addEventListener('popstate', function () {
  if (location.hash === '#Choice') {
    togglePageElements('choice');
    displayMovies('movies-navigation-container');
  } else {
    returnToMainPage();
  }
});

// 초기 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function () {
  returnToMainPage();
});
