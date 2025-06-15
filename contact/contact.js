document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const categorySelect = document.getElementById('category');
    const messageField = document.getElementById('message');
    const messageRequired = document.getElementById('messageRequired');
    const messageNote = document.getElementById('messageNote');
    const submitButton = document.querySelector('.submit-button');
    
    // Google Apps Script URL for form submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxNhxuanqrwRhPQYoJCQMFdQp_PMRKoS0Q1IMt49mU78NTCeoX9GUVh6dMHuqHYqSNPMg/exec';
    
    // Initialize form behavior
    initializeForm();
    
    // Main initialization function
    function initializeForm() {
        // Update message requirement based on category selection
        if (categorySelect && messageField && messageRequired) {
            categorySelect.addEventListener('change', updateMessageRequirement);
        }
        
        // Handle form submission
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Ensure message note is visible
        if (messageNote) {
            messageNote.style.display = 'flex';
        }
    }
    
    // Update whether message is required based on category
    function updateMessageRequirement() {
        if (this.value === 'others') {
            messageRequired.textContent = '*';
            messageRequired.className = 'required';
            messageField.setAttribute('required', true);
            messageField.placeholder = 'Please describe your requirements (Required)';
        } else {
            messageRequired.textContent = '(Optional)';
            messageRequired.className = 'optional';
            messageField.removeAttribute('required');
            messageField.placeholder = 'Tell us about your requirements or questions';
        }
    }
    
    // Form submission handler
    function handleFormSubmit(event) {
        event.preventDefault();
        
        // Prevent duplicate submissions
        if (submitButton.disabled) return;
        
        // Validate form
        if (!validateForm()) return;
        
        // Update button to show loading state
        submitButton.disabled = true;
        const originalButtonHtml = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Submitting...</span><i class="fas fa-spinner fa-spin"></i>';
        
        // Prepare form data
        const formData = new FormData(contactForm);
        
        // Add category text to message
        if (categorySelect) {
            const categoryText = categorySelect.options[categorySelect.selectedIndex].text;
            const existingMessage = formData.get("message") || "";
            formData.set("message", `[${categoryText}] ${existingMessage}`);
        }
        
        // Submit the form
        fetch(scriptURL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Success!', data);
            showSuccessMessage();
        })
        .catch(error => {
            console.error('Error!', error);
            alert('There was an error submitting your form. Please try again or contact us directly.');
        })
        .finally(() => {
            // Restore button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHtml;
        });
    }
    
    // Show success message and hide form
    function showSuccessMessage() {
        if (contactForm && formSuccess) {
            contactForm.style.display = 'none';
            formSuccess.classList.remove('hidden');
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset form for if user comes back
            contactForm.reset();
        }
    }
    
    // Form validation
    function validateForm() {
        clearErrors();
        let isValid = true;
        
        if (!validateRequired('name')) isValid = false;
        if (!validateMobile('mobile')) isValid = false;
        if (!validateRequired('city')) isValid = false;
        if (!validateRequired('category')) isValid = false;
        
        // Message is required only if "Others" is selected
        if (categorySelect && categorySelect.value === 'others' && !validateRequired('message')) {
            isValid = false;
        }
        
        return isValid;
    }
    
    // Validate required fields
    function validateRequired(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        if (!field || !errorElement) return true;
        
        if (!field.value.trim()) {
            const fieldGroup = field.parentElement;
            fieldGroup.classList.add('error');
            errorElement.textContent = 'This field is required';
            return false;
        }
        
        return true;
    }
    
    // Validate mobile number
    function validateMobile(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        if (!field || !errorElement) return true;
        
        if (!field.value.trim()) {
            const fieldGroup = field.parentElement;
            fieldGroup.classList.add('error');
            errorElement.textContent = 'Mobile number is required';
            return false;
        }
        
        // Check if valid 10-digit Indian mobile number (starts with 6-9)
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(field.value.trim())) {
            const fieldGroup = field.parentElement;
            fieldGroup.classList.add('error');
            errorElement.textContent = 'Please enter a valid 10-digit mobile number';
            return false;
        }
        
        return true;
    }
    
    // Clear all error messages
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const formGroups = document.querySelectorAll('.form-group');
        
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        formGroups.forEach(group => {
            group.classList.remove('error');
        });
    }
});
