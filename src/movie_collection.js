const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODVhN2QxNzMwNDgxMTM4MTNkZTkwNGRmOWYzNGE3ZiIsIm5iZiI6MTcyMTg2NzkxNS4wNjczNywic3ViIjoiNjVmZDRjYWQ3NzA3MDAwMTdjMGE4MTZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cbkZQGyQg8TkXQEW93ZyqtaR4dVrGhw2j-1FJPufuus",
  },
};

// fetch(
//   "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// 1. fetch API를 async await 문법으로 바꾸기.
// 2. fetch API의 결과물을 response에 담기.
// 3. response를 JSON 객체로 바꿔서 Data 변수에 담기.
// 4. movies_container 가져오기
// 5. Data 변수를 순회하면서 HTML코드를 movies_container에 넣기

async function getMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  const data = await response.json();
  // console.log(data.results);
  const movies = data.results;
  movies.forEach((movie) => {
    console.log(movie);
    let image = movie["poster_path"];
    let title = movie["title"];
    let overview = movie["overview"];
    let vote_average = movie["vote_average"];

    let temp_html = `
      <div class="movies">
        <img src="https://image.tmdb.org/t/p/w500/${image}" alt="영화 이미지" />
        <h3>${title}</h3>
        <p>${overview}</p>
        <p>평점: ${vote_average}</p>
      </div>
    `;
    const container = document.getElementById("movies_container");
    const a = document.createElement("div");
    movies.forEach((movie) => {
      const a = document.createElement("div");
      a.textContent = movie.image;
      a.textContent = movie.title;
      a.textContent = movie.overview;
      a.textContent = movie.vote_average;
      movies_container.appendChild(a);
    });
  });
}

getMovies();

// 검색 구현
// 1. 영화 카드 리스트 선택하기

// 2. 입력 값에 따라서 포함 여부 확인
