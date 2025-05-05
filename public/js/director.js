document.addEventListener('DOMContentLoaded', function() {
  const dashboardLink = document.getElementById('dashboard-link');
  const salesTableLink = document.getElementById('sales-table-link');
  const salesTableSection = document.getElementById('sales-table-section');
  const salesTableBody = document.getElementById('sales-table-body');

  // Simulate fetching sales data (replace with your actual API calls)
  function fetchSalesData() {
      // For demonstration, using more comprehensive static data
      const currentMonth = "May 2025";
      const lastYearSameMonth = "May 2024";
      const maganjoSalesCurrentMonth = Math.floor(Math.random() * 5000);
      const matugaSalesCurrentMonth = Math.floor(Math.random() * 6000);
      const maganjoSalesLastYear = Math.floor(Math.random() * 4500);
      const matugaSalesLastYear = Math.floor(Math.random() * 5500);

      const totalCurrentMonth = maganjoSalesCurrentMonth + matugaSalesCurrentMonth;
      const totalLastYear = maganjoSalesLastYear + matugaSalesLastYear;
      const yearToYearChange = ((totalCurrentMonth - totalLastYear) / totalLastYear) * 100;

      const branchSales = [
          { branch: 'Maganjo', sales: maganjoSalesCurrentMonth, period: currentMonth },
          { branch: 'Matuga', sales: matugaSalesCurrentMonth, period: currentMonth }
      ];

      const overallTotal = totalCurrentMonth;

      const highestBranch = branchSales.reduce((prev, current) => (prev.sales > current.sales) ? prev : current);
      const lowestBranch = branchSales.reduce((prev, current) => (prev.sales < current.sales) ? prev : current);

      updateDashboard(totalCurrentMonth, yearToYearChange, overallTotal, highestBranch, lowestBranch);
      populateSalesTable(branchSales);
  }

  function updateDashboard(currentMonthSales, yearToYearChange, overallTotal, highestBranch, lowestBranch) {
      document.getElementById('this-month-sales').textContent = `UGX ${currentMonthSales.toLocaleString()}`;
      document.getElementById('year-to-year-change').textContent = `${yearToYearChange.toFixed(2)}%`;
      document.getElementById('overall-total').textContent = `UGX ${overallTotal.toLocaleString()}`;
      document.getElementById('highest-branch').textContent = `${highestBranch.branch}: UGX ${highestBranch.sales.toLocaleString()}`;
      document.getElementById('lowest-branch').textContent = `${lowestBranch.branch}: UGX ${lowestBranch.sales.toLocaleString()}`;
  }

  function populateSalesTable(salesData) {
      salesTableBody.innerHTML = ''; // Clear existing rows
      salesData.forEach(sale => {
          const row = salesTableBody.insertRow();
          const branchCell = row.insertCell();
          const salesCell = row.insertCell();
          const periodCell = row.insertCell();
          branchCell.textContent = sale.branch;
          salesCell.textContent = `UGX ${sale.sales.toLocaleString()}`;
          periodCell.textContent = sale.period;
      });
  }

  // Navigation between Dashboard and Sales Table
  dashboardLink.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.sales-summary').style.display = 'grid';
      salesTableSection.style.display = 'none';
  });

  salesTableLink.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.sales-summary').style.display = 'none';
      salesTableSection.style.display = 'block';
  });

  // Logout functionality
  document.getElementById('logout-link').addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '/land'; // Adjust path as needed
  });

  // Initially load the sales data
  fetchSalesData();
  app.get('/director', (req, res) => {
    const salesData = [
      { branchName: 'Maganjo', sales: 300, period: 'May 2025' },
      { branchName: 'Matuga', sales: 250, period: 'May 2025' },
      // ... more data
    ];
    res.render('director', { salesData: salesData }); // 'salesData' is the key here
  });
});