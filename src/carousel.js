const slides = document.querySelectorAll('.carousel-slide img');
const navDots = document.querySelectorAll('.nav-dot');
let currentIndex = 0;

function createShortcutBadge() {
    const badge = document.createElement('button');
    badge.classList.add('shortcuts');
    badge.innerText = '바로가기';
    return badge;
}

function appendShortcutBadges() {
    slides.forEach(slide => {
        const badge = createShortcutBadge();
        const slideContainer = document.createElement('div');
        slideContainer.classList.add('slide-container');
        slide.parentNode.insertBefore(slideContainer, slide);
        slideContainer.appendChild(slide);
        slideContainer.appendChild(badge);
    });
}

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
    document.querySelector('.carousel-subcontainer').style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

appendShortcutBadges();
setInterval(showNextSlide, 2000);
updateCarousel();