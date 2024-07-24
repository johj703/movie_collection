function fetchMovieData(movieName) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODVhN2QxNzMwNDgxMTM4MTNkZTkwNGRmOWYzNGE3ZiIsIm5iZiI6MTcyMTczNjkzOC40MzA2MzcsInN1YiI6IjY1ZmQ0Y2FkNzcwNzAwMDE3YzBhODE2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DCeARyLaGBKkH5y_iUlXaU_lKMrdoaXyAfazzsqblcg",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.error("Error: ", error));

  fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=${AniKey}&language=ko-KR&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      const movieContainer = document.getElementById("movie-container");
      movies.forEach((movies) => {
        const card = createMovieCard(movies);
        movieContainer.appendChild(card);
      });
    })
    .catch((error) => console.log("Error : ", error));

  console.log();
}

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>${movie.overview}</p>
    <span>Rating: ${movie.vote_average}</span>  
    `;
  card.addEventListener("click", () => alert(`Movie ID: ${movie.id}`));
  return card;
}
