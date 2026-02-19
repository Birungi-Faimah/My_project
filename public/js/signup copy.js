document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
  
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const role = document.getElementById('role');
    const branch = document.getElementById('branch');
  
    const showError = (input, message) => {
      const errorElement = document.getElementById(`${input.id}-error`);
      errorElement.textContent = message;
      input.classList.add('invalid');
    };
  
    const clearError = (input) => {
      const errorElement = document.getElementById(`${input.id}-error`);
      errorElement.textContent = '';
      input.classList.remove('invalid');
    };
  
    form.addEventListener('submit', (e) => {
      let valid = true;
  
      // First Name
      if (firstName.value.trim().length < 2) {
        showError(firstName, 'First name must be at least 2 characters.');
        valid = false;
      } else {
        clearError(firstName);
      }
  
      // Last Name
      if (lastName.value.trim().length < 2) {
        showError(lastName, 'Last name must be at least 2 characters.');
        valid = false;
      } else {
        clearError(lastName);
      }
  
      // Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        showError(email, 'Enter a valid email address.');
        valid = false;
      } else {
        clearError(email);
      }
  
      // Password
      if (password.value.length < 6) {
        showError(password, 'Password must be at least 6 characters.');
        valid = false;
      } else {
        clearError(password);
      }
  
      // Confirm Password
      if (confirmPassword.value !== password.value || confirmPassword.value === '') {
        showError(confirmPassword, 'Passwords do not match.');
        valid = false;
      } else {
        clearError(confirmPassword);
      }
  
      // Role
      if (role.value === '') {
        showError(role, 'Please select a role.');
        valid = false;
      } else {
        clearError(role);
      }
  
      // Branch
      if (branch.value === '') {
        showError(branch, 'Please select a branch.');
        valid = false;
      } else {
        clearError(branch);
      }
  
      if (!valid) {
        e.preventDefault();
      }
    });
  });
  