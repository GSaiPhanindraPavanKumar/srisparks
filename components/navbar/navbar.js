function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
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

    const mobileLinks = mobileMenu?.getElementsByTagName('a') || [];
    for (let link of mobileLinks) {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }
}

export { initNavbar, initMobileMenu };
