import { cart } from "../../data/cart.js";
import deliveryOptions from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";

export function generatePayment() {

    // calculate number of items :
    let items = 0;
    cart.forEach(cartItem => {
        items += cartItem.quantity;
    });

    // calculate total price :
    let total = 0;
    let matchingItem;
    products.forEach(product => {
        cart.forEach(cartItem => {
            if (product.id === cartItem.productId) {
                matchingItem = product;
                const matchingItemPrice = matchingItem.priceCents
                total += matchingItemPrice * cartItem.quantity;
            }
        });
    });

    total = total === 0 ? 0 : Number((total / 100).toFixed(2));

    // calcualte delivery cost :
    let deliveryCost = 0;
    let matchingDeliveryItem;
    deliveryOptions.forEach(option => {
        cart.forEach(cartItem => {
            if (option.id === cartItem.deliveryOptionId) {
                matchingDeliveryItem = option;
                deliveryCost += matchingDeliveryItem.deliveryCents;
            };
            
        });
    });

    deliveryCost = deliveryCost === 0 ? 0 : Number((deliveryCost / 100).toFixed(2));

    // calculate total before tax :
    let totalNoTax = Number((total + deliveryCost).toFixed(2));

    // calculate tax :
    let tax = Number(((totalNoTax / 100) * 10).toFixed(2));
    
    // calculate final price :
    let totalWithTax = Number((totalNoTax + tax).toFixed(2));

    // generate html :
    let paymentHtml = '';
    paymentHtml = `
        <div class="payment-summary-title"> Order Summary </div>

        <div class="payment-summary-row">
            <div>Items (${items}):</div>
            <div class="payment-summary-money">$${total}</div>
        </div>

        <div class="payment-summary-row">
            <div> Shipping &amp; handling: </div>
            <div class="payment-summary-money"> $${deliveryCost} </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div> Total before tax: </div>
            <div class="payment-summary-money"> $${totalNoTax} </div>
        </div>

        <div class="payment-summary-row">
            <div> Estimated tax (10%): </div>
            <div class="payment-summary-money"> $${tax} </div>
        </div>

        <div class="payment-summary-row total-row">
            <div> Order total: </div>
            <div class="payment-summary-money"> $${totalWithTax} </div>
        </div>

        <button class="place-order-button button-primary"> Place your order </button>
    `;

    document.querySelector('.payment-summary').innerHTML = paymentHtml;

}