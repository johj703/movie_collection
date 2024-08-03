document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide img');
    const navDots = document.querySelectorAll('.nav-dot');
    const slideContainer = document.querySelector('.carousel-slide');
    let currentIndex = 0;

    function updateCarousel() {
        const slideWidth = slides[0].clientWidth; // 첫 번째 슬라이드의 너비를 가져옴
        slideContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`; // 슬라이드를 이동
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex); // 현재 슬라이드에 맞는 네비게이션 점을 활성화
        });
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // 다음 슬라이드로 이동
        updateCarousel();
    }

    function navigateToSlide(index) {
        currentIndex = index; // 특정 슬라이드로 이동
        updateCarousel();
    }

    // 네비게이션 점 클릭 시 슬라이드 변경
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => navigateToSlide(index));
    });

    // 자동 슬라이드
    setInterval(showNextSlide, 2000);

    // 초기 슬라이드 업데이트
    updateCarousel();

    // 창 크기 조정 시 슬라이드 업데이트
    window.addEventListener('resize', updateCarousel);
});
