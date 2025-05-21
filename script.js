document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll to top button
    const scrollBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const nextButton = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;

    // Array of project images
    const projectImages = [
        'WhatsApp Image 2025-05-20 at 21.48.57_a95a03c6.jpg',
        'WhatsApp Image 2025-05-20 at 21.48.58_638bc04d.jpg',
        'WhatsApp Image 2025-05-20 at 21.48.58_f2abd1c3.jpg',
        'WhatsApp Image 2025-05-20 at 21.48.58_fe33d3e0.jpg',
        'WhatsApp Image 2025-05-20 at 21.48.59_7195adb1.jpg'
    ];

    // Function to load project images
    function loadProjectImages() {
        projectImages.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            
            const img = document.createElement('img');
            img.src = `images/project/${image}`;
            img.alt = 'Project Image';
            
            slide.appendChild(img);
            carouselTrack.appendChild(slide);
        });

        // Get all slides after adding them
        slides = document.querySelectorAll('.carousel-slide');
        if (slides.length > 0) {
            updateCarousel();
        }
    }

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Add click events for navigation buttons
    prevButton?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    nextButton?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    });

    // Auto-advance carousel
    setInterval(() => {
        if (slides.length > 1) {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }
    }, 5000);

    // Load project images when the page loads
    loadProjectImages();
});