const slides = document.querySelectorAll('.carousel-slide img');
const navDots = document.querySelectorAll('.nav-dot');
let currentIndex = 0;

function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

function navigateToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function createShortcutBadge() {
    const badge = document.createElement('button');
    badge.classList.add('shortcuts');
    badge.innerText = '바로가기';
    return badge;
}

function appendShortcutBadges() {
    slides.forEach(slide => {
        const badge = createShortcutBadge();
        slide.parentElement.style.position = 'relative';
        slide.parentElement.appendChild(badge);
    });
}
function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    document.querySelector('.carousel-slide').style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

appendShortcutBadges();
setInterval(showNextSlide, 2000);
updateCarousel();