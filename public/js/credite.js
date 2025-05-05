document.addEventListener('DOMContentLoaded', function() {
    const creditForm = document.getElementById('creditForm');
    const messageDiv = document.getElementById('message');

    creditForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Basic validation (more robust validation can be added)
        const buyerName = document.getElementById('buyerName').value;
        const nationalId = document.getElementById('nationalId').value;
        const location = document.getElementById('location').value;
        const contacts = document.getElementById('contact').value;
        const amountDue = document.getElementById('amountDue').value;
        const salesAgent = document.getElementById('agentName').value;
        const dueDate = document.getElementById('dueDate').value;
        const produceName = document.getElementById('produceName').value;
        const paymentMethod = document.getElementById('paymentMethod').value 

        if (buyerName.length < 2 || location.length < 2 || salesAgent.length < 2 || produceName.length < 2 || amountDue.length < 5 || paymentMethod === "") {
            showMessage('Please fill in all required fields, including the payment method.', 'error');
            return;
        }

        // Simulate successful submission (replace with actual data submission)
        console.log({
            buyerName,
            nationalId,
            location,
            contacts,
            amountDue,
            salesAgent,
            dueDate,
            produceName,
            produceType: document.getElementById('produceType').value,
            tonnage: document.getElementById('tonnage').value,
            dispatchDate: document.getElementById('dispatchDate').value,
            paymentMethod
        });

        showMessage('Credit payment recorded successfully!', 'success');
        creditForm.reset(); // Clear the form after successful submission
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 3000); // Clear message after 3 seconds
    }
});