'use strict';
class Store {

    constructor(customers, cashiers) {
        this.customers = customers;
        this.cashiers = cashiers;
        this.customersPerCashier = this.calculateCustomersPerCashier();
    }

    /**
     * Calculates customers per cashier.
     */
    calculateCustomersPerCashier() {
        return Math.ceil(this.customers.length / this.cashiers.length);
    }

    /**
     * Services customers.
     */
    serviceCustomers() {
        this.cashiers.forEach((cashier, index) => {
            const customerChunk = this.customers.slice(this.customersPerCashier * index, this.customersPerCashier * (++index));
            cashier.postMessage(customerChunk);
            cashier.onmessage = (event) => {
                console.log(`
                    ------------------------------------
                    Cashier ${event.data.cashierId}
                    Customers: ${event.data.customers.length}
                    -------------------------------------
                `);
            }
        });
    }
}


/**
 * Generates customers for specified amount.
 * @param {number} total.
 */
const generateCustomers = (total) => {
    let customers = [];
    for(let i = 0; i < total; i++ ) {
        customers.push({
            id: i,
            status: false
        });
    }
    return customers;
}

const customers = generateCustomers(1000);
const cashiers = [
    new Worker('./web_workers/cashierA.js'),
    new Worker('./web_workers/cashierB.js')
];

const store = new Store(customers, cashiers);
store.serviceCustomers();
