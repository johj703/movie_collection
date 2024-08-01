// API키와 옵션 임포트
import { DEFAPIKEY } from "./apikey.js";
const { API_KEY, options } = DEFAPIKEY;

// 영화 ID를 URL 쿼리 파라미터에서 가져오기
const URLPARAMS = new URLSearchParams(window.location.search);
const MOVIEID = URLPARAMS.get('id');

// HTML 요소 가져오기
const MOVIEPOSTER = document.getElementById("movie_poster");
const MOVIETITLE = document.getElementById("movie_title");
const MOIVETAHLINE = document.getElementById("movie_tagline");
const MOIVEVOTEAVERAGE = document.getElementById("movie_vote_average");
const MOVIEGENRES = document.getElementById("movie_genres");
const MOIVERELEASEDATE = document.getElementById("movie_release_date");
const MOIVERUNTIME = document.getElementById("movie_runtime");
const MOIVEOVERVIEWTEXT = document.getElementById("movie_overview_text");

// 영화 상세 정보를 가져오는 비동기 함수
async function getMovieDetails() {
    try {
        const URL = `https://api.themoviedb.org/3/movie/${MOVIEID}?api_key=${API_KEY}&language=ko-KR`;
        console.log(`Fetching movie details from: ${URL}`);

        const RESPONSE = await fetch(URL, options);

        if (!RESPONSE.ok) {
            throw new Error(`HTTP error! status: ${RESPONSE.status}`);
        }

        const movie = await RESPONSE.json();
        console.log("Received movie details:", movie);

        // 영화 상세 정보를 페이지에 표시
        MOVIEPOSTER.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        MOVIETITLE.textContent = movie.title;
        MOIVETAHLINE.textContent = movie.tagline;
        MOIVEVOTEAVERAGE.textContent = movie.vote_average.toFixed(1);
        MOVIEGENRES.innerHTML = movie.genres.map(genre => `<span class="genre">${genre.name}</span>`).join(', ');
        MOIVERELEASEDATE.textContent = `Release Date: ${movie.release_date}`;
        MOIVERUNTIME.textContent = `Runtime: ${movie.runtime} minutes`;
        MOIVEOVERVIEWTEXT.textContent = movie.overview;
    } catch (error) {
        console.log("Error fetching movie details:", error);
    }
}

// 영화 상세 정보 가져오기 호출
getMovieDetails();
