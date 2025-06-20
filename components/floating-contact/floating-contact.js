// Floating Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create the HTML structure and append to body
  createFloatingContact();

  // Get elements
  const contactButton = document.getElementById('floating-contact-button');
  const contactForm = document.getElementById('floating-contact-form');
  const closeBtn = document.getElementById('close-form-btn');
  const contactFormElement = document.getElementById('consultation-form');
  
  // Variables for tracking form state
  let isFormVisible = false;

  // Toggle form visibility on button click
  contactButton.addEventListener('click', function(e) {
    e.preventDefault();
    toggleFormVisibility();
  });
  
  // Close form when the close button is clicked
  closeBtn.addEventListener('click', function() {
    hideForm();
  });
  
  // Close form when clicking outside
  document.addEventListener('click', function(e) {
    if (isFormVisible && 
        !contactForm.contains(e.target) && 
        e.target !== contactButton && 
        !contactButton.contains(e.target)) {
      hideForm();
    }
  });
  
  // Form submission
  contactFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Show loader
    const formContent = document.getElementById('form-content');
    const formLoader = document.getElementById('form-loader');
    formContent.style.display = 'none';
    formLoader.style.display = 'block';
    
    // Get form data
    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;
    const email = document.getElementById('contact-email').value;
    
    // Create URL-encoded form data instead of JSON
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('name', name);
    urlEncodedData.append('phone', phone);
    urlEncodedData.append('email', email);
    urlEncodedData.append('timestamp', new Date().toISOString());
    urlEncodedData.append('source', window.location.href);
    
    // Google Apps Script Web App URL
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzQ9TkGOKjqXyLb9ggAziooUqOwo7q3qdKllL4t-A_uAvIyco2sQyEz3_vq1vJxLVUAgQ/exec';
    
    // Send data using fetch API with URL-encoded form data (no Content-Type header)
    fetch(scriptUrl, {
      method: 'POST',
      body: urlEncodedData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle both JSON and text responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        return response.text().then(text => {
          return { result: text.includes('success') ? 'success' : 'error', message: text };
        });
      }
    })
    .then(data => {
      // Show success message
      formLoader.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
      
      // Reset form
      contactFormElement.reset();
      
      // Hide success and show form after delay
      setTimeout(() => {
        document.getElementById('form-success').style.display = 'none';
        formContent.style.display = 'block';
        hideForm();
      }, 3000);
    })
    .catch(error => {
      console.error('Error:', error);
      formLoader.style.display = 'none';
      formContent.style.display = 'block';
      alert('There was a problem submitting your form. Please try again later.');
    });
  });
  
  // Helper function to toggle form visibility
  function toggleFormVisibility() {
    if (isFormVisible) {
      hideForm();
    } else {
      showForm();
    }
  }
  
  // Helper function to show form
  function showForm() {
    contactForm.classList.add('show');
    isFormVisible = true;
  }
  
  // Helper function to hide form
  function hideForm() {
    contactForm.classList.remove('show');
    isFormVisible = false;
  }
  
  // Form validation
  function validateForm() {
    let isValid = true;
    
    // Name validation (required)
    const nameInput = document.getElementById('contact-name');
    const nameError = document.getElementById('name-error');
    
    if (nameInput.value.trim() === '' || nameInput.value.trim().length < 2) {
      nameInput.classList.add('error');
      nameError.style.display = 'block';
      nameError.textContent = 'Please enter your name';
      isValid = false;
    } else {
      nameInput.classList.remove('error');
      nameError.style.display = 'none';
    }
    
    // Phone validation (required, 10 digits)
    const phoneInput = document.getElementById('contact-phone');
    const phoneError = document.getElementById('phone-error');
    const phoneRegex = /^[0-9]{10}$/;
    
    if (!phoneRegex.test(phoneInput.value.trim())) {
      phoneInput.classList.add('error');
      phoneError.style.display = 'block';
      phoneError.textContent = 'Please enter a valid 10-digit phone number';
      isValid = false;
    } else {
      phoneInput.classList.remove('error');
      phoneError.style.display = 'none';
    }
    
    // Email validation (optional)
    const emailInput = document.getElementById('contact-email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Only validate email if it's not empty
    if (emailInput.value.trim() !== '' && !emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add('error');
      emailError.style.display = 'block';
      emailError.textContent = 'Please enter a valid email address';
      isValid = false;
    } else {
      emailInput.classList.remove('error');
      emailError.style.display = 'none';
    }
    
    return isValid;
  }
  
  // Create and append the floating contact HTML
  function createFloatingContact() {
    const floatingContactHTML = `
      <div class="floating-contact-container">
        <button id="floating-contact-button" class="floating-contact-button">
          <i class="fas fa-envelope"></i>
          Book Free Consultation
        </button>
        <div id="floating-contact-form" class="floating-contact-form">
          <button id="close-form-btn" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
          
          <div id="form-content">
            <h3>Book Free Consultation</h3>
            <form id="consultation-form">
              <div class="form-group">
                <label for="contact-name">Name *</label>
                <input type="text" id="contact-name" placeholder="Your name" required>
                <div id="name-error" class="form-error"></div>
              </div>
              
              <div class="form-group">
                <label for="contact-phone">Phone Number *</label>
                <input type="tel" id="contact-phone" placeholder="10-digit mobile number" required>
                <div id="phone-error" class="form-error"></div>
              </div>
              
              <div class="form-group">
                <label for="contact-email">Email Address</label>
                <input type="email" id="contact-email" placeholder="Your email address">
                <div id="email-error" class="form-error"></div>
              </div>
              
              <button type="submit" class="submit-btn">Submit Request</button>
              
              <div class="form-footer">
                We'll get back to you within 24 hours.
              </div>
            </form>
          </div>
          
          <div id="form-loader" class="form-loader">
            <div class="spinner"></div>
            <p>Submitting your request...</p>
          </div>
          
          <div id="form-success" class="form-success">
            <i class="fas fa-check-circle"></i>
            <h4>Thank You!</h4>
            <p>We've received your inquiry and will contact you shortly.</p>
          </div>
        </div>
      </div>
    `;
    
    // Create a container element
    const container = document.createElement('div');
    container.innerHTML = floatingContactHTML;
    
    // Append to body
    document.body.appendChild(container.firstElementChild);
  }
});
