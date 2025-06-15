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

    menuButton?.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Add dropdown functionality for mobile
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation(); // Stop event bubbling
                const parent = dropdown.parentElement;
                
                // Close all other open dropdowns
                document.querySelectorAll('.dropdown.active').forEach(item => {
                    if (item !== parent) item.classList.remove('active');
                });
                
                parent.classList.toggle('active');
                return false; // Ensure no navigation happens
            }
        });
    });

    const subDropdowns = document.querySelectorAll('.sub-dropdown > a');
    subDropdowns.forEach(subDropdown => {
        subDropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation(); // Stop event bubbling
                const parent = subDropdown.parentElement;
                
                // Close all other open sub-dropdowns
                const siblings = parent.parentElement.querySelectorAll('.sub-dropdown.active');
                siblings.forEach(item => {
                    if (item !== parent) item.classList.remove('active');
                });
                
                parent.classList.toggle('active');
                return false; // Ensure no navigation happens
            }
        });
    });

    // Only close mobile menu on click of actual navigation links, not dropdown toggles
    const mobileLinks = mobileMenu?.querySelectorAll('a:not(.dropdown > a):not(.sub-dropdown > a)') || [];
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only close menu when clicking a non-dropdown link
            if (!link.parentElement.classList.contains('dropdown') && 
                !link.parentElement.classList.contains('sub-dropdown')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
}

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