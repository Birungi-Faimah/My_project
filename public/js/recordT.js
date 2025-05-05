document.addEventListener('DOMContentLoaded', function() {
    // Confirm before deleting a record
    const deleteForms = document.querySelectorAll('form[action^="/deleteProduce"]');
    
    deleteForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const produceName = this.closest('tr').querySelector('td:first-child').textContent;
            
            if (confirm(`Are you sure you want to delete "${produceName}"?`)) {
                this.submit();
            }
        });
    });

    // Format currency values
    const costCells = document.querySelectorAll('td:nth-child(6)');
    const priceCells = document.querySelectorAll('td:nth-child(7)');
    
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-UG', {
            style: 'currency',
            currency: 'UGX'
        }).format(value).replace('UGX', '').trim();
    }
    
    costCells.forEach(cell => {
        const value = parseFloat(cell.textContent);
        if (!isNaN(value)) {
            cell.textContent = formatCurrency(value);
        }
    });
    
    priceCells.forEach(cell => {
        const value = parseFloat(cell.textContent);
        if (!isNaN(value)) {
            cell.textContent = formatCurrency(value);
        }
    });

    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transition = 'background-color 0.2s ease';
        });
    });
});