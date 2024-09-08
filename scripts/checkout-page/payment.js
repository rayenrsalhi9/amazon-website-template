import { cart } from "../../data/class-cart.js";
import deliveryOptions from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { dollarFormat } from "../../quickActions/dollarFormat.js";

export function generatePayment() {

    // calculate number of items :
    let items = 0;
    cart.products.forEach(cartItem => {
        items += cartItem.quantity;
    });

    let total = 0;
    let matchingItem;
    products.forEach(product => {
        cart.products.forEach(cartItem => {
            if (product.id === cartItem.productId) {
                matchingItem = product;
                const matchingItemPrice = matchingItem.priceCents
                total += matchingItemPrice * cartItem.quantity;
            }
        });
    });

    let deliveryCost = 0;
    let matchingDeliveryItem;
    deliveryOptions.forEach(option => {
        cart.products.forEach(cartItem => {
            if (option.id === cartItem.deliveryOptionId) {
                matchingDeliveryItem = option;
                deliveryCost += matchingDeliveryItem.deliveryCents;
            };
            
        });
    });

    let totalNoTax = total + deliveryCost;
    let tax = (totalNoTax  * 10) / 100;
    let totalWithTax = totalNoTax + tax;

    // convert all prices to dollar
    total = dollarFormat(total);
    deliveryCost = dollarFormat(deliveryCost);
    totalNoTax = dollarFormat(totalNoTax);
    tax = dollarFormat(tax);
    totalWithTax = dollarFormat(totalWithTax);

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
            <div class="payment-summary-money js-delivery-cost"> $${deliveryCost} </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div> Total before tax: </div>
            <div class="payment-summary-money js-total-no-tax"> $${totalNoTax} </div>
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