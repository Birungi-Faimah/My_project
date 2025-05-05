const salesForm = document.getElementById('salesForm');
const salesTableBody = document.getElementById('salesTableBody');
const branchName = "Maganjo"; 
let salesData = [];
let editingRow = null; // Track the row being edited

function addSale() {
    const produceName = document.getElementById('produceName').value.trim();
    const produceType = document.getElementById('produceType').value.trim();
    const saleDate = document.getElementById('saleDate').value;
    const saleTime = document.getElementById('saleTime').value;
    const tonnage = document.getElementById('tonnage').value.trim();
    const costUgx = document.getElementById('costUgx').value.trim();
    const dealerName = document.getElementById('dealerName').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const sellingPrice = document.getElementById('sellingPrice').value;

    // Basic validation (more robust validation can be added)
    if (!produceName || !/^[a-zA-Z0-9]+$/.test(produceName)) {
        alert("Please enter a valid produce name (alphanumeric).");
        return;
    }
    if (!produceType || !/^[a-zA-Z]{2,}$/.test(produceType)) {
        alert("Please enter a valid produce type (at least 2 alphabetic characters).");
        return;
    }
    if (!saleDate) {
        alert("Please select a sale date.");
        return;
    }
    if (!tonnage || !/^[0-9]{3,}$/.test(tonnage)) {
        alert("Please enter a valid tonnage (at least 3 digits).");
        return;
    }
    if (!costUgx || !/^[0-9]{5,}$/.test(costUgx)) {
        alert("Please enter a valid cost (at least 5 digits).");
        return;
    }
    if (!dealerName || !/^[a-zA-Z0-9]{2,}$/.test(dealerName)) {
        alert("Please enter a valid dealer name (at least 2 alphanumeric characters).");
        return;
    }
    if (contact && !/^[0-9]{9,}$/.test(contact)) {
         alert("Please enter a valid Ugandan phone number (at least 9 digits).");
        return;
    }
     if (!sellingPrice || isNaN(sellingPrice)) {
            alert("Please enter a valid selling price.");
            return;
        }

    const newSale = {
        produceName,
        produceType,
        saleDate,
        saleTime,
        tonnage,
        costUgx,
        dealerName,
        contact,
        sellingPrice,
        branch: Maganjo // Using the known branch name
    };

    salesData.push(newSale);
    renderSalesTable();
    salesForm.reset(); // Clear the form after submission
}

function renderSalesTable() {
    salesTableBody.innerHTML = ''; // Clear the table body

    salesData.forEach((sale, index) => {
        const row = salesTableBody.insertRow();
        row.setAttribute('data-index', index); // Store index for editing/deleting

        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        const cell3 = row.insertCell();
        const cell4 = row.insertCell();
        const cell5 = row.insertCell();
        const cell6 = row.insertCell();
        const cell7 = row.insertCell();
        const cell8 = row.insertCell();
         const cell9 = row.insertCell();
        const cell10 = row.insertCell();
        const cell11 = row.insertCell(); // Actions cell

        cell1.textContent = sale.produceName;
        cell2.textContent = sale.produceType;
        cell3.textContent = sale.saleDate;
        cell4.textContent = sale.saleTime;
        cell5.textContent = sale.tonnage;
        cell6.textContent = sale.costUgx;
        cell7.textContent = sale.dealerName;
        cell8.textContent = sale.contact;
        cell9.textContent = sale.sellingPrice;
        cell10.textContent = sale.branch;

        // Create action buttons
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('action-buttons');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.onclick = () => editSale(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => deleteSale(index);

        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);
        cell11.appendChild(actionsDiv);
    });
}

function editSale(index) {
    editingRow = index;
    const sale = salesData[index];
    // Populate the form with the data of the selected row
    document.getElementById('produceName').value = sale.produceName;
    document.getElementById('produceType').value = sale.produceType;
    document.getElementById('saleDate').value = sale.saleDate;
    document.getElementById('saleTime').value = sale.saleTime;
    document.getElementById('tonnage').value = sale.tonnage;
    document.getElementById('costUgx').value = sale.costUgx;
    document.getElementById('dealerName').value = sale.dealerName;
    document.getElementById('contact').value = sale.contact;
    document.getElementById('sellingPrice').value = sale.sellingPrice;

    // Change the "Add Sale" button to "Save Changes"
    const addButton = document.querySelector('.input-form button');
    addButton.textContent = 'Save Changes';
    addButton.onclick = saveChanges;
}

function saveChanges() {
    if (editingRow !== null) {
        // Update the salesData array with the new values from the form
        salesData[editingRow] = {
            produceName: document.getElementById('produceName').value.trim(),
            produceType: document.getElementById('produceType').value.trim(),
            saleDate: document.getElementById('saleDate').value,
            saleTime: document.getElementById('saleTime').value,
            tonnage: document.getElementById('tonnage').value.trim(),
            costUgx: document.getElementById('costUgx').value.trim(),
            dealerName: document.getElementById('dealerName').value.trim(),
            contact: document.getElementById('contact').value.trim(),
            sellingPrice: document.getElementById('sellingPrice').value,
            branch: branchName
        };

        renderSalesTable(); // Re-render the table with updated data
        salesForm.reset(); // Clear the form
        editingRow = null; // Reset the editing row

        // Change the button back to "Add Sale"
        const addButton = document.querySelector('.input-form button');
        addButton.textContent = 'Add Sale';
        addButton.onclick = addSale; // Reset the button's onclick function
    }
}

function deleteSale(index) {
    if (confirm("Are you sure you want to delete this sale record?")) {
        salesData.splice(index, 1); // Remove the sale from the array
        renderSalesTable(); // Re-render the table
    }
}

// Initial rendering (if there's any data to load initially)
renderSalesTable();