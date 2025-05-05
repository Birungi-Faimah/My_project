document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("procurementForm");
  const tableBody = document.getElementById("tableBody");

  // Handle form submission
  window.handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(form);
    const produceName = formData.get("produceName");
    const produceType = formData.get("produceType");
    const procurementDate = formData.get("procurementDate");
    const procurementTime = formData.get("procurementTime");
    const tonnage = formData.get("tonnage");
    const cost = formData.get("cost");
    const dealerName = formData.get("dealerName");
    const dealerContact = formData.get("dealerContact");
    const sellingPrice = formData.get("sellingPrice");

    // Validate form data (optional)
    if (!produceName || !produceType || !procurementDate || !procurementTime || !tonnage || !cost || !dealerName || !dealerContact || !sellingPrice) {
      alert("Please fill in all fields.");
      return;
    }

    // Add a new row to the table
    const newRow = document.createElement("tr");
    newRow.classList.add("hover:bg-white/10", "transition");
    newRow.innerHTML = `
      <td class="px-4 py-2">${produceName}</td>
      <td class="px-4 py-2">${produceType}</td>
      <td class="px-4 py-2">${procurementDate}</td>
      <td class="px-4 py-2">${procurementTime}</td>
      <td class="px-4 py-2">${tonnage}</td>
      <td class="px-4 py-2">${cost}</td>
      <td class="px-4 py-2">${sellingPrice}</td>
      <td class="px-4 py-2">${dealerName}</td>
      <td class="px-4 py-2">${dealerContact}</td>
      <td class="px-4 py-2">[Branch]</td>
      <td class="px-4 py-2 actions-column">
        <a class="action-btn update-btn" href="#">
          <i class="w-5 h-5 mr-1" data-lucide="edit"></i> Update
        </a>
        <button class="action-btn delete-btn" type="button" onclick="deleteRow(this)">
          <i class="w-5 h-5 mr-1" data-lucide="trash"></i> Delete
        </button>
      </td>
    `;
    tableBody.appendChild(newRow);

    // Clear the form
    form.reset();

    // Show success message
    const submissionMessage = document.getElementById("submissionMessage");
    submissionMessage.style.display = "block";
    submissionMessage.textContent = "Procurement record added successfully!";
    setTimeout(() => {
      submissionMessage.style.display = "none";
    }, 3000);
  };

  // Delete row function
  window.deleteRow = (button) => {
    const row = button.closest("tr");
    row.remove();
  };
});