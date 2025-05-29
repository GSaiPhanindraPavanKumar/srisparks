/**
 * Installation Carousel Configuration
 * Add or remove customer installations by simply updating this array
 * Each object represents one customer with two photos
 */
const carouselCustomers = [
    {
        id: 1,
        solarImage: "../../images/Installed/1-1.jpg",
        meterImage: "../../images/Installed/1-2.jpg",
        alt: "Customer Installation 1"
    },
    {
        id: 2,
        solarImage: "../../images/Installed/2-1.jpg",
        meterImage: "../../images/Installed/2-2.jpg",
        alt: "Customer Installation 2"
    },
    {
        id: 3,
        solarImage: "../../images/Installed/3-1.jpg",
        meterImage: "../../images/Installed/3-2.jpg",
        alt: "Customer Installation 3"
    },
    {
        id: 4,
        solarImage: "../../images/Installed/4-1.jpg",
        meterImage: "../../images/Installed/4-2.jpg",
        alt: "Customer Installation 4"
    },
    {
        id: 5,
        solarImage: "../../images/Installed/5-1.jpg",
        meterImage: "../../images/Installed/5-2.jpg",
        alt: "Customer Installation 5"
    },
    {
        id: 6,
        solarImage: "../../images/Installed/6-1.jpg",
        meterImage: "../../images/Installed/6-2.jpg",
        alt: "Customer Installation 6"
    },
    {
        id: 7,
        solarImage: "../../images/Installed/7-1.jpg",
        meterImage: "../../images/Installed/7-2.jpg",
        alt: "Customer Installation 7"
    },
    {
        id: 8,
        solarImage: "../../images/Installed/8-1.jpg",
        meterImage: "../../images/Installed/8-2.jpg",
        alt: "Customer Installation 8"
    },
    {
        id: 9,
        solarImage: "../../images/Installed/9-1.jpg",
        meterImage: "../../images/Installed/9-2.jpg",
        alt: "Customer Installation 9"
    },
    {
        id: 10,
        solarImage: "../../images/Installed/10-1.jpg",
        meterImage: "../../images/Installed/10-2.jpg",
        alt: "Customer Installation 10"
    },
    {
        id: 11,
        solarImage: "../../images/Installed/11-1.jpg",
        meterImage: "../../images/Installed/11-2.jpg",
        alt: "Customer Installation 11"
    },
    {
        id: 12,
        solarImage: "../../images/Installed/12-1.jpg",
        meterImage: "../../images/Installed/12-2.jpg",
        alt: "Customer Installation 12"
    },
    {
        id: 13,
        solarImage: "../../images/Installed/13-1.jpg",
        meterImage: "../../images/Installed/13-2.jpg",
        alt: "Customer Installation 13"
    },
    {
        id: 14,
        solarImage: "../../images/Installed/14-1.jpg",
        meterImage: "../../images/Installed/14-2.jpg",
        alt: "Customer Installation 14"
    },
    {
        id: 15,
        solarImage: "../../images/Installed/15-1.jpg",
        meterImage: "../../images/Installed/15-2.jpg",
        alt: "Customer Installation 15"
    },
    // Add more customers here as needed
    // Example:
    // {
    //    id: 6,
    //    solarImage: "../../images/Installed/6-1.jpg",
    //    meterImage: "../../images/Installed/6-2.jpg",
    //    alt: "Customer Installation 6"
    // },
];

// Function to detect image orientation before rendering
async function detectOrientation(imageUrl) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
            const isPortrait = this.height > this.width;
            resolve(isPortrait);
        };
        img.onerror = function() {
            // Default to landscape if image can't be loaded
            resolve(false);
        };
        img.src = imageUrl;
    });
}

// Function to initialize the carousel with the configured images
async function initializeCarousel() {
    const carouselSlides = document.querySelector('.carousel-slides');
    const carouselIndicators = document.querySelector('.carousel-indicators');
    
    if (!carouselSlides || !carouselIndicators) return;
    
    // Clear existing content
    carouselSlides.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    // Add slides from configuration
    for (let index = 0; index < carouselCustomers.length; index++) {
        const customer = carouselCustomers[index];
        
        // Create slide containing both solar and meter images
        const slide = document.createElement('div');
        slide.className = 'carousel-slide min-w-full';
        slide.innerHTML = `
            <div class="installation-images-container">
                <div class="installation-image solar-image">
                    <img src="${customer.solarImage}" alt="${customer.alt} - Solar" class="carousel-img">
                    <div class="image-label">Solar Installation</div>
                </div>
                <div class="installation-image meter-image">
                    <img src="${customer.meterImage}" alt="${customer.alt} - Meter" class="carousel-img">
                    <div class="image-label">Meter</div>
                </div>
            </div>
        `;
        carouselSlides.appendChild(slide);
        
        // Create indicator
        const indicator = document.createElement('button');
        indicator.className = `indicator-dot h-3 w-3 rounded-full ${index === 0 ? 'bg-blue-600 w-4' : 'bg-blue-300'} mx-1`;
        indicator.setAttribute('data-index', index);
        carouselIndicators.appendChild(indicator);
    }
    
    // Add CSS for dual-image layout
    addImageHandlingStyles();
    
    setupCarouselControls(carouselCustomers.length);
}

// Add dynamic styles to handle different image orientations and dual-image layout
function addImageHandlingStyles() {
    // Check if the style already exists to avoid duplicates
    if (!document.getElementById('carousel-image-styles')) {
        const style = document.createElement('style');
        style.id = 'carousel-image-styles';
        style.textContent = `
            /* Dual image container */
            .installation-images-container {
                display: flex;
                width: 100%;
                height: 400px;
                gap: 16px;
                padding: 0 8px;
            }
            
            .installation-image {
                position: relative;
                flex: 1;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #f1f1f1;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            
            .carousel-img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
            
            .image-label {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.6);
                color: white;
                padding: 8px;
                text-align: center;
                font-size: 14px;
                font-weight: 500;
                backdrop-filter: blur(4px);
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .installation-images-container {
                    flex-direction: column;
                    height: auto;
                    gap: 10px;
                }
                
                .installation-image {
                    height: 200px;
                }
                
                .carousel-img {
                    max-height: 180px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Function to set up carousel control functionality
function setupCarouselControls(totalSlides) {
    const carouselSlides = document.querySelector('.carousel-slides');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator-dot');
    let currentSlide = 0;
    
    // Initialize carousel
    updateCarouselPosition();
    
    // Event listeners for controls
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarouselPosition();
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarouselPosition();
    });
    
    // Event listeners for indicators
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', () => {
            currentSlide = parseInt(indicator.getAttribute('data-index'));
            updateCarouselPosition();
        });
    });
    
    // Auto-advance carousel
    let carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarouselPosition();
    }, 5000);
    
    // Pause auto-advance on hover
    const carouselContainer = document.querySelector('.installation-carousel');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarouselPosition();
        }, 5000);
    });
    
    function updateCarouselPosition() {
        // Update slide position
        carouselSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update indicators
        indicators.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('bg-blue-600', 'w-4');
                dot.classList.remove('bg-blue-300');
            } else {
                dot.classList.remove('bg-blue-600', 'w-4');
                dot.classList.add('bg-blue-300');
            }
        });
    }
}

// Export functions for use
export { initializeCarousel };
