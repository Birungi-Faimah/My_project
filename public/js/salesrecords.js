document.addEventListener('DOMContentLoaded', function() {
    const salesForm = document.getElementById('salesForm');
    const produceNameInput = document.getElementById('produceName');
    const tonnageSoldInput = document.getElementById('tonnageSold');
    const amountPaidInput = document.getElementById('amountPaid');
    const buyerNameInput = document.getElementById('buyerName');
    const salesAgentNameInput = document.getElementById('salesAgentName');
    const saleDateInput = document.getElementById('saleDate');
    const saleTimeInput = document.getElementById('saleTime');
    const submissionMessageDiv = document.getElementById('submissionMessage');
    const errorMessageDiv = document.getElementById('errorMessage');
    const salesRecordsDiv = document.getElementById('salesRecords');

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.textContent = '');
        errorMessageDiv.style.display = 'none';
        submissionMessageDiv.style.display = 'none';
    }

    function displayError(fieldId, message) {
        const errorDiv = document.getElementById(fieldId + 'Error');
        if (errorDiv) {
            errorDiv.textContent = message;
        }
        errorMessageDiv.textContent = 'Please correct the errors in the form.';
        errorMessageDiv.style.display = 'block';
    }

    salesForm.addEventListener('submit', function(event) {
        event.preventDefault();
        clearErrors();
        let isValid = true;

        if (produceNameInput.value.trim() === '') {
            displayError('produceName', 'Produce name is required.');
            isValid = false;
        } else if (produceNameInput.value.trim().length < 2) {
            displayError('produceName', 'Produce name must be at least 2 characters.');
            isValid = false;
        }

        if (tonnageSoldInput.value === '' || isNaN(tonnageSoldInput.value) || parseFloat(tonnageSoldInput.value) <= 0) {
            displayError('tonnageSold', 'Tonnage sold must be a number greater than 0.');
            isValid = false;
        }

        if (amountPaidInput.value === '' || isNaN(amountPaidInput.value) || amountPaidInput.value.trim().length < 5) {
            displayError('amountPaid', 'Amount paid is required and must be a number with at least 5 digits.');
            isValid = false;
        }

        if (buyerNameInput.value.trim() === '') {
            displayError('buyerName', 'Buyer\'s name is required.');
            isValid = false;
        } else if (buyerNameInput.value.trim().length < 2) {
            displayError('buyerName', 'Buyer\'s name must be at least 2 characters.');
            isValid = false;
        }

        if (salesAgentNameInput.value.trim() === '') {
            displayError('salesAgentName', 'Sales agent\'s name is required.');
            isValid = false;
        } else if (salesAgentNameInput.value.trim().length < 2) {
            displayError('salesAgentName', 'Sales agent\'s name must be at least 2 characters.');
            isValid = false;
        }

        if (saleDateInput.value === '') {
            displayError('saleDate', 'Date of sale is required.');
            isValid = false;
        }

        if (saleTimeInput.value === '') {
            displayError('saleTime', 'Time of sale is required.');
            isValid = false;
        }

        if (isValid) {
            // Simulate successful submission and data display
            const newSale = {
                produceName: produceNameInput.value,
                tonnageSold: tonnageSoldInput.value + ' kg',
                amountPaid: 'UgX ' + parseFloat(amountPaidInput.value).toLocaleString(),
                buyerName: buyerNameInput.value,
                salesAgentName: salesAgentNameInput.value,
                saleDate: saleDateInput.value,
                saleTime: saleTimeInput.value
            };

            displaySaleRecord(newSale);
            submissionMessageDiv.textContent = 'Sale recorded successfully!';
            submissionMessageDiv.style.display = 'block';
            salesForm.reset();
        }
    });

    function displaySaleRecord(data) {
        const recordDiv = document.createElement('div');
        recordDiv.innerHTML = `
            <h4>New Sale:</h4>
            <ul>
                <li><strong>Produce:</strong> ${data.produceName}</li>
                <li><strong>Tonnage:</strong> ${data.tonnageSold}</li>
                <li><strong>Amount Paid:</strong> ${data.amountPaid}</li>
                <li><strong>Buyer:</strong> ${data.buyerName}</li>
                <li><strong>Sales Agent:</strong> ${data.salesAgentName}</li>
                <li><strong>Date:</strong> ${data.saleDate}</li>
                <li><strong>Time:</strong> ${data.saleTime}</li>
            </ul>
            <hr>
        `;
        salesRecordsDiv.prepend(recordDiv); // Add new records to the top
    }

    // In a real application, you would also fetch existing sales records here
    // and populate the 'salesRecordsDiv' on page load.
});