/**
 * Common Scroll to Top Button Implementation
 * To be used across all Sri Sparks web pages
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create and insert the scroll-to-top button if it doesn't exist
    if (!document.getElementById('scrollToTop')) {
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollToTop';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollBtn);
    }
    
    // Get the button
    const scrollTopBtn = document.getElementById('scrollToTop');
    
    // Function to show/hide button based on scroll position
    function toggleScrollButton() {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
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
});
