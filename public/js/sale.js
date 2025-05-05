document.addEventListener('DOMContentLoaded', () => {
    const salesForm = document.getElementById('sales-form');
    const salesTableBody = document.getElementById('sales-data');
    const noSalesMessage = document.getElementById('no-sales');
    const formMessageDiv = document.getElementById('form-message');

    // Sample sales data
    let salesRecords = [
        { produce: 'Maize', tonnage: 1200, amount_paid: 2500000, buyer_name: 'Arishaba Peruth', sales_agent: 'Maganjjo', date: '2025-04-18', time: '08:45' },
        { produce: 'Beans', tonnage: 350, amount_paid: 1100000, buyer_name: 'Kemigisha Esther', sales_agent: 'Maganjjo', date: '2025-04-18', time: '13:20' },
        { produce: 'Groundnuts', tonnage: 80, amount_paid: 600000, buyer_name: 'Muyuku Musa', sales_agent: 'Maganjjo', date: '2025-04-19', time: '10:10' },
        { produce: 'Cow Peas', tonnage: 200, amount_paid: 750000, buyer_name: 'ADIL ADAM', sales_agent: 'Maganjjo', date: '2025-04-19', time: '10:55' },
        { produce: 'Soy Beans', tonnage: 500, amount_paid: 1300000, buyer_name: 'Bahati ', sales_agent: 'Maganjjo', date: '2025-04-19', time: '11:00' }
    ];

    function displaySales() {
        salesTableBody.innerHTML = ''; // Clear existing table rows
        if (salesRecords.length === 0) {
            noSalesMessage.classList.remove('hidden');
        } else {
            noSalesMessage.classList.add('hidden');
            salesRecords.forEach(sale => {
                const row = salesTableBody.insertRow();
                row.insertCell().textContent = sale.produce;
                row.insertCell().textContent = sale.tonnage;
                row.insertCell().textContent = sale.amount_paid.toLocaleString('en-UG'); // Format as currency
                row.insertCell().textContent = sale.buyer_name;
                row.insertCell().textContent = sale.sales_agent;
                row.insertCell().textContent = sale.date;
                row.insertCell().textContent = sale.time;
            });
        }
    }

    salesForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const produce = document.getElementById('produce').value;
        const tonnage = parseFloat(document.getElementById('tonnage').value);
        const amount_paid = parseFloat(document.getElementById('amount_paid').value);
        const buyer_name = document.getElementById('buyer_name').value;
        const sales_agent = document.getElementById('sales_agent').value;
        const sale_date = document.getElementById('sale_date').value;
        const sale_time = document.getElementById('sale_time').value;

        // Basic validation
        if (!produce || isNaN(tonnage) || isNaN(amount_paid) || amount_paid < 10000 || buyer_name.length < 2 || sales_agent.length < 2 || !sale_date || !sale_time) {
            displayFormMessage('Please fill in all fields correctly (amount paid should be at least 10,000 UGX).', 'error');
            return;
        }

        const newSale = {
            produce,
            tonnage,
            amount_paid,
            buyer_name,
            sales_agent,
            date: sale_date,
            time: sale_time
        };

        salesRecords.push(newSale);
        displaySales();
        salesForm.reset();
        displayFormMessage('Sale recorded successfully!', 'success');
        setTimeout(() => {
            formMessageDiv.classList.add('hidden');
        }, 3000); // Hide success message after 3 seconds
    });

    function displayFormMessage(message, type) {
        formMessageDiv.textContent = message;
        formMessageDiv.className = type; // Set class for styling (success or error)
        formMessageDiv.classList.remove('hidden');
    }

    // Initial display of sales data
    displaySales();
});