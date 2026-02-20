// /Public/js/signup.js
// Client-side form validation for signup form

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
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
  
      // First name validation
      if (!firstNameInput.value.trim()) {
        firstNameError.textContent = 'First name is required.';
        isValid = false;
      } else if (firstNameInput.value.trim().length < 2) {
        firstNameError.textContent = 'First name must be at least 2 characters.';
        isValid = false;
      }
  
      // Last name validation
      if (!lastNameInput.value.trim()) {
        lastNameError.textContent = 'Last name is required.';
        isValid = false;
      } else if (lastNameInput.value.trim().length < 2) {
        lastNameError.textContent = 'Last name must be at least 2 characters.';
        isValid = false;
      }
  
      // Email validation
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required.';
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Invalid email format.';
        isValid = false;
      }
  
      // Password validation
      if (!passwordInput.value) {
        passwordError.textContent = 'Password is required.';
        isValid = false;
      } else if (passwordInput.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        isValid = false;
      }
  
      // Confirm password validation
      if (!confirmPasswordInput.value) {
        confirmPasswordError.textContent = 'Please confirm your password.';
        isValid = false;
      } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        isValid = false;
      }
  
      // Role validation
      if (!roleSelect.value) {
        roleError.textContent = 'Please select a role.';
        isValid = false;
      }
  
      // Branch validation (required for manager and salesagent)
      const selectedRole = roleSelect.value;
      if ((selectedRole === 'manager' || selectedRole === 'salesagent') && !branchSelect.value) {
        branchError.textContent = 'Branch is required for managers and sales agents.';
        isValid = false;
      }
  
      if (!isValid) {
        event.preventDefault(); // Prevent form submission if there are errors
      }
    });
  
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });
