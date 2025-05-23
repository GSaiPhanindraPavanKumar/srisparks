/**
 * Enhanced scroll animations for SriSparks website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set up intersection observer
    const observerOptions = {
        root: null, // Use viewport
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };

    // Create observer instance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('visible');
                
                // Only animate once, then unobserve
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animations to various elements with appropriate animation types
    function setupScrollAnimations() {
        // Apply to feature cards with staggered delay
        document.querySelectorAll('.feature-card, .service-card').forEach((el, index) => {
            el.classList.add('scroll-fade-up');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });

        // Apply to project cards alternating from left and right
        document.querySelectorAll('.project-card').forEach((el, index) => {
            if (index % 2 === 0) {
                el.classList.add('scroll-fade-left');
            } else {
                el.classList.add('scroll-fade-right');
            }
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });

        // Apply to value cards with pop-in effect
        document.querySelectorAll('.value-card').forEach((el, index) => {
            el.classList.add('scroll-pop');
            el.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(el);
        });

        // Apply to section titles
        document.querySelectorAll('section h2').forEach(el => {
            el.classList.add('scroll-fade-up');
            observer.observe(el);
        });

        // Apply to table rows with staggered delay
        document.querySelectorAll('tbody tr').forEach((el, index) => {
            el.classList.add('scroll-fade-up');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });

        // Apply to lists with staggered delay
        document.querySelectorAll('#om ul li, .contact-info li').forEach((el, index) => {
            el.classList.add('scroll-fade-left');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
        
        // Apply to service list items
        document.querySelectorAll('.service-content ul li').forEach((el, index) => {
            el.classList.add('scroll-fade-right');
            el.style.transitionDelay = `${index * 0.05}s`;
            observer.observe(el);
        });

        // Apply to icons with pop effect
        document.querySelectorAll('.feature-card i, .service-card i, .value-card i').forEach((el) => {
            el.classList.add('scroll-pop');
            observer.observe(el);
        });
    }

    // Initialize animations
    setupScrollAnimations();
    
    // Enhance hover effects for various components
    function setupHoverEffects() {
        // Enhanced table hover
        const tableRows = document.querySelectorAll('tbody tr');
        tableRows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                // Add highlight to cells on hover
                const cells = this.querySelectorAll('td');
                cells.forEach(cell => {
                    cell.style.transition = 'all 0.3s ease';
                    cell.style.color = '#0056b3';
                });
            });
            
            row.addEventListener('mouseleave', function() {
                const cells = this.querySelectorAll('td');
                cells.forEach(cell => {
                    cell.style.color = '';
                });
            });
        });
        
        // Enhanced card hover effects (3D tilt)
        const cards = document.querySelectorAll('.feature-card, .service-card, .project-card, .value-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const tiltX = (y - centerY) / 10;
                const tiltY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
    
    // Initialize hover effects
    setupHoverEffects();
});
