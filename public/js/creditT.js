document.addEventListener('DOMContentLoaded', function() {
    console.log('Credit payment table loaded');
    
    // Add confirmation for delete actions
    const deleteButtons = document.querySelectorAll('.btn-delete');
    
    deleteButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        if (!confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
          e.preventDefault();
        }
      });
    });
    
    // Add row highlighting on hover
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
      row.addEventListener('mouseenter', function() {
        this.style.transition = 'background-color 0.2s ease';
        this.style.backgroundColor = '#e8f4fc';
      });
      
      row.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
      });
    });
    
    // Format currency and dates (if not already formatted server-side)
    formatTableData();
    
    // Add search functionality
    addSearchFunctionality();
  });
  
  function formatTableData() {
    // Format currency
    const amountCells = document.querySelectorAll('td:nth-child(5)');
    amountCells.forEach(cell => {
      if (cell.textContent && !isNaN(cell.textContent)) {
        cell.textContent = new Intl.NumberFormat('en-UG', {
          style: 'currency',
          currency: 'UGX'
        }).format(cell.textContent);
      }
    });
    
    // Format dates
    const dateCells = document.querySelectorAll('td:nth-child(7), td:nth-child(12)');
    dateCells.forEach(cell => {
      if (cell.textContent) {
        const date = new Date(cell.textContent);
        if (!isNaN(date)) {
          cell.textContent = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
        }
      }
    });
  }
  
  function addSearchFunctionality() {
    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.margin = '1rem 0';
    searchContainer.style.textAlign = 'center';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search records...';
    searchInput.className = 'search-input';
    searchInput.style.padding = '8px 12px';
    searchInput.style.width = '60%';
    searchInput.style.borderRadius = '4px';
    searchInput.style.border = '1px solid #ddd';
    
    searchContainer.appendChild(searchInput);
    document.querySelector('.table-container').insertBefore(searchContainer, document.querySelector('.table-wrapper'));
    
    // Add search functionality
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll('tbody tr');
      
      rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
    
    // Add some basic styles for the search input
    const style = document.createElement('style');
    style.textContent = `
      .search-input:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
      }
    `;
    document.head.appendChild(style);
  }