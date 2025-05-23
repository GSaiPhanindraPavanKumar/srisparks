class Router {
    constructor() {
        this.routes = {};
        this.currentPath = '';
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname, false);
        });
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    removeRoute(path) {
        delete this.routes[path];
    }

    navigate(path, addToHistory = true) {
        // Prevent navigation if already on the path
        if (path === window.location.pathname) {
            return;
        }

        // Check if path exists before navigation
        const route = this.findMatchingRoute(path);
        if (!route) {
            // Immediately redirect to 404.html for unknown routes
            window.location.replace('/404.html');
            return;
        }

        // Update browser history
        if (addToHistory) {
            window.history.pushState({}, '', path);
        }

        this.currentPath = path;
        
        // Execute route handler only once
        if (this.routes[route]) {
            requestAnimationFrame(() => {
                this.routes[route]();
            });
        }
    }

    findMatchingRoute(path) {
        // Exact match
        if (this.routes[path]) return path;

        // Check for dynamic segments
        return Object.keys(this.routes).find(route => {
            const routeParts = route.split('/');
            const pathParts = path.split('/');

            if (routeParts.length !== pathParts.length) return false;

            return routeParts.every((part, i) => {
                if (part.startsWith(':')) return true;
                return part === pathParts[i];
            });
        });
    }

    handle404() {
        document.title = '404 - Page Not Found';
        window.location.href = '/404.html';
    }

    init() {
        this.addRoute('/', () => {
            document.title = 'SriSparks Infra';
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        });

        this.addRoute('/solar/pm-surya-ghar', () => {
            document.title = 'PM Surya Ghar - SriSparks';
            window.location.href = '/solar/pm-surya-ghar/index.html';
        });

        this.addRoute('/solar/pm-surya-ghar/index.html', () => {
            document.title = 'PM Surya Ghar - SriSparks';
        });

        this.addRoute('/solar/commercial', () => {
            document.title = 'Commercial Solar - SriSparks';
            window.location.href = '/solar/commercial/index.html';
        });

        this.addRoute('/solar/commercial/index.html', () => {
            document.title = 'Commercial Solar - SriSparks';
        });

        // Initialize current path
        this.currentPath = window.location.pathname;
    }
}

// Create and export router instance
export const router = new Router();

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    router.init();
    
    // Add click handler for navigation links
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-route]')) {
            e.preventDefault();
            const path = e.target.getAttribute('data-route');
            router.navigate(path);
        }
    });
});
