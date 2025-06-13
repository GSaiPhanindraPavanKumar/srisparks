document.addEventListener('DOMContentLoaded', function () {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxNhxuanqrwRhPQYoJCQMFdQp_PMRKoS0Q1IMt49mU78NTCeoX9GUVh6dMHuqHYqSNPMg/exec';

    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const categorySelect = document.getElementById('category');
    const messageField = document.getElementById('message');
    const messageRequired = document.getElementById('messageRequired');
    const messageNote = document.getElementById('messageNote');
    const submitButton = document.querySelector('.submit-button');

    let isSubmitting = false; // Prevent double submissions

    // Show message note when form loads
    if (messageNote) {
        messageNote.style.display = 'block';
    }

    // Update message requirement based on category
    if (categorySelect && messageField && messageRequired) {
        categorySelect.addEventListener('change', function () {
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

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (isSubmitting) return; // Prevent multiple clicks
            isSubmitting = true;

            if (!validateForm()) {
                isSubmitting = false;
                return false;
            }

            // Show loading state
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<span>Submitting...</span><i class="fas fa-spinner fa-spin ml-2"></i>';
            }

            const formData = new FormData(contactForm);

            // Add category name to message
            if (categorySelect) {
                const categoryText = categorySelect.options[categorySelect.selectedIndex].text;
                const existingMessage = formData.get("message") || "";
                formData.set("message", existingMessage + (existingMessage ? "\n\n" : ""));
            }

            // Submit via fetch (CORS-safe using FormData)
            fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                })
                .then(data => {
                    console.log('Success!', data);
                    contactForm.style.display = 'none';
                    if (formSuccess) {
                        formSuccess.classList.remove('hidden');
                        formSuccess.scrollIntoView({ behavior: 'smooth' });
                    }
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error!', error);
                    alert('Error submitting form! Please try again later.');
                })
                .finally(() => {
                    isSubmitting = false;
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerHTML = '<span>Submit Request</span><i class="fas fa-paper-plane ml-2"></i><span class="button-shine"></span>';
                    }
                });
        });
    }

    // --- Validation Functions ---
    function validateForm() {
        clearErrors();
        let isValid = true;

        if (!validateRequired('name')) isValid = false;
        if (!validateMobile('mobile')) isValid = false;
        if (!validateRequired('city')) isValid = false;
        if (!validateRequired('category')) isValid = false;
        if (categorySelect && categorySelect.value === 'others' && !validateRequired('message')) isValid = false;

        return isValid;
    }

    function validateRequired(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        if (!field || !errorElement) return false;

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
        if (!field || !errorElement) return false;

        if (!field.value.trim()) {
            field.parentElement.classList.add('error');
            errorElement.textContent = 'Mobile number is required';
            errorElement.style.display = 'block';
            return false;
        }

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
        errorElements.forEach(e => {
            e.style.display = 'none';
            e.textContent = '';
        });
        formGroups.forEach(g => g.classList.remove('error'));
    }

    // Optional: Map iframe fallback
    window.handleMapError = function () {
        console.log('Google Maps iframe failed to load');
        const mapFallback = document.getElementById('mapFallback');
        if (mapFallback) {
            mapFallback.style.display = 'flex';
        }
    };

    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        mapIframe.addEventListener('load', function () {
            try {
                const frameContent = this.contentDocument || this.contentWindow.document;
                handleMapError();
            } catch (e) {
                console.log('Map iframe loaded successfully');
            }
        });

        setTimeout(function () {
            if (mapIframe.clientHeight < 100) {
                handleMapError();
            }
        }, 3000);
    }
});
