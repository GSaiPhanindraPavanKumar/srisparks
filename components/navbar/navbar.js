function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Handle navigation links
        const navLinks = navbar.querySelectorAll('a[href^="/#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't process dropdown parent links in mobile view
                const isMobileDropdownParent = 
                    window.innerWidth <= 768 && 
                    (link.parentElement.classList.contains('dropdown') || 
                     link.parentElement.classList.contains('sub-dropdown'));
                
                if (isMobileDropdownParent) {
                    return; // Let the dropdown handler deal with this
                }
                
                e.preventDefault();
                const targetId = link.getAttribute('href').replace('/', '');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                } else if (window.location.pathname !== '/') {
                    window.location.href = '/' + targetId;
                }
            });
        });

        // Check initial scroll position
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }

        // Add scroll event listener
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

function initMobileMenu() {
    const menuButton = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // Clear any existing click event listeners
    if (menuButton) {
        const newMenuButton = menuButton.cloneNode(true);
        if (menuButton.parentNode) {
            menuButton.parentNode.replaceChild(newMenuButton, menuButton);
        }
        
        // Add event listener to the new button
        document.getElementById('menu-toggle')?.addEventListener('click', () => {
            const mMenu = document.getElementById('mobile-menu');
            if (mMenu) {
                mMenu.classList.toggle('hidden');
                console.log('Mobile menu toggled', mMenu.classList.contains('hidden') ? 'hidden' : 'visible');
            }
        });
    }
    
    if (mobileMenu) {
        // Handle dropdowns in mobile menu
        const dropdownToggles = mobileMenu.querySelectorAll('.dropdown > a');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
                
                // IMPORTANT: Don't close the mobile menu
                mobileMenu.classList.remove('hidden');
                
                return false;
            });
            
            // Add specific handler for the arrow icon to prevent menu hiding
            const arrow = toggle.querySelector('.dropdown-arrow');
            if (arrow) {
                arrow.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Ensure mobile menu stays visible
                    mobileMenu.classList.remove('hidden');
                    
                    // Toggle the dropdown active state
                    const dropdown = this.closest('.dropdown');
                    if (dropdown) dropdown.classList.toggle('active');
                    
                    return false;
                });
            }
        });
        
        // Set up sub-dropdown toggles with similar arrow handling
        const subDropdownToggles = mobileMenu.querySelectorAll('.sub-dropdown > a');
        subDropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const subDropdown = this.parentElement;
                subDropdown.classList.toggle('active');
                
                // IMPORTANT: Don't close the mobile menu
                mobileMenu.classList.remove('hidden');
                
                return false;
            });
            
            // Add specific handler for the sub-dropdown arrow icon
            const arrow = toggle.querySelector('.dropdown-arrow');
            if (arrow) {
                arrow.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Ensure mobile menu stays visible
                    mobileMenu.classList.remove('hidden');
                    
                    // Toggle the sub-dropdown active state
                    const subDropdown = this.closest('.sub-dropdown');
                    if (subDropdown) subDropdown.classList.toggle('active');
                    
                    return false;
                });
            }
        });
        
        // Only close menu when clicking actual navigation links (not toggles)
        const navigationLinks = mobileMenu.querySelectorAll('a');
        navigationLinks.forEach(link => {
            if (!link.parentElement.classList.contains('dropdown') && 
                !link.parentElement.classList.contains('sub-dropdown')) {
                
                // Only these links should close the menu
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            }
        });
    }
}

// Create a global function to reinitialize the mobile menu
window.fixNavbar = function() {
    initMobileMenu();
    console.log('Mobile menu initialized');
};

// Initialize the navbar when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    console.log('Navbar initialized');
});

function validateRoute(path) {
    const baseUrl = window.location.origin;
    const currentPath = window.location.pathname;
    
    // If already on the target page, don't navigate
    if (currentPath.includes(path)) {
        return;
    }

    // Check if path exists
    fetch(`${baseUrl}${path}`)
        .then(response => {
            if (response.ok) {
                window.location.href = path;
            } else {
                console.warn(`Route ${path} not found`);
            }
        })
        .catch(error => {
            console.error('Navigation error:', error);
        });
}

export { initNavbar, initMobileMenu, validateRoute };