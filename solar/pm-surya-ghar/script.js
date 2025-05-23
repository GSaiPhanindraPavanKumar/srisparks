// Initialize page-specific animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animate hero icons on load
    const heroIcons = document.querySelectorAll('.hero-icons i');
    heroIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }, 300 * index);
    });

    // Animate benefits cards on scroll
    const benefits = document.querySelectorAll('.benefit-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                benefitsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    benefits.forEach(benefit => {
        benefit.style.opacity = '0';
        benefit.style.transform = 'translateY(20px)';
        benefitsObserver.observe(benefit);
    });

    // Smooth scroll for the scroll-down button
    const scrollDownBtn = document.querySelector('.scroll-down-btn');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById('content-section');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Show/hide scroll button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                scrollDownBtn.style.opacity = '0';
                scrollDownBtn.style.pointerEvents = 'none';
            } else {
                scrollDownBtn.style.opacity = '1';
                scrollDownBtn.style.pointerEvents = 'auto';
            }
        });

        // Add hover interactions
        scrollDownBtn.addEventListener('mouseenter', function() {
            this.querySelector('.scroll-arrow').classList.add('hover');
        });

        scrollDownBtn.addEventListener('mouseleave', function() {
            this.querySelector('.scroll-arrow').classList.remove('hover');
        });
    }
});
