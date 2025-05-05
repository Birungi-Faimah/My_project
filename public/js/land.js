const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const signupModal = document.getElementById('signupModal');
const loginModal = document.getElementById('loginModal');
const signupCloseBtn = signupModal.querySelector('.close-button');
const loginCloseBtn = loginModal.querySelector('.close-button');

signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'block';
});

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

signupCloseBtn.addEventListener('click', () => {
    signupModal.style.display = 'none';
});

loginCloseBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == signupModal) {
        signupModal.style.display = 'none';
    }
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    }
});

// You would add your actual signup and login form submission logic here
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Handle signup form submission (e.g., send data to a server)
    console.log('Signup form submitted');
    signupModal.style.display = 'none'; // Close the modal after submission
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Handle login form submission (e.g., send data to a server)
    console.log('Login form submitted');
    loginModal.style.display = 'none'; // Close the modal after submission
});
// Example 1: Dynamically update the copyright year
const copyrightYear = document.querySelector('footer .footer-section:first-child p:last-child');
if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.textContent = `\u00A9 ${currentYear} Karibu Groceries Limited. All rights reserved.`;}
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            alert(`Thank you for subscribing with: ${emailInput.value}`);
            // In a real application, you would send this data to a server
            emailInput.value = ''; // Clear the input
        } else {
            alert('Please enter your email address.');
        }
    });
}