import { DEFAPIKEY } from "./apikey.js";
const { API_KEY, options } = DEFAPIKEY;

const options1 = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzM0ZWFlY2M2MDcyMDg3NGE5YzFjNWI0NTkwYTAxZiIsIm5iZiI6MTcyMjUyMDExOS4yODUwNTYsInN1YiI6IjY2OWY1YTc4ZjE3YTkxMjZkMjRjNzllOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d0pENm2q3n3vZUPg6xEWiFd06FnbKa72W0-OuJl-ZvM",
  },
};

fetch(
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  options1
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
