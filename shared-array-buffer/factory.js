'use strict';

class Factory {

    constructor(productsBufferView, workers) {
        this.productBufferView = productBufferView;
        this.workers = workers;
    }

    /**
     * Builds products.
     */
    buildProducts() {
        this.workers.forEach((worker) => {
            worker.postMessage(this.productBufferView);
            worker.onmessage = () => {
                if (this.productBufferView.every((product) => product === 1)) {
                    console.log('Products completed', this.productBufferView);
                }
            }
        });
    }

}


/**
 * Generate specified number of products to service.
 * @param {number} totalProducts.
 */
const generateProducts = (productBufferView) => {
    for (let index = 0; index < productBufferView.length; index++) {
        productBufferView[index] = 0;
    }
}

const productBuffer = new SharedArrayBuffer(2000);
const productBufferView = new Int8Array(productBuffer);
generateProducts(productBufferView);
const workers = [
    new Worker('./shared_array_buffer/workerA.js'),
    new Worker('./shared_array_buffer/workerB.js'),
    new Worker('./shared_array_buffer/workerC.js')
];

const factory = new Factory(productBufferView, workers);
factory.buildProducts();
