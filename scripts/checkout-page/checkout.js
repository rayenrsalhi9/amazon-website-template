import { renderOrderSummary } from './orderSummary.js';
import { generatePayment } from './payment.js';
import { fetchBackend } from '../../data/products.js';
//import '../../data/backend-practice.js'

/* new Promise((resolve) => {
    fetchBackend(() => {
        resolve();
    });
}).then(() => {
    renderOrderSummary();
    generatePayment();
}); */

fetchBackend().then(() => {
    renderOrderSummary();
    generatePayment();
});

/*
loadBackend(() => {
    renderOrderSummary();
    generatePayment();
});
*/

// callback hell example

/*
loadBackend(() => {
    loadCart(() => {
        renderOrderSummary(() => {
            generatePayment();
        });
    });
});
*/

/*
Promise.all([
    new Promise((resolve) => {
        console.log('hey')
        resolve('1');
    }),
    new Promise((resolve) => {
        console.log('bye');
        resolve('2');
    })
]).then((values) => {
    console.log(values); => all values in resolve (in an array, if empty : undefined)
    renderOrderSummary();
    generatePayment();
});
*/