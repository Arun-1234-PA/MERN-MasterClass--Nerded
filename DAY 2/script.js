let customers = [];

function addCustomer() {
    const customerInput = document.getElementById("customerInput");
    const customerName = customerInput.value.trim();
    if (customerName === "") return;

    const customer = {
        id: Date.now(),
        name: customerName,
        active: true
    };

    customers.push(customer);
    customerInput.value = "";
    displayCustomers();
}

function toggleCustomerStatus(customerId) {
    const customerIndex = customers.findIndex(customer => customer.id == customerId);
    customers[customerIndex].active = !customers[customerIndex].active;
    displayCustomers();
}

function deleteCustomer(customerId) {
    customers = customers.filter(customer => customer.id != customerId);
    displayCustomers();
}

function displayCustomers() {
    const activeCustomersContainer = document.getElementById("activeCustomers");
    const inactiveCustomersContainer = document.getElementById("inactiveCustomers");

    activeCustomersContainer.innerHTML = "<h2>Active Customers</h2>";
    inactiveCustomersContainer.innerHTML = "<h2>Inactive Customers</h2>";

    customers.forEach(customer => {
        const customerElement = document.createElement("div");
        customerElement.className = "customer";
        if (!customer.active) {
            customerElement.classList.add("inactive");
        } else {
            customerElement.classList.add("active");
        }

        const customerName = document.createElement("span");
        customerName.textContent = customer.name;

        const customerButtons = document.createElement("div");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteCustomer(customer.id);

        const statusButton = document.createElement("button");
        statusButton.textContent = customer.active ? "Deactivate" : "Activate";
        statusButton.onclick = () => toggleCustomerStatus(customer.id);

        customerButtons.appendChild(statusButton);
        customerButtons.appendChild(deleteButton);

        customerElement.appendChild(customerName);
        customerElement.appendChild(customerButtons);

        if (!customer.active) {
            inactiveCustomersContainer.appendChild(customerElement);
        } else {
            activeCustomersContainer.appendChild(customerElement);
        }
    });
}

// Initial display of customers when the page loads
displayCustomers();
