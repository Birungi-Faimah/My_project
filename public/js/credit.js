document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('creditForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;

    // Collect input values
    const buyerName = form.buyerName.value;
    const nin = form.nin.value;
    const location = form.location.value;
    const phone = form.phone.value;
    const amount = form.amount.value;
    const agent = form.agent.value;
    const dueDate = form.dueDate.value;
    const produce = form.produce.value;
    const produceType = form.produceType.value;
    const tonnage = form.tonnage.value;
    const dispatchDate = form.dispatchDate.value;

    // Create a new table row
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${buyerName}</td>
      <td>${nin}</td>
      <td>${location}</td>
      <td>${phone}</td>
      <td>${amount}</td>
      <td>${agent}</td>
      <td>${dueDate}</td>
      <td>${produce}</td>
      <td>${produceType}</td>
      <td>${tonnage}</td>
      <td>${dispatchDate}</td>
    `;

    // Append row to table
    document.querySelector('#creditTable tbody').appendChild(row);

    // Optionally clear form and show message
    form.reset();
    document.getElementById('message').textContent = 'Credit record added successfully!';
  });
});