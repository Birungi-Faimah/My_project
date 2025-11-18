// Get modal elements
const signupModal = document.getElementById('signupModal');
const loginModal = document.getElementById('loginModal');

// Get buttons that open the modals
const openSignupBtn = document.getElementById('openSignup');
const openLoginBtn = document.getElementById('openLogin');

// Get close buttons
const closeButtons = document.querySelectorAll('.close-button');

// Open signup modal
openSignupBtn.addEventListener('click', () => {
    signupModal.style.display = 'block';
});

// Open login modal
openLoginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

// Close modals when clicking close button
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        signupModal.style.display = 'none';
        loginModal.style.display = 'none';
    });
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === signupModal) {
        signupModal.style.display = 'none';
    }
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
});