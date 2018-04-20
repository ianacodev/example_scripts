'use strict';
this.addEventListener('message', (event) => {
    const customers = event.data;
    customers.forEach((customer) => { 
        customer.status = true
        // console.log(`Cashier B : Customer ${customer.id} ${customer.status}`); 
    });
    this.postMessage({cashierId: 'B', customers: customers});
});