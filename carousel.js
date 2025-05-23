// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel-container');
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('.slide');
  const dots = carousel.querySelectorAll('.dot');
  const prevButton = carousel.querySelector('.prev-button');
  const nextButton = carousel.querySelector('.next-button');
  
  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 5000;
  
  // Initialize the carousel
  function initCarousel() {
    // Set first slide as active
    slides[0].classList.add('active');
    dots[0].classList.add('active');
    
    // Start auto-sliding
    startSlideInterval();
    
    // Add event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // Add event listeners to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      startSlideInterval();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });
  }
  
  // Start the auto-sliding interval
  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }
  
  // Go to the previous slide
  function prevSlide() {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  }
  
  // Go to the next slide
  function nextSlide() {
    goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  }
  
  // Go to a specific slide
  function goToSlide(index) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Update current slide index
    currentSlide = index;
    
    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Reset the interval
    clearInterval(slideInterval);
    startSlideInterval();
  }
  
  // Initialize the carousel
  initCarousel();
});