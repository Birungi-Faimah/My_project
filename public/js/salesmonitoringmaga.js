document.addEventListener('DOMContentLoaded', function() {
    // --- Update Last Updated Timestamp ---
    function updateLastUpdated() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;
        document.getElementById('last-updated').textContent = formattedDateTime;
    }

    updateLastUpdated();
    // Optionally update the timestamp periodically (e.g., every minute)
    // setInterval(updateLastUpdated, 60000);

    // --- Dummy Sales Data (Replace with your actual data fetching logic) ---
    const salesData = {
        totalSales: 1567890,
        todaySales: 234560,
        averageOrderValue: 34500,
        recentOrders: [
            { id: 'ORD-20250422-003', customer: 'Kato Musa', total: 67000, date: '2025-04-22', status: 'Processing' },
            { id: 'ORD-20250422-004', customer: 'Namaganda Joan', total: 92300, date: '2025-04-22', status: 'Delivered' },
            { id: 'ORD-20250421-006', customer: 'Ssekitoleko Ali', total: 38750, date: '2025-04-21', status: 'Delivered' },
            { id: 'ORD-20250421-007', customer: 'Nansubuga Ruth', total: 15000, date: '2025-04-21', status: 'Pending' },
            { id: 'ORD-20250420-012', customer: 'Lubega David', total: 112800, date: '2025-04-20', status: 'Delivered' },
            { id: 'ORD-20250420-013', customer: 'Atim Sharon', total: 49500, date: '2025-04-20', status: 'Shipped' },
        ],
    };

    // --- Function to Format Currency (Ugandan Shillings) ---
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-UG', {
            style: 'currency',
            currency: 'UGX',
            minimumFractionDigits: 0,
        }).format(amount);
    }

    // --- Update Metric Cards ---
    function updateMetrics() {
        document.getElementById('total-sales').textContent = formatCurrency(salesData.totalSales);
        document.getElementById('today-sales').textContent = formatCurrency(salesData.todaySales);
        document.getElementById('average-order-value').textContent = formatCurrency(salesData.averageOrderValue);
    }

    // --- Populate Recent Orders Table ---
    function populateOrdersTable() {
        const ordersBody = document.getElementById('orders-body');
        ordersBody.innerHTML = ''; // Clear existing rows

        salesData.recentOrders.forEach(order => {
            const row = ordersBody.insertRow();

            const idCell = row.insertCell();
            idCell.textContent = order.id;

            const customerCell = row.insertCell();
            customerCell.textContent = order.customer;

            const totalCell = row.insertCell();
            totalCell.textContent = formatCurrency(order.total);

            const dateCell = row.insertCell();
            dateCell.textContent = order.date;

            const statusCell = row.insertCell();
            statusCell.textContent = order.status;
        });
    }

    // --- Initialize Dashboard Data ---
    updateMetrics();
    populateOrdersTable();

    // --- In a real application, you would typically fetch data from an API like this: ---
    /*
    fetch('/api/sales-data') // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
            salesData.totalSales = data.totalSales;
            salesData.todaySales = data.todaySales;
            salesData.averageOrderValue = data.averageOrderValue;
            salesData.recentOrders = data.recentOrders;
            updateMetrics();
            populateOrdersTable();
        })
        .catch(error => {
            console.error('Error fetching sales data:', error);
            // Optionally display an error message on the page
        });
    */
});