document.addEventListener('DOMContentLoaded', () => {
    const SLIDES = document.querySelectorAll('.carousel-slide img');
    const NAVDOTS = document.querySelectorAll('.nav-dot');
    const SLIDECONTAINER = document.querySelector('.carousel-slide');
    let $currentIndex = 0;
    let $slideInterval;

    function showNextSlide() {
        $currentIndex = ($currentIndex + 1) % SLIDES.length;
        updateCarousel();
    }

    function navigateToSlide(index) {
        $currentIndex = index;
        updateCarousel();
        clearInterval($slideInterval);
        $slideInterval = setInterval(showNextSlide, 10000);
    }

    function updateCarousel() {
        const SLIDEWIDTH = SLIDES[0].clientWidth;
        SLIDECONTAINER.style.transform = `translateX(-${$currentIndex * SLIDEWIDTH}px)`;
        NAVDOTS.forEach((dot, index) => {
            dot.classList.toggle('active', index === $currentIndex);
        });
    }

    $slideInterval = setInterval(showNextSlide, 10000);

    updateCarousel();

    NAVDOTS.forEach((dot, index) => {
        dot.addEventListener('click', () => navigateToSlide(index));
    });

    window.addEventListener('resize', updateCarousel);

    window.navigateToSlide = navigateToSlide;
});
