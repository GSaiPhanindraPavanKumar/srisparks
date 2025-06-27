/**
 * Commercial Solar Estimator Widget
 * Calculation tool for commercial solar installations
 */

function initCommercialSolarEstimator() {
    const capacityInput = document.getElementById('capacity-input');
    
    // Check if the input exists
    if (!capacityInput) {
        console.error('Commercial solar estimator: Capacity input not found');
        return;
    }
    
    // Initial calculation on page load with default value
    const initialCapacity = parseFloat(capacityInput.value) || 10;
    capacityInput.value = initialCapacity; // Set default value if empty
    updateCommercialResults(initialCapacity);
    
    // Add input event listeners for real-time updates
    capacityInput.addEventListener('input', function() {
        let capacity = parseFloat(this.value);
        
        // Ensure minimum value of 1
        if (isNaN(capacity) || capacity < 1) {
            capacity = 1;
        }
        
        updateCommercialResults(capacity);
    });
    
    // Ensure integer value on blur
    capacityInput.addEventListener('blur', function() {
        let capacity = parseFloat(this.value);
        
        // Reset to 1 if invalid
        if (isNaN(capacity) || capacity < 1) {
            capacity = 1;
            this.value = capacity;
        }
        
        updateCommercialResults(capacity);
    });
}

function updateCommercialResults(capacity) {
    // Calculate results based on capacity
    const results = calculateCommercialSolarResults(capacity);
    
    // Update results in the DOM
    document.getElementById('result-capacity').textContent = capacity.toFixed(1) + ' kW';
    document.getElementById('result-space').textContent = results.spaceRequired.toLocaleString() + ' sq.ft';
    document.getElementById('result-energy').textContent = results.annualEnergy.toLocaleString() + ' units';
    document.getElementById('result-savings').textContent = '₹' + results.annualSavings.toLocaleString();
    
    // Show negotiable investment and contact prompt
    document.getElementById('result-cost').innerHTML = `
        <span style="color:#2563eb;font-weight:600;">Negotiable</span>
        <br>
        <span style="font-size:13px;color:#444;">
            Please <a href="/contact" style="color:#2563eb;text-decoration:underline;font-weight:500;">contact us</a> for the best price.
        </span>
    `;
}

function calculateCommercialSolarResults(capacity) {
    // Calculate results based on capacity
    const spaceRequired = capacity * 100; // 100 sq.ft per kW
    const annualEnergy = capacity * 1600; // 1600 units per kW per year for commercial (slightly higher than residential)
    const tariff = 9; // ₹9 per unit for commercial
    const annualSavings = annualEnergy * tariff;
    
    return {
        spaceRequired,
        annualEnergy,
        annualSavings
    };
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initCommercialSolarEstimator);

export { initCommercialSolarEstimator };
