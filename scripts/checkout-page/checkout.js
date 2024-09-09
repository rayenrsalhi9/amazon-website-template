import { renderOrderSummary } from './orderSummary.js';
import { generatePayment } from './payment.js';
import { loadBackend } from '../../data/products.js';
//import '../../data/backend-practice.js'

loadBackend(() => {
    renderOrderSummary();
    generatePayment();
});
