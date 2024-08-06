document.addEventListener('DOMContentLoaded', () => {
    const SLIDES = document.querySelectorAll('.carousel-slide img');
    const NAVDOTS = document.querySelectorAll('.nav-dot');
    const SLIDECONTAINER = document.querySelector('.carousel-slide');
    let currentIndex = 0;
    let slideInterval;

    // 각 슬라이드에 대한 버튼 정보를 담은 배열
    const BUTTONS = [
        { id: 'Madame_web', movieId: 634492 },
        { id: 'The_hobbit', movieId: 122917 },
        { id: 'Joker', movieId: 889737 }
    ];

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % SLIDES.length;
        updateCarousel();
    }

    function navigateToSlide(index) {
        currentIndex = index;
        updateCarousel();
        clearInterval(slideInterval);
        slideInterval = setInterval(showNextSlide, 10000);
    }

    function updateCarousel() {
        const slideWidth = SLIDES[0].clientWidth;
        SLIDECONTAINER.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        NAVDOTS.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function initializeCarousel() {
        const totalWidth = SLIDES.length * SLIDES[0].clientWidth;
        SLIDECONTAINER.style.width = `${totalWidth}px`;
        updateCarousel();
    }

    function createButtons() {
        SLIDES.forEach((slide, index) => {
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');
            buttonContainer.style.position = 'absolute';
            buttonContainer.style.bottom = '60px';
            buttonContainer.style.left = '20px';
            buttonContainer.style.right = '20px';
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'space-between';
            buttonContainer.style.pointerEvents = 'auto';

            // 현재 슬라이드의 버튼을 가져옵니다.
            const { id, movieId } = BUTTONS[index];
            
            // '바로가기' 버튼 생성
            const shortcutsButton = document.createElement('button');
            shortcutsButton.classList.add('shortcuts');
            shortcutsButton.id = id;
            shortcutsButton.textContent = '바로가기';
            shortcutsButton.onclick = () => {
                window.location.href = `/html/movie_detail.html?id=${movieId}`;
            };

            // '상세정보' 버튼 생성
            const informationButton = document.createElement('button');
            informationButton.classList.add('information');
            informationButton.id = `information_${id}`;
            informationButton.innerHTML = '<i class="fas fa-info-circle"></i> 상세정보';
            informationButton.onclick = () => {
                window.location.href = `/html/movie_detail.html?id=${movieId}`;
            };

            buttonContainer.appendChild(shortcutsButton);
            buttonContainer.appendChild(informationButton);

            slide.parentElement.appendChild(buttonContainer);
        });
    }

    function addImageClickEvents() {
        if (window.innerWidth <= 1024) { // 모바일 및 태블릿 환경
            SLIDES.forEach((slide, index) => {
                const { movieId } = BUTTONS[index];
                slide.addEventListener('click', () => {
                    window.location.href = `/html/movie_detail.html?id=${movieId}`;
                });
            });
        } else {
            // 모바일 및 태블릿 환경이 아닐 경우 클릭 이벤트를 제거
            SLIDES.forEach(slide => {
                const newSlide = slide.cloneNode(true); // 슬라이드 복제
                slide.parentElement.replaceChild(newSlide, slide); // 기존 슬라이드를 새로운 슬라이드로 교체
            });
        }
    }

    slideInterval = setInterval(showNextSlide, 10000);

    initializeCarousel();

    NAVDOTS.forEach((dot, index) => {
        dot.addEventListener('click', () => navigateToSlide(index));
    });

    window.addEventListener('resize', () => {
        updateCarousel();
        addImageClickEvents(); // 화면 크기 변경 시 클릭 이벤트 재설정
    });

    createButtons();

    addImageClickEvents(); // 페이지 로드 시 클릭 이벤트 추가

    window.navigateToSlide = navigateToSlide;
});