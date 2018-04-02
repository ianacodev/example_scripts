'use strict';
this.addEventListener('message', (event) => {
    const customers = event.data;
    customers.forEach((customer) => { 
        customer.status = true
        console.log(`Cashier A : Customer ${customer.id} ${customer.status}`); 
    });
    this.postMessage({cashierId: 'A', customers: customers});
});