import { initNavbar, initMobileMenu } from './components/navbar/navbar.js';
import { initFooter } from './components/footer/footer.js';
import { router } from './router.js';

document.addEventListener('DOMContentLoaded', function() {
    // Load navbar with path handling
    const navbarContainer = document.getElementById('navbar-container');
    const parentLevel = navbarContainer?.getAttribute('data-parent-level') || './';
    
    fetch(parentLevel + 'components/navbar/navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load navbar: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Update paths based on page level
            const updatedData = data
                .replace(/href="\.\//g, `href="${parentLevel}`)
                .replace('src="/images/', `src="${parentLevel}images/`);
            
            navbarContainer.innerHTML = updatedData;
            
            // Ensure logo path is correct
            const logo = document.getElementById('navbar-logo');
            if (logo) {
                logo.src = parentLevel + 'images/logo/logo.png';
            }

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

    // Load footer with path handling
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        const parentLevel = footerContainer.getAttribute('data-parent-level') || './';
        
        fetch(parentLevel + 'components/footer/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load footer: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                // Update paths based on page level
                const updatedData = data
                    .replace(/src="\/images\//g, `src="${parentLevel}images/`)
                    .replace(/href="\//g, `href="${parentLevel}`)
                    .replace(/href="#/g, `href="${parentLevel}#`);
                
                footerContainer.innerHTML = updatedData;
                
                // Fix footer logo path
                const footerLogo = footerContainer.querySelector('.footer-logo img');
                if (footerLogo) {
                    footerLogo.src = parentLevel + 'images/logo/logo1.png';
                }
                
                // Initialize footer functionality
                initFooter();
            })
            .catch(error => {
                console.error('Footer loading error:', error);
                footerContainer.innerHTML = '<div class="bg-red-500 text-white p-4">Error loading footer</div>';
            });
    }

    // Enhanced scroll to top button with hover effect and improved visibility
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            // Show button if scrolled down
            if (window.pageYOffset > 300) {
                // Get the footer position
                const footer = document.querySelector('.footer-section');
                const footerPosition = footer ? footer.getBoundingClientRect() : null;
                const viewportHeight = window.innerHeight;
                
                scrollBtn.style.display = 'flex';
                
                // If footer is in view, move button up
                if (footerPosition && footerPosition.top < (viewportHeight - 80)) {
                    if (!scrollBtn.classList.contains('above-footer')) {
                        scrollBtn.classList.add('above-footer');
                    }
                } else {
                    scrollBtn.classList.remove('above-footer');
                }
                
                // Make button visible with a slight delay
                setTimeout(() => {
                    scrollBtn.classList.add('scroll-visible');
                }, 10);
            } else {
                scrollBtn.classList.remove('scroll-visible');
                setTimeout(() => {
                    if (!scrollBtn.classList.contains('scroll-visible')) {
                        scrollBtn.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Check button position on page load and resize
        function updateButtonPosition() {
            const footer = document.querySelector('.footer-section');
            if (footer && scrollBtn.style.display !== 'none') {
                const footerPosition = footer.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                if (footerPosition.top < (viewportHeight - 80)) {
                    scrollBtn.classList.add('above-footer');
                } else {
                    scrollBtn.classList.remove('above-footer');
                }
            }
        }
        
        // Add event listeners for resize and load
        window.addEventListener('resize', updateButtonPosition);
        window.addEventListener('load', updateButtonPosition);
        
        // Add hover effect
        scrollBtn.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-8px)'; // Increased hover lift
          this.style.boxShadow = '0 8px 20px rgba(255, 153, 0, 0.7)'; // Stronger shadow
        });
        
        scrollBtn.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });

        // Smooth scroll to top
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling with null checks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations with null checks
    function initScrollAnimations() {
      const observerOptions = {
        threshold: 0.2, // Increased threshold for earlier animation trigger
        rootMargin: '0px 0px -30px 0px' // Adjusted margin for smoother animations
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
        // Initialize carousel with higher priority and force visibility
        function initializeCarousel() {
            const track = document.querySelector('.carousel-track');
            const slides = document.querySelectorAll('.carousel-slide');
            let currentIndex = 0;

            if (track && slides.length > 0) {
                function updateCarousel() {
                    const offset = -currentIndex * 25; // Move by 25% for each slide
                    track.style.transform = `translateX(${offset}%)`;
                }

                function nextSlide() {
                    currentIndex = (currentIndex + 1) % slides.length;
                    updateCarousel();
                }

                // Set initial position
                updateCarousel();

                // Auto-advance slides every 5 seconds
                setInterval(nextSlide, 5000);
            }
        }

        // Initialize carousel
        initializeCarousel();

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