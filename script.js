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

    // Array of project images with their orientations
    const projectImages = [
        { src: 'project-1.jpg', orientation: 'landscape' },
        { src: 'project-2.jpg', orientation: 'portrait' },
        { src: 'project-3.jpg', orientation: 'landscape' },
        { src: 'project-4.jpg', orientation: 'portrait' },
        { src: 'project-5.jpg', orientation: 'landscape' }
    ];

    // Function to load project images
    function loadProjectImages() {
        projectImages.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide w-full h-full flex-shrink-0 flex items-center justify-center bg-gray-100';
            
            const imgWrapper = document.createElement('div');
            imgWrapper.className = `relative w-full h-full ${image.orientation === 'portrait' ? 'flex justify-center' : ''}`;
            
            const img = document.createElement('img');
            img.src = `./images/projects/${image.src}`;
            img.alt = 'Project Image';
            img.className = `${image.orientation === 'portrait' ? 'h-full w-auto' : 'w-full h-full'} object-contain`;
            
            // Add loading state and error handling
            img.addEventListener('load', () => {
                img.classList.add('opacity-100');
                img.classList.remove('opacity-0');
            });
            
            img.addEventListener('error', () => {
                imgWrapper.innerHTML = `
                    <div class="flex items-center justify-center w-full h-full bg-gray-200">
                        <span class="text-gray-500">Image not found</span>
                    </div>
                `;
            });
            
            imgWrapper.appendChild(img);
            slide.appendChild(imgWrapper);
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

    // Mobile menu toggle
    const menuButton = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.getElementsByTagName('a');
    for (let link of mobileLinks) {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.observe(element);
    });

    // Add dynamic card hover effects
    document.querySelectorAll('.service-card, .feature-card, .value-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.transform = `perspective(1000px) rotateX(${(y - rect.height/2)/20}deg) rotateY(${-(x - rect.width/2)/20}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Dynamic number counter for statistics
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Particle background effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const particlesConfig = {
            particles: {
                number: { value: 80 },
                color: { value: '#ffffff' },
                opacity: { value: 0.5 },
                size: { value: 3 },
                move: { enable: true, speed: 2 }
            }
        };
        particlesJS('particles-js', particlesConfig);
    }

    // Add smooth parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});