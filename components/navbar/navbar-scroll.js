document.addEventListener('DOMContentLoaded', function() {
    const whatsappBar = document.querySelector('.whatsapp-contact-bar');
    const navbar = document.querySelector('.navbar');
    
    if (!whatsappBar || !navbar) return;
    
    // Store initial navbar position and dimensions for reference
    const navbarHeight = navbar.offsetHeight;
    let whatsappBarHeight = whatsappBar.offsetHeight;
    
    // Function to update navbar positioning based on scroll
    function updateNavbarPosition() {
        const scrollPosition = window.scrollY;
        
        // If scrolled past whatsapp bar
        if (scrollPosition >= whatsappBarHeight) {
            if (!navbar.classList.contains('fixed')) {
                navbar.classList.add('fixed');
                navbar.style.top = '0';
                // Add padding to body to prevent content jump
                document.body.style.paddingTop = navbarHeight + 'px';
            }
        } else {
            if (navbar.classList.contains('fixed')) {
                navbar.classList.remove('fixed');
                navbar.style.top = '';
                // Remove padding when navbar returns to normal flow
                document.body.style.paddingTop = '0';
            }
        }
    }
    
    // Run on page load
    updateNavbarPosition();
    
    // Run on scroll
    window.addEventListener('scroll', updateNavbarPosition);
    
    // Run on resize (whatsapp bar height might change)
    window.addEventListener('resize', function() {
        whatsappBarHeight = whatsappBar.offsetHeight;
        updateNavbarPosition();
    });
});
