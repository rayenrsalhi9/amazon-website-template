import { renderOrderSummary } from './orderSummary.js';
import { generatePayment } from './payment.js';
import { fetchBackend } from '../../data/products.js';

fetchBackend().then(() => {
    renderOrderSummary();
    generatePayment();
});