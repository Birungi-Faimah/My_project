// This script assumes you have an endpoint like /api/sales that returns all sales as JSON
// You may need to adjust the fetch URL to match your backend

document.addEventListener('DOMContentLoaded', async () => {
  const totalSalesElem = document.getElementById('totalSales');
  const numSalesElem = document.getElementById('numSales');
  const recentSalesTable = document.getElementById('recentSalesTable');

  try {
    // Fetch sales data from the backend
    const response = await fetch('/api/sales');
    const sales = await response.json();

    // Calculate total sales and number of sales
    let totalSales = 0;
    sales.forEach(sale => {
      totalSales += sale.amountPaid || 0;
    });
    totalSalesElem.textContent = totalSales.toLocaleString('en-UG') + ' UGX';
    numSalesElem.textContent = sales.length;

    // Show up to 10 most recent sales
    const recent = sales.slice(0, 10);
    recent.forEach(sale => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${sale.produceName || ''}</td>
        <td>${sale.amountPaid ? sale.amountPaid.toLocaleString('en-UG') : ''}</td>
        <td>${sale.buyerName || ''}</td>
        <td>${sale.slaesAgentName || ''}</td>
        <td>${sale.saleDate ? new Date(sale.saleDate).toLocaleDateString() : ''}</td>
        <td>${sale.saleTime || ''}</td>
      `;
      recentSalesTable.appendChild(row);
    });
  } catch (err) {
    totalSalesElem.textContent = 'Error';
    numSalesElem.textContent = 'Error';
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="6">Could not load sales data.</td>';
    recentSalesTable.appendChild(row);
  }
}); 