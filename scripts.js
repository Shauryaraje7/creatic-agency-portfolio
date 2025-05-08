const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
});
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    const offset = -index * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
}

function currentSlide(index) {
    currentIndex = index - 1;
    showSlide(currentIndex);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

// Handle arrow key presses
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        nextSlide();
    } else if (event.key === 'ArrowLeft') {
        prevSlide();
    }
});

// Swipe functionality for touch devices
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    if (touchEndX < touchStartX) {
        nextSlide(); // Swipe left
    } else if (touchEndX > touchStartX) {
        prevSlide(); // Swipe right
    }
}

// Add touch event listeners for swiping
document.querySelector('.slider-container').addEventListener('touchstart', handleTouchStart);
document.querySelector('.slider-container').addEventListener('touchend', handleTouchEnd);

// Initialize the first slide
showSlide(currentIndex);
