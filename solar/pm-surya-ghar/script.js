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
});
