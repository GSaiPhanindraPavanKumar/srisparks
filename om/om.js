/**
 * O&M Page JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll to top functionality
    initScrollToTop();
    
    // Initialize stat counter animations if present
    initStatCounters();
});

/**
 * Initialize scroll to top button functionality
 */
function initScrollToTop() {
    // Get the button
    const scrollTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollTopBtn) return;
    
    // Function to show/hide the button based on scroll position
    function toggleScrollButton() {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            scrollTopBtn.style.display = 'flex';
            scrollTopBtn.classList.add('scroll-visible');
        } else {
            scrollTopBtn.style.display = 'none';
            scrollTopBtn.classList.remove('scroll-visible');
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', toggleScrollButton);
    
    // Add click event to scroll to top
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initial check
    toggleScrollButton();
}

/**
 * Initialize stat counter animations
 */
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

/**
 * Animate a counter element from 0 to its target value
 * @param {HTMLElement} element The element to animate
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}
