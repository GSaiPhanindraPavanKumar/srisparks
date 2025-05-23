function initFooter() {
    // Handle footer link navigation based on current page
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('/#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the parent level from the container
                const footerContainer = document.getElementById('footer-container');
                const parentLevel = footerContainer.getAttribute('data-parent-level') || '';
                
                // Extract the target section id
                const targetId = this.getAttribute('href').replace('/', '');
                
                // Check if we're on the home page
                if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                    // We're on the home page, scroll to the section
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // We're not on the home page, navigate to home page with anchor
                    window.location.href = `${parentLevel}${targetId}`;
                }
            });
        }
    });
    
    // Add animation for social icons on hover
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Add the current year to the copyright text
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Ensure the footer wave is properly positioned
    const footerWaves = document.querySelector('.footer-waves');
    if (footerWaves) {
        const footer = document.querySelector('.footer-section');
        if (footer) {
            // Position the wave right above the footer
            const footerTop = footer.getBoundingClientRect().top;
            const waveHeight = footerWaves.offsetHeight;
            footerWaves.style.top = (footerTop - waveHeight + window.scrollY) + 'px';
        }
    }
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

export { initFooter };
