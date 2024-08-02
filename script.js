const slides = document.querySelectorAll('.carousel-slide img');
const navDots = document.querySelectorAll('.nav-dot');
let currentIndex = 0;
let slideInterval;

function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

function navigateToSlide(index) {
    currentIndex = index;
    updateCarousel();
    clearInterval(slideInterval);
}

function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    document.querySelector('.carousel-slide').style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

slideInterval = setInterval(showNextSlide, 2000);

updateCarousel();

navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => navigateToSlide(index));
});
