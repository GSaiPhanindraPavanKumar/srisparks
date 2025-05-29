/**
 * Helper function to handle image loading
 * Ensures all carousel images are properly loaded
 */

function setupImageLoading() {
    document.addEventListener('DOMContentLoaded', () => {
        // Add loading state to image containers
        document.querySelectorAll('.installation-image').forEach(container => {
            container.classList.add('loading');
            
            const img = container.querySelector('img');
            if (img) {
                // When image loads, remove loading state
                img.onload = function() {
                    container.classList.remove('loading');
                    // Ensure the image class adjustment happens after load
                    adjustImageClass(img, container);
                };
                
                img.onerror = function() {
                    container.classList.remove('loading');
                    // Add a placeholder or error state
                    container.innerHTML = `
                        <div class="image-error">
                            <i class="fas fa-image"></i>
                            <p>Image could not be loaded</p>
                        </div>
                    `;
                };
                
                // If the image is already cached and loaded
                if (img.complete) {
                    container.classList.remove('loading');
                    adjustImageClass(img, container);
                }
            }
        });
        
        // Add smooth fade-in for images
        const style = document.createElement('style');
        style.textContent = `
            .carousel-img {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            .carousel-img.loaded {
                opacity: 1;
            }
            .image-error {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                color: #666;
            }
            .image-error i {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
        `;
        document.head.appendChild(style);
        
        // Apply loaded class after a small delay
        setTimeout(() => {
            document.querySelectorAll('.carousel-img').forEach(img => {
                if (img.complete) {
                    img.classList.add('loaded');
                } else {
                    img.onload = () => img.classList.add('loaded');
                }
            });
        }, 100);
    });
}

// Helper function to adjust image class based on current dimensions
function adjustImageClass(img, container) {
    if (img.naturalHeight > img.naturalWidth) {
        container.classList.add('portrait-image');
        container.classList.remove('landscape-image');
    } else {
        container.classList.add('landscape-image');
        container.classList.remove('portrait-image');
    }
}

export { setupImageLoading };
