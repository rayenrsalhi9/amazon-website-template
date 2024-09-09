import { renderOrderSummary } from './orderSummary.js';
import { generatePayment } from './payment.js';
import { loadBackend } from '../../data/products.js';
//import '../../data/backend-practice.js'

new Promise((resolve) => {
    loadBackend(() => {
        resolve();
    });
}).then(() => {
    renderOrderSummary();
    generatePayment();
});

/*
loadBackend(() => {
    renderOrderSummary();
    generatePayment();
});
*/
