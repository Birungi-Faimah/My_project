document.addEventListener('DOMContentLoaded', function() {
  const creditForm = document.getElementById('creditForm');
  const submitBtn = document.getElementById('submitBtn');
  const buyerNameInput = document.getElementById('NameofBuyer');
  const ninInput = document.getElementById('NIN');
  const locationInput = document.getElementById('location');
  const contactInput = document.getElementById('contant');
  const amountDueInput = document.getElementById('AmountDue');
  const agentNameInput = document.getElementById('agentName');
  const dueDateInput = document.getElementById('DueDate');
  const produceNameInput = document.getElementById('produceName');
  const typeOfProduceInput = document.getElementById('TypeofProduce');
  const tonnageInput = document.getElementById('Tonnage');
  const costInput = document.getElementById('cost');
  const dispatchDateInput = document.getElementById('DateofDispatch');

  const buyerNameError = document.getElementById('NameofBuyerError');
  const ninError = document.getElementById('NINError');
  const locationError = document.getElementById('locationError');
  const contactError = document.getElementById('contantError');
  const amountDueError = document.getElementById('AmountDueError');
  const agentNameError = document.getElementById('agentNameError');
  const dueDateError = document.getElementById('DueDateError');
  const produceNameError = document.getElementById('produceNameError');
  const typeOfProduceError = document.getElementById('TypeofProduceError');
  const tonnageError = document.getElementById('TonnageError');
  const costError = document.getElementById('costError');
  const dispatchDateError = document.getElementById('DateofDispatchError');

  submitBtn.addEventListener('click', function(event) {
      let isValid = true;

      // Reset error messages
      resetErrors();

      // Validate Buyer Name
      if (!buyerNameInput.value.trim()) {
          displayError(buyerNameError, 'Buyer Name is required.');
          isValid = false;
      }

      // Validate National ID (basic non-empty check)
      if (!ninInput.value.trim()) {
          displayError(ninError, 'National ID is required.');
          isValid = false;
      }

      // Validate Location
      if (!locationInput.value.trim()) {
          displayError(locationError, 'Location is required.');
          isValid = false;
      }

      // Validate Phone (basic non-empty check)
      if (!contactInput.value.trim()) {
          displayError(contactError, 'Phone number is required.');
          isValid = false;
      }

      // Validate Amount Due
      if (!amountDueInput.value.trim() || isNaN(amountDueInput.value) || parseFloat(amountDueInput.value) <= 0) {
          displayError(amountDueError, 'Amount Due must be a positive number.');
          isValid = false;
      }

      // Validate Agent Name
      if (!agentNameInput.value.trim()) {
          displayError(agentNameError, 'Agent Name is required.');
          isValid = false;
      }

      // Validate Due Date
      if (!dueDateInput.value.trim()) {
          displayError(dueDateError, 'Due Date is required.');
          isValid = false;
      }

      // Validate Produce Name
      if (!produceNameInput.value.trim()) {
          displayError(produceNameError, 'Produce Name is required.');
          isValid = false;
      }

      // Validate Type of Produce
      if (!typeOfProduceInput.value.trim()) {
          displayError(typeOfProduceError, 'Type of Produce is required.');
          isValid = false;
      }

      // Validate Tonnage
      if (!tonnageInput.value.trim() || isNaN(tonnageInput.value) || parseFloat(tonnageInput.value) <= 0) {
          displayError(tonnageError, 'Tonnage must be a positive number.');
          isValid = false;
      }

      // Validate Cost
      if (!costInput.value.trim() || isNaN(costInput.value) || parseFloat(costInput.value) <= 0) {
          displayError(costError, 'Price must be a positive number.');
          isValid = false;
      }

      // Validate Dispatch Date
      if (!dispatchDateInput.value.trim()) {
          displayError(dispatchDateError, 'Dispatch Date is required.');
          isValid = false;
      }

      if (!isValid) {
          event.preventDefault(); // Prevent form submission if there are errors
      }
  });

  function displayError(element, message) {
      element.textContent = message;
  }

  function resetErrors() {
      const errorSpans = document.querySelectorAll('.error-message');
      errorSpans.forEach(span => {
          span.textContent = '';
      });
  }
});