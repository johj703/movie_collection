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
    .catch((err) => console.error(err));
}
