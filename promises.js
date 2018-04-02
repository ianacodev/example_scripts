'use strict';
/**
 * DEMO PROMISE CHAINING.
 * 
 * Set customer id to search then run.
 * 0: customer/account
 * 1: customer/account
 * 2: customer/ no account
 * 3: no customer/ no account
 */
const CUSTOMER_ID = 2;

// set time delay to simulate wait for http request.
const SIMULATED_TIME_DELAY = 2000; // 2s

// mock customers.
const customers = [
    {
        firstname: 'John',
        lastname: 'Smith',
        accountId: 26354
    },
    {
        firstname: 'David',
        lastname: 'Johnson',
        accountId: 54567
    },
    {
        firstname: 'Mike',
        lastname: 'Williams',
        accountId: 10001
    }
];

// mock accounts.
const accounts = [
    {
        accountId: 26354,
        balance: 525.95
    },
    {
        accountId: 54567,
        balance: 325.45
    }
];

/**
 * Gets customer by specified Id.
 * Add time delay to simulate http request.
 * @param {number} customerId
 * @returns {Promise} customer 
 */
const getCustomerById = (customerId) => {
    return new Promise((resolve, error) => {
        const totalCustomers = customers.length - 1;
        setTimeout(() => {
            if(customerId >= 0 && customerId <= totalCustomers) {
                resolve(customers[customerId]);
            } else {
                error(`No customer found for specified Id (${customerId}).`);
            }
        }, SIMULATED_TIME_DELAY);
    });
}

/**
 * Gets account by specified Id.
 * @param {number} accountId.
 * @returns {Promise} account.
 */
const getAccountById = (accountId) => {
    return new Promise((resolve, error) => {
        const account = accounts.find((account) => account.accountId === accountId);
        if(typeof account !== 'undefined') {
            resolve(account);
        } else {
            error(`No account for specified Id (${accountId})`);
        }
    })
}

/**
 * Displays customer details.
 * @param {Object} customer.
 * @param {Object} account.
 */
const displayCustomerDetails = (customer, account) => {
    console.log(`
    Customer: ${customer.firstname} ${customer.lastname}
    AccountId: ${account.accountId}
    Balance: ${account.balance}
    `);
}

// execute on run.
getCustomerById(CUSTOMER_ID).then((customer) => {
    this.customer = customer;
    return getAccountById(this.customer.accountId);
}).then((account) => {
    displayCustomerDetails(this.customer, account);
}, (error) => {
    console.error(error);
});