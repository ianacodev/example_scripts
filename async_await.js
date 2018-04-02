'use strict';
/**
 * DEMO ASYNC/AWAIT.
 */

 // set time delay to simulate wait for http payment process request.
const SIMULATED_TIME_DELAY = 2000; // 2s

 // set inventory.
 const inventory = {
     item0: 2,
     item1: 3  
 };

 // set mock credit card record.
 const creditCardRecord = Object.freeze({
    ccn: '13456',
    cvv: '221'
 });

 // mock address book.
 const addressBook = Object.freeze([
     '2 Woodline Drive, NJ 08564',
     '18 Lakeview Drive, IA 87891'
 ])

 /**
  * Reserves Item.
  * @param {string} item.
  * @returns {status}
  */
 const reserveItem = async(item) => {
    let totalAvailableItems = inventory[item];
    if(totalAvailableItems > 0) {
        inventory[item] = --totalAvailableItems;
        return true;
    } else {
        return Promise.reject('Item out of stock.');
    }

 };

 /**
  * Processes payment.
  * @param{string} credit card number.
  * @param {string} credit verification value (cvv)
  */
const processPayment = async(creditCard) => {
    return new Promise((resolve, reject) => { 
        if(creditCard.ccn === creditCardRecord.ccn && creditCard.cvv === creditCardRecord.cvv) {
            setTimeout(() => resolve(true), SIMULATED_TIME_DELAY);
        } else {
            reject('Invalid credit card.');
        }
    });
}

/**
 * Create shipping label.
 * @param{string} address;
 */
const createShippingLabel = async(address) => {
    if(addressBook.includes(address)) {
        return true;
    } else {
        return Promise.reject('Invalid address.');
    }
}

class Order {

    constructor(item, creditCard, address) {
        this.item = item;
        this.creditCard = creditCard;
        this.address = address;
        this.displayCurrentInventory();
    }

    /**
     * Displays current inventory prior to order.
     */
    displayCurrentInventory() {
        console.log('Inventory');
        console.log('-------------------');
        Object.entries(inventory).map((entry) => console.log(`${entry[0]} - ${entry[1]}`));
        console.log('--------------------');
    }

    /**
     * Submits order.
     */
    async submitOrder() {
        try {
            const reserveStatus = await reserveItem(this.item);
            console.log('item reserved: ', reserveStatus);
            const paymentStatus = await processPayment(this.creditCard);
            console.log('process payment: ', paymentStatus);
            const shippingStatus = await createShippingLabel(this.address);
            console.log('shipping label created: ', shippingStatus);
            this.displayCurrentInventory();
        } catch(error) {
            console.error(`Order cancelled: ${error}`);
        }
    }
}

const order1 = new Order('item0', {ccn: '13456', cvv: '221'}, '2 Woodline Drive, NJ 08564');
order1.submitOrder();

