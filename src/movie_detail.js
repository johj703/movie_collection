// API키와 옵션 임포트
import { DEFAPIKEY } from "./apikey.js";
const { API_KEY, options } = DEFAPIKEY;

// 영화 ID를 URL 쿼리 파라미터에서 가져오기
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// HTML 요소 가져오기
const moviePoster = document.getElementById("movie_poster");
const movieTitle = document.getElementById("movie_title");
const movieTagline = document.getElementById("movie_tagline");
const movieVoteAverage = document.getElementById("movie_vote_average");
const movieGenres = document.getElementById("movie_genres");
const movieReleaseDate = document.getElementById("movie_release_date");
const movieRuntime = document.getElementById("movie_runtime");
const movieOverviewText = document.getElementById("movie_overview_text");

// 영화 상세 정보를 가져오는 비동기 함수
async function getMovieDetails() {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
        console.log(`Fetching movie details from: ${url}`);

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const movie = await response.json();
        console.log("Received movie details:", movie);

        // 영화 상세 정보를 페이지에 표시
        moviePoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieTitle.textContent = movie.title;
        movieTagline.textContent = movie.tagline;
        movieVoteAverage.textContent = movie.vote_average.toFixed(1);
        movieGenres.innerHTML = movie.genres.map(genre => `<span class="genre">${genre.name}</span>`).join(', ');
        movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;
        movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;
        movieOverviewText.textContent = movie.overview;
    } catch (error) {
        console.log("Error fetching movie details:", error);
    }
}

// 영화 상세 정보 가져오기 호출
getMovieDetails();
