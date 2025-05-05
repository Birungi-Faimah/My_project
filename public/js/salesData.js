const salesData = [
    { branchName: 'Maganjo', sales:300, period: 'May 2025' },
    { branchName: 'Matuga', sales: 250, period: 'May 2025' },

  ];
  
  const salesTableBody = document.getElementById('sales-table-body');
  const salesTableSection = document.getElementById('sales-table-section');
  
  // Function to populate the table
  function populateSalesTable(data) {
    salesTableBody.innerHTML = ''; // Clear existing rows
  
    if (data && data.length > 0) {
      data.forEach(sale => {
        const row = salesTableBody.insertRow();
        const branchCell = row.insertCell();
        const salesCell = row.insertCell();
        const periodCell = row.insertCell();
  
        branchCell.textContent = sale.branchName;
        salesCell.textContent = sale.sales;
        periodCell.textContent = sale.period;
      });
      salesTableSection.style.display = 'block'; // Show the table section
    } else {
      salesTableBody.innerHTML = '<tr><td colspan="3">No sales data available.</td></tr>';
      salesTableSection.style.display = 'block'; // Still show the section with the message
    }
  }
  
  // Call the function to populate the table with your data
  populateSalesTable(salesData);
  
  // --- If you need to fetch data from an API ---
  // fetch('/api/sales') // Replace '/api/sales' with your actual API endpoint
  //   .then(response => response.json())
  //   .then(data => {
  //     populateSalesTable(data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching sales data:', error);
  //     salesTableBody.innerHTML = '<tr><td colspan="3">Error loading sales data.</td></tr>';
  //     salesTableSection.style.display = 'block';
  //   });