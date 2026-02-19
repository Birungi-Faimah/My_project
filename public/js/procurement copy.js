function handleFormSubmit(event) {
    event.preventDefault();
  
    const form = document.getElementById('procurementForm');
    const fields = [
      'produceName', 'produceType', 'date', 'time',
      'tonnage', 'cost', 'dealerName', 'contact', 'salePrice'
    ];
  
    let isValid = true;
  
    const phonePattern = /^[0-9]{9,15}$/;
  
    fields.forEach(field => {
      const input = document.getElementById(field);
      const error = document.getElementById(`${field}Error`);
      error.textContent = '';
  
      if (input.value.trim() === '') {
        error.textContent = 'This field is required.';
        isValid = false;
      } else if (field === 'dealerContact' && !phonePattern.test(input.value.trim())) {
        error.textContent = 'Enter a valid phone number (9–15 digits).';
        isValid = false;
      } else if (
        ['tonnage', 'cost', 'sellingPrice'].includes(field) &&
        (isNaN(input.value) || Number(input.value) <= 0)
      ) {
        error.textContent = 'Enter a valid positive number.';
        isValid = false;
      }
    });
  
    const successMsg = document.getElementById('submissionMessage');
    const errorMsg = document.getElementById('errorMessage');
  
    if (isValid) {
      successMsg.style.display = 'block';
      errorMsg.style.display = 'none';
      form.submit(); // Proceed with form submission
    } else {
      errorMsg.style.display = 'block';
      errorMsg.textContent = 'Please correct the errors above.';
      successMsg.style.display = 'none';
    }
  }
  