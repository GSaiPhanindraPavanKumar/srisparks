import { initNavbar, initMobileMenu } from './components/navbar/navbar.js';

document.addEventListener('DOMContentLoaded', function() {
    // Load navbar with error handling
    fetch('./components/navbar/navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load navbar: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            // Initialize navbar functionality
            initNavbar();
            initMobileMenu();
            
            // Handle mobile menu links after navbar is loaded
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                const mobileLinks = mobileMenu.getElementsByTagName('a');
                for (let link of mobileLinks) {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.add('hidden');
                    });
                }
            }
        })
        .catch(error => {
            console.error('Navbar loading error:', error);
            document.getElementById('navbar-container').innerHTML = '<div class="bg-red-500 text-white p-4">Error loading navigation</div>';
        });

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

    // Scroll animations with null checks
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (animatedElements.length > 0) {
            animatedElements.forEach((element) => {
                observer.observe(element);
            });
        }
    }

    // Add dynamic card hover effects with null checks
    function initCardEffects() {
        const cards = document.querySelectorAll('.service-card, .feature-card, .value-card');
        if (cards.length > 0) {
            cards.forEach(card => {
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
        }
    }

    // Initialize all effects
    function initializeAll() {
        // Initialize carousel
        const track = document.querySelector('.carousel-track');
        const slides = document.querySelectorAll('.carousel-slide');
        
        if (track && slides.length > 0) {
            let currentIndex = 0;

            function updateCarousel() {
                const offset = -currentIndex * 25;
                track.style.transform = `translateX(${offset}%)`;
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            }

            // Set initial position
            updateCarousel();

            // Auto advance slides
            setInterval(nextSlide, 5000);
        }

        // Initialize particles first if available
        if (window.particlesJS) {
            try {
                // Wait a brief moment to ensure DOM is ready
                setTimeout(() => {
                    particlesJS('particles-js', {
                        particles: {
                            number: { value: 50 },
                            color: { value: '#ffffff' },
                            opacity: { 
                                value: 0.5,
                                random: false
                            },
                            size: { 
                                value: 3,
                                random: true 
                            },
                            move: { 
                                enable: true,
                                speed: 2,
                                direction: "none",
                                random: true,
                                straight: false,
                                out_mode: "out",
                                bounce: false,
                            }
                        },
                        interactivity: {
                            detect_on: "canvas",
                            events: {
                                onhover: { enable: true, mode: "repulse" },
                                onclick: { enable: false },
                                resize: true
                            }
                        },
                        retina_detect: true
                    });
                }, 100);
            } catch (error) {
                console.warn('ParticlesJS failed to initialize:', error);
            }
        }

        // Initialize other components
        initScrollAnimations();
        initCardEffects();
        
        // Add navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    }

    // Call initialization after DOM is loaded
    setTimeout(initializeAll, 100);
});