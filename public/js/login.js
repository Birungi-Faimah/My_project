document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let hasErrors = false;

        // Clear previous errors
        emailError.textContent = '';
        passwordError.textContent = '';

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Email validation
        if (!email) {
            emailError.textContent = 'Email is required.';
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            emailError.textContent = 'Enter a valid email address.';
            hasErrors = true;
        }

        // Password validation
        if (!password) {
            passwordError.textContent = 'Password is required.';
            hasErrors = true;
        }

        // If no validation errors, submit the form
        if (!hasErrors) {
            loginForm.submit();
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
