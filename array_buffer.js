'use strict';
/**
 * DEMO ARRAY BUFFER.
 * Reference: PluralSight tutorial
 */

class Bar {

    constructor(width, height, colorRgb) {
        this.width = width;
        this.height = height;
        this.colorRgb = colorRgb;
    }

    /**
     * Gets hex value from rgb.
     * @param {array} coloRgb.
     */
    getHexColor() {
        let hexStr = '#';
        this.colorRgb.forEach(clr => hexStr += clr.toString(16));
        return hexStr;
    }

    /**
     * Draw bar.
     */
    drawBar(ctx) {
        ctx.fillStyle = this.getHexColor();
        ctx.fillRect(this.width * 60, 100 - this.height, 50, this.height);
    }

}

// bar chart.
const canvas = document.getElementById('bar-chart');
const ctx = canvas.getContext('2d');

// 15 byte data array (3 bars with 5 bytes each)
const buffer1 = new ArrayBuffer(5 * 3);
const uInt8View = new Uint8Array(buffer1);
//--bar 0 ---
uInt8View[0] = 0;
uInt8View[1] = 100;
uInt8View[2] = 20;
uInt8View[3] = 10;
uInt8View[4] = 10;
//--bar 2---
uInt8View[5] = 1;
uInt8View[6] = 70;
uInt8View[7] = 210;
uInt8View[8] = 170;
uInt8View[9] = 230;
//--bar 3---
uInt8View[10] = 2;
uInt8View[11] = 50;
uInt8View[12] = 75;
uInt8View[13] = 185;
uInt8View[14] = 25;

const bar0 = new Bar(uInt8View[0], uInt8View[1], [uInt8View[2], uInt8View[3], uInt8View[4]]);
bar0.drawBar(ctx);
const bar1 = new Bar(uInt8View[5], uInt8View[6], [uInt8View[7], uInt8View[8], uInt8View[9]]);
bar1.drawBar(ctx);
const bar3 = new Bar(uInt8View[10], uInt8View[11], [uInt8View[12], uInt8View[13], uInt8View[14]]);
bar3.drawBar(ctx);

