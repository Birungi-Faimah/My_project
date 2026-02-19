// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('sales-form');
  
//     form.addEventListener('submit', function (e) {
//       const produce = document.getElementById('produce');
//       const tonnage = document.getElementById('tonnage');
//       const amountPaid = document.getElementById('amount_paid');
//       const buyerName = document.getElementById('buyer_name');
//       const saleDate = document.getElementById('sale_date');
//       const saleTime = document.getElementById('sale_time');
  
//       let valid = true;
//       const errors = [];
  
//       // Clear previous custom validity
//       [produce, tonnage, amountPaid, buyerName, saleDate, saleTime].forEach(field => {
//         field.setCustomValidity('');
//       });
  
//       if (produce.value === '') {
//         produce.setCustomValidity('Please select a produce.');
//         errors.push('Produce is required.');
//         valid = false;
//       }
  
//       if (tonnage.value.trim() === '' || Number(tonnage.value) <= 0) {
//         tonnage.setCustomValidity('Tonnage must be a positive number.');
//         errors.push('Invalid tonnage.');
//         valid = false;
//       }
  
//       if (amountPaid.value.trim() === '' || Number(amountPaid.value) < 10000) {
//         amountPaid.setCustomValidity('Amount paid must be at least 10,000 UGX.');
//         errors.push('Amount too low.');
//         valid = false;
//       }
  
//       if (buyerName.value.trim().length < 2) {
//         buyerName.setCustomValidity('Buyer name must be at least 2 characters.');
//         errors.push('Buyer name too short.');
//         valid = false;
//       }
  
//       if (!saleDate.value) {
//         saleDate.setCustomValidity('Please select a sale date.');
//         errors.push('Sale date is required.');
//         valid = false;
//       }
  
//       if (!saleTime.value) {
//         saleTime.setCustomValidity('Please select a sale time.');
//         errors.push('Sale time is required.');
//         valid = false;
//       }
  
//       if (!valid) {
//         e.preventDefault();
//         // Trigger built-in browser validation UI
//         form.reportValidity();
//         console.warn("Form submission blocked due to validation errors:", errors);
//       }
//     });
//   });


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("sales-form");
    const fields = ["produceName", "tonnageSold", "amountPaid", "buyerName", "saleDate", "saleTime"];
    
    form.addEventListener("submit", (event) => {
        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field);
            const errorMessage = document.getElementById(`${field}-error`);

            if (!input.value.trim()) {
                errorMessage.textContent = `This field is required`;
                errorMessage.style.color = "red";
                isValid = false;
            } else {
                errorMessage.textContent = "";
            }
        });

        if (!isValid) {
            event.preventDefault();
        }
    });
});