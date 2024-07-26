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
    const card = document.createElement("div");
    movies.forEach((movie) => {
      // 새 div 요소를 생성
      const card = document.createElement("div");

      // 영화 포스터 이미지 설정
      const poster = document.createElement("img");
      poster.src = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
      poster.alt = movie.title;
      card.appendChild(poster);

      // 영화 제목 설정
      const title = document.createElement("h2");
      title.textContent = movie.title;
      card.appendChild(title);

      // 영화 내용 요약 설정
      const overview = document.createElement("p");
      overview.textContent = movie.overview;
      card.appendChild(overview);

      // 영화 평점 설정
      const rating = document.createElement("p");
      rating.textContent = `Rating: ${movie.vote_average}`;
      card.appendChild(rating);

      // 생성한 div 요소를 movies_container에 추가
      movies_container.appendChild(card);
    });
  });
}
getMovies();

// 검색 구현
// 1. 영화 카드 리스트 선택하기

// 2. 입력 값에 따라서 포함 여부 확인
