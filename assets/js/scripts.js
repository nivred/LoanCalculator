document.querySelector('#loan-form').addEventListener('submit', function(e) {
    // Hide results
    document.querySelector('#results').style.display = 'none';
    // Show loader
    document.querySelector('#loading').style.display = 'block';
    // Display results after 2 seconds
    setTimeout(calculateResults, 2000);

    e.preventDefault(e);
});

// CalculateResults
function calculateResults(e) {
    // UI Variables
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    // Calculation variables
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;
    
    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x -1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        
        // Show results
        document.querySelector('#results').style.display = 'block';
        // Hide loader
        document.querySelector('#loading').style.display = "none";
    } else {
        showError('Error. Please check inputted values');
    }
}

// Show Error
function showError(error) {
    // Show results
    document.querySelector('#results').style.display = 'none';
    // Hide loader
    document.querySelector('#loading').style.display = "none";
    // Create a div
    const errorDiv = document.createElement('div');
    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // Add class
    errorDiv.className= 'alert alert-danger mb-3';
    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    // Insert error above heading
    card.insertBefore(errorDiv, heading);
    // Clear error after 4 seconds
    setTimeout(clearError, 4000);
}

// Clear error
function clearError() {
    document.querySelector('.alert').remove();
}