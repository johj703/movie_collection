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
let movies = [];

async function getMovies() {
  const API_KEY = '485a7d173048113813de904df9f34a7f';
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    options
  );
  const data = await response.json();
  // console.log(data.results);
  movies = data.results;
  movies.forEach((movie) => {
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

    // 영화 카드 컴포넌트를 렌더링 하는 함수
    const card = document.createElement("div");
    movies.forEach((movie) => {
      // 새 div 요소를 생성
      const card = document.createElement("div");
      card.classList.add("card");

      // 영화 포스터 이미지 설정
      const poster = document.createElement("img");
      poster.src = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
      poster.alt = movie.title;
      poster.classList.add("card-img");
      card.appendChild(poster);

      // // 카드 컨텐츠를 담을 div 생성
      // const cardContent = document.createElement('div');
      // cardContent.classList.add('card-content'); // card-contents 클래스 추가

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
      rating.textContent = `평점: ${movie.vote_average}`;
      card.appendChild(rating);

      // 생성한 div 요소를 movies_container에 추가
      movies_container.appendChild(card);

      // 카드를 클릭했을 때, 해당 카드의 상세 정보 페이지로 이동하는 이벤트 리스너 추가
      card.addEventListener("click", () => {
        // 영화 상세 페이지로 이동
        window.location.href = `pages/movie_detail.html?id=${movie.id}`;
      });
    });
  });
}
getMovies();

// 검색 기능 구현
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// 검색 버튼 클릭 이벤트 리스너 추가
searchButton.addEventListener("click", () => {
  makeMovieCards();
});

// 검색 입력 필드에 타이핑 할 때마다 필터링된 영화를 표시
searchInput.addEventListener("input", makeMovieCards);

// 영화 제목을 검색어에 맞게 필터링하고 화면에 표시하는 함수
function makeMovieCards() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );
  getMovies(filteredMovies);
}

makeMovieCards();
// 영화 검색 input태그에서 Enter key를 눌렀을 때 검색 하는 기능
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );
    getMovies(filteredMovies);
  }
});

// 검색 구현
// 1. 영화 카드 리스트 선택하기

// 2. 입력 값에 따라서 포함 여부 확인
