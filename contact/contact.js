/**
 * Contact Form with Google Sheets Integration - Fixed submission method
 */
document.addEventListener('DOMContentLoaded', function() {
    // Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxNhxuanqrwRhPQYoJCQMFdQp_PMRKoS0Q1IMt49mU78NTCeoX9GUVh6dMHuqHYqSNPMg/exec';
    
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const categorySelect = document.getElementById('category');
    const messageField = document.getElementById('message');
    const messageRequired = document.getElementById('messageRequired');
    const messageNote = document.getElementById('messageNote');
    const submitButton = document.querySelector('.submit-button');
    
    // Show message note when form loads
    if (messageNote) {
        messageNote.style.display = 'block';
    }
    
    // Update message requirement based on category selection
    if (categorySelect && messageField && messageRequired) {
        categorySelect.addEventListener('change', function() {
            if (this.value === 'others') {
                messageRequired.textContent = '*';
                messageRequired.className = 'text-red-500';
                messageField.setAttribute('required', true);
            } else {
                messageRequired.textContent = '(Optional)';
                messageRequired.className = 'text-gray-500';
                messageField.removeAttribute('required');
            }
        });
    }
    
    // Form submission without CORS issues
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!validateForm()) return false;
            
            // Show loading state
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<span>Submitting...</span><i class="fas fa-spinner fa-spin ml-2"></i>';
            }
            
            // Get form data
            const formData = new FormData(contactForm);
            const formProps = Object.fromEntries(formData);
            
            // Add category text to message for better context
            if (categorySelect) {
                const categoryText = categorySelect.options[categorySelect.selectedIndex].text;
                formProps.message = (formProps.message ? formProps.message : '') + 
                                   (formProps.message ? '\n\n' : '') + 
                                   'Category: ' + categoryText;
            }
            
            // Convert to JSON string as expected by the Apps Script
            const jsonData = JSON.stringify(formProps);
            
            // Use XMLHttpRequest instead of fetch (more compatible with Apps Script)
            const xhr = new XMLHttpRequest();
            xhr.open('POST', scriptURL);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    console.log('Success!', xhr.responseText);
                    
                    // Hide form and show success message
                    contactForm.style.display = 'none';
                    if (formSuccess) {
                        formSuccess.classList.remove('hidden');
                        formSuccess.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    console.error('Error!', xhr.statusText);
                    alert('Error submitting form! Please try again later.');
                }
                
                // Reset button state
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<span>Submit Request</span><i class="fas fa-paper-plane ml-2"></i><span class="button-shine"></span>';
                }
            };
            
            xhr.onerror = function() {
                console.error('Network Error!');
                alert('Network error when submitting the form. Please try again later.');
                
                // Reset button state
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<span>Submit Request</span><i class="fas fa-paper-plane ml-2"></i><span class="button-shine"></span>';
                }
            };
            
            // Send the request
            xhr.send(jsonData);
        });
    }
    
    // Validate the entire form
    function validateForm() {
        // Clear previous errors
        clearErrors();
        
        let isValid = true;
        
        // Validate required fields
        if (!validateRequired('name')) {
            isValid = false;
        }
        
        if (!validateMobile('mobile')) {
            isValid = false;
        }
        
        if (!validateRequired('city')) {
            isValid = false;
        }
        
        if (!validateRequired('category')) {
            isValid = false;
        }
        
        // Validate message if category is 'others'
        if (categorySelect && categorySelect.value === 'others' && !validateRequired('message')) {
            isValid = false;
        }
        
        return isValid;
    }
    
    // Validation Functions
    function validateRequired(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        if (!field || !errorElement) {
            console.error(`Field or error element not found: ${fieldId}`);
            return false;
        }
        
        if (!field.value.trim()) {
            field.parentElement.classList.add('error');
            errorElement.textContent = 'This field is required';
            errorElement.style.display = 'block';
            return false;
        }
        
        return true;
    }
    
    function validateMobile(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        if (!field || !errorElement) {
            console.error(`Field or error element not found: ${fieldId}`);
            return false;
        }
        
        if (!field.value.trim()) {
            field.parentElement.classList.add('error');
            errorElement.textContent = 'Mobile number is required';
            errorElement.style.display = 'block';
            return false;
        }
        
        // Indian mobile number validation (10 digits)
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(field.value.trim())) {
            field.parentElement.classList.add('error');
            errorElement.textContent = 'Enter a valid 10-digit mobile number';
            errorElement.style.display = 'block';
            return false;
        }
        
        return true;
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const formGroups = document.querySelectorAll('.form-group');
        
        errorElements.forEach(element => {
            element.style.display = 'none';
            element.textContent = '';
        });
        
        formGroups.forEach(group => {
            group.classList.remove('error');
        });
    }
    
    // Map error handling
    window.handleMapError = function() {
        console.log('Google Maps iframe failed to load');
        const mapFallback = document.getElementById('mapFallback');
        if (mapFallback) {
            mapFallback.style.display = 'flex';
        }
    };
    
    // Check if the map iframe has loaded correctly
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        mapIframe.addEventListener('load', function() {
            try {
                // Attempt to access content to verify iframe loaded properly
                const frameContent = this.contentDocument || this.contentWindow.document;
                // If we can access the content, the iframe is from the same origin and likely failed
                handleMapError();
            } catch (e) {
                // If we can't access content, iframe loaded from different origin (Google Maps)
                // This is expected and means the iframe is working correctly
                console.log('Map iframe loaded successfully');
            }
        });
        
        // Also set a fallback timeout just in case
        setTimeout(function() {
            // Check if iframe loaded - if it has no height, it probably failed
            if (mapIframe.clientHeight < 100) {
                handleMapError();
            }
        }, 3000);
    }
});