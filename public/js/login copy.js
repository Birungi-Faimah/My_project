document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageBox = document.getElementById('loginMessage');
  
    const showMessage = (msg, isError = true) => {
      messageBox.textContent = msg;
      messageBox.style.color = isError ? 'red' : 'green';
      messageBox.style.display = 'block';
    };
  
    form.addEventListener('submit', (e) => {
      let valid = true;
      messageBox.style.display = 'none';
  
      if (emailInput.value.trim() === '') {
        showMessage('Email is required.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        showMessage('Enter a valid email address.');
        valid = false;
      }
  
      if (passwordInput.value.trim() === '') {
        showMessage('Password is required.');
        valid = false;
      }
  
      if (!valid) {
        e.preventDefault();
      }
    });
  });
      
      
     // Optional: Add event listeners to clear messages on input
     emailInput.addEventListener('input', () => {
        messageBox.style.display = 'none';
     });
      
     passwordInput.addEventListener('input', () => {
        messageBox.style.display = 'none';
     });
    