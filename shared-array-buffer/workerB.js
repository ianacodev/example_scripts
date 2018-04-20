'use strict';
this.addEventListener('message', (event) => {
    const productBufferView = event.data;
    productBufferView.forEach((product, index) => {
        if (product === 0) {
            Atomics.add(productBufferView, index, 1);
            console.log(`Worker B: Product ${index} finished`);
        }
    });
    this.postMessage(true);
});