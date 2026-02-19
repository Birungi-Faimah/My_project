// /Public/js/signup.js
// This is a separate JavaScript file.
// You can add your client-side form validation and other logic here.

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const roleSelect = document.getElementById('role');
    const branchSelect = document.getElementById('branch');
  
    const firstNameError = document.getElementById('first-name-error');
    const lastNameError = document.getElementById('last-name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const roleError = document.getElementById('role-error');
    const branchError = document.getElementById('branch-error');
  
    signupForm.addEventListener('submit', function(event) {
      let isValid = true;
  
      // Reset error messages
      firstNameError.textContent = '';
      lastNameError.textContent = '';
      emailError.textContent = '';
      passwordError.textContent = '';
      confirmPasswordError.textContent = '';
      roleError.textContent = '';
      branchError.textContent = '';
  
      if (!firstNameInput.value.trim()) {
        firstNameError.textContent = 'First name is required.';
        isValid = false;
      }
  
      if (!lastNameInput.value.trim()) {
        lastNameError.textContent = 'Last name is required.';
        isValid = false;
      }
  
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required.';
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Invalid email format.';
        isValid = false;
      }
  
      if (!passwordInput.value) {
        passwordError.textContent = 'Password is required.';
        isValid = false;
      } else if (passwordInput.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        isValid = false;
      }
  
      if (!confirmPasswordInput.value) {
        confirmPasswordError.textContent = 'Confirm password is required.';
        isValid = false;
      } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        isValid = false;
      }
  
      if (!roleSelect.value) {
        roleError.textContent = 'Please select a role.';
        isValid = false;
      }
  
      if (!branchSelect.value) {
        branchError.textContent = 'Please select a branch.';
        isValid = false;
      }
  
      if (!isValid) {
        event.preventDefault(); // Prevent form submission if there are errors
      }
    });
  
    function isValidEmail(email) {
      // Basic email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });