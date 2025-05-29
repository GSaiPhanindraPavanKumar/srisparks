// Import the navbar scroll behavior
import './navbar-scroll.js';

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Handle navigation links
        const navLinks = navbar.querySelectorAll('a[href^="/#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
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
                const parent = dropdown.parentElement;
                parent.classList.toggle('active');
            }
        });
    });

    const subDropdowns = document.querySelectorAll('.sub-dropdown > a');
    subDropdowns.forEach(subDropdown => {
        subDropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = subDropdown.parentElement;
                parent.classList.toggle('active');
            }
        });
    });

    const mobileLinks = mobileMenu?.getElementsByTagName('a') || [];
    for (let link of mobileLinks) {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }
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
