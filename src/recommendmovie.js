import {
  DEFAPIKEY
} from "./apikey.js";
const {
  API_KEY
} = DEFAPIKEY;

// JSON 파일에서 영화 데이터를 불러오는 함수
async function fetchMoviesFromJSON() {
  try {
    const RESONSE = await fetch('/json/movies.json'); // 경로 수정
    if (!RESONSE.ok) {
      throw new Error('네트워크 응답이 올바르지 않습니다.');
    }
    const MOVIES = await RESONSE.json();
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

// 영화 데이터를 HTML로 변환하여 표시하는 함수
async function displayMovies() {
  const MOVIES = await fetchMoviesFromJSON();
  const MOVIESCONTAINER = document.getElementById('movies-container2');
  if (!MOVIESCONTAINER) {
    console.error('영화 컨테이너를 찾을 수 없습니다.');
    return;
  }

  MOVIESCONTAINER.innerHTML = ''; // 기존 내용을 지우기

  for (const MOVIE of MOVIES) {
    const MOVIEDATA = await fetchMovieDetails(MOVIE.id);
    if (MOVIEDATA) {
      const CARD = document.createElement('div');
      CARD.classList.add('movie-card');
      CARD.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${MOVIEDATA.poster_path || 'https://via.placeholder.com/200x300'}" alt="${MOVIE.title} 포스터" class="movie-poster">
    <div class="reating_badge">평점 : ${MOVIEDATA.vote_average.toFixed(1)} / 10</div>
      `;
      MOVIESCONTAINER.appendChild(CARD);

      CARD.addEventListener("click", () => {
        window.location.href = `/html/movie_detail.html?id=${MOVIE.id}`;
      });
    }
  }
}

// 네비게이션 링크 클릭 이벤트 처리
document.getElementById('views-link_Choice').addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('.container').style.display = 'none';
  document.querySelector('.movie-carousel').style.display = 'none';
  document.querySelector('.movies_container').style.display = 'none';
  document.querySelector('.movies-container2').style.display = 'flex';
  displayMovies();
  history.pushState(null, '', '#Views');
});

// 뒤로가기 이벤트 처리
window.addEventListener('popstate', function () {
  if (location.hash !== '#Views') {
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.movie-carousel').style.display = 'block';
    document.querySelector('.movies_container').style.display = 'flex';
    document.querySelector('.movies-container2').style.display = 'none';
  }
});