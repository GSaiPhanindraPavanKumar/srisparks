// Initialize page-specific animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Force fix benefit cards display
    setTimeout(() => {
        document.querySelectorAll('.benefit-card').forEach(card => {
            card.style.display = 'block';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
        });
    }, 100);
    
    // Add feature items hover effect
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            
            const icon = this.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Scroll to top functionality
    const scrollBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.classList.remove('hidden');
            scrollBtn.classList.add('flex');
        } else {
            scrollBtn.classList.remove('flex');
            scrollBtn.classList.add('hidden');
        }
    });
    
    // Animated entry for feature items
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }, index * 200);
                featureObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
        featureObserver.observe(item);
    });
});
