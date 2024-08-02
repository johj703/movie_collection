document.addEventListener('DOMContentLoaded', function() {
// 슬라이드와 네비게이션 도트를 선택 합니다.
const slides = document.querySelectorAll('.carousel-slide img');
const navDots = document.querySelectorAll('.nav-dot');
let currentIndex = 0;

// 첫 번째와 마지막 슬라이드를 복제하여 무한 루프를 구현
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideCline = slides[slides.length - 1].cloneNode(true);

const carouselSlide = document.querySelector('.carousel-slide');
// 복제한 슬라이드를 추가
carouselSlide.appendChild(firstSlideClone);
carouselSlide.insertBefore(lastSlideClone, slides[0]);

const totalSlides = slides.length + 2; // 총 슬라이드 수(원본 슬라이드 + 복제 슬라이드 2개)
const slideWidth = slides[0].clientWidth; // 슬라이드의 너비를 가지고 옵니다.

// 캐러셀 초기 위치를 첫 번째 슬라이드(복제된 슬라이드 뒤)로 설정합니다.
carouselSlide.style.transform = `translateX(-${slideWidth}px)`;

function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

function navigateToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    document.querySelector('.carousel-slide').style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

setInterval(showNextSlide, 2000);

updateCarousel();

})