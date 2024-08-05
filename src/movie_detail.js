const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODVhN2QxNzMwNDgxMTM4MTNkZTkwNGRmOWYzNGE3ZiIsIm5iZiI6MTcyMjQ3MjA2OS4wMjgxNzksInN1YiI6IjY1ZmQ0Y2FkNzcwNzAwMDE3YzBhODE2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h0yI-BCYvo6NK5GkkkATJlPPx95OeQquyoIAuv5ijMQ'
    }
    };
  
  fetch('https://api.themoviedb.org/3/movie/movie_id?language=en-US', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

document.addEventListener('DOMContentLoaded', () => {
    // 영화 ID를 URL에서 가져오는 함수
    function getMovieIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
   }

   // 영화 ID로부터 상세 정보를 가져오는 함수
   async function fetchMovieDetails(movieId) {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`, options);
        const movie = await response.json();
        console.log(movie)
        renderMovieDetails(movie);
    } catch(error) {
        console.log(`Error fetching movie details: `, error);
    }
   }

   // 영화 상세 정보를 렌더링하는 함수
   function renderMovieDetails(movie) {
    const movieDetailContainer = document.getElementById('movie_detail_container');
    movieDetailContainer.innerHTML `
        <div class="detail-card">
            <h2>${movie.title}</h2>
            <img src="${movie.poster_path}" alt="${movie.title}">
            <p><strong>Overview:</strong>${movie.overview}</p>
            <p><strong>Rating:</strong>${movie.vote_average}</p>
        </div>
    `;
   }

   const movieId = getMovieIdFromURL();
   if (movieId) {
    fetchMovieDetails(movieId);
   }
});