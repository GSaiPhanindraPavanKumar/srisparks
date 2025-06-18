/**
 * Solar Estimator Widget
 * Simplified version with automatic calculation based on capacity selection
 */

function initSolarEstimator() {
    const capacitySelector = document.getElementById('capacity-selector');
    
    // Check if the selector exists
    if (!capacitySelector) {
        console.error('Solar estimator: Capacity selector not found');
        return;
    }
    
    // Initial calculation on page load
    const initialCapacity = parseFloat(capacitySelector.value);
    updateResults(initialCapacity);
    
    // Add change event listener to the capacity selector
    capacitySelector.addEventListener('change', function() {
        const capacity = parseFloat(this.value);
        updateResults(capacity);
        
        // Show commercial recommendation for larger systems
        updateCommercialRecommendation(capacity);
    });
    
    // Initial check for commercial recommendation
    updateCommercialRecommendation(parseFloat(capacitySelector.value));
}

function updateResults(capacity) {
    // Calculate results based on capacity
    const results = calculateSolarResults(capacity);
    
    // Update results in the DOM
    document.getElementById('result-capacity').textContent = capacity.toFixed(1) + ' kW';
    document.getElementById('result-space').textContent = results.spaceRequired.toLocaleString() + ' sq.ft';
    document.getElementById('result-energy').textContent = results.annualEnergy.toLocaleString() + ' units';
    document.getElementById('result-savings').textContent = '₹' + results.annualSavings.toLocaleString();
    document.getElementById('result-cost').textContent = '₹' + results.estimatedCost.toLocaleString();
    document.getElementById('result-subsidy').textContent = '₹' + results.subsidy.toLocaleString();
}

function calculateSolarResults(capacity) {
    // Calculate results based on capacity
    const spaceRequired = capacity * 100; // 100 sq.ft per kW
    const annualEnergy = capacity * 1400; // 1400 units per kW per year
    const tariff = 7; // ₹7 per unit
    const annualSavings = annualEnergy * tariff;
    
    // Updated cost calculation based on capacity
    let estimatedCost = 0;
    if (capacity === 2) {
        estimatedCost = 150000; // Fixed price for 2kW systems
    } else if (capacity >= 3) {
        estimatedCost = capacity * 70000; // ₹70,000 per kW for 3kW and above
    } else {
        estimatedCost = capacity * 75000; // Fallback for 1kW (though not in dropdown)
    }
    
    // Calculate subsidy based on capacity
    let subsidy = 0;
    if (capacity === 1) {
        subsidy = 30000;
    } else if (capacity === 2) {
        subsidy = 60000;
    } else if (capacity >= 3) {
        subsidy = 78000;
    }
    
    return {
        spaceRequired,
        annualEnergy,
        annualSavings,
        estimatedCost,
        subsidy
    };
}

function updateCommercialRecommendation(capacity) {
    const commercialRecommendation = document.getElementById('commercial-recommendation');
    
    if (commercialRecommendation) {
        if (capacity > 5) {
            commercialRecommendation.classList.remove('hidden');
        } else {
            commercialRecommendation.classList.add('hidden');
        }
    }
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initSolarEstimator);

export { initSolarEstimator };
