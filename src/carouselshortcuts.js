document.addEventListener('DOMContentLoaded', function () {
  const BUTTONS = [
    { id: 'Madame_web', movieId: 634492, index: 0 },
    { id: 'The_hobbit', movieId: 122917, index: 1 },
    { id: 'Joker', movieId: 889737, index: 2 },
  ];

  const SLIDEITEMS = document.querySelectorAll('.slide-item');

  BUTTONS.forEach((button, index) => {
    const SLIDE_ITEM = SLIDEITEMS[button.index];

    // 바로가기 버튼 생성
    const SHORTCUT_BUTTON = document.createElement('button');
    SHORTCUT_BUTTON.className = 'shortcuts';
    SHORTCUT_BUTTON.id = button.id;
    SHORTCUT_BUTTON.textContent = '바로가기';
    SHORTCUT_BUTTON.style.left = `${20 + index * 1500}px`;
    SHORTCUT_BUTTON.style.top = '20px';

    // 상세정보 버튼 생성
    const INFO_BUTTON = document.createElement('button');
    INFO_BUTTON.className = 'information';
    INFO_BUTTON.id = `information_${button.id}`;
    INFO_BUTTON.innerHTML = '<i class="fas fa-info-circle"></i> 상세정보';
    INFO_BUTTON.style.left = `${120 + index * 1500}px`;
    INFO_BUTTON.style.top = '20px';

    // 버튼들을 슬라이드 아이템에 추가
    SLIDE_ITEM.appendChild(SHORTCUT_BUTTON);
    SLIDE_ITEM.appendChild(INFO_BUTTON);

    // 이벤트 리스너 추가
    SHORTCUT_BUTTON.addEventListener('click', function () {
      window.location.href = `/html/movie_detail.html?id=${button.movieId}`;
    });

    INFO_BUTTON.addEventListener('click', function () {
      window.location.href = `/html/movie_detail.html?id=${button.movieId}`;
    });
  });
});
