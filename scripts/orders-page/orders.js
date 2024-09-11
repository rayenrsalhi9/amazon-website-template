import { cart } from "../../data/class-cart.js";
import { orders } from "../../data/orders.js";
import { dollarFormat } from "../../quickActions/dollarFormat.js";
import { products } from "../../data/products.js";
import { fetchBackend } from "../../data/products.js";


const cartQuantity = document.querySelector('.cart-quantity');
displayCartQuantity();

const ordersGrid = document.querySelector('.orders-grid');

fetchBackend().then(() => {
    renderOrders();
})



// functions : 

function displayCartQuantity() {
    let quantity = 0;
    cart.products.forEach(product => {
        quantity += product.quantity;
    });
    cartQuantity.innerHTML = quantity;
}

function renderOrders() {

    let ordersHtml = '';

    orders.forEach(order => {

        const date = dayjs(`${order.orderTime}`).format('MMMM D');

        ordersHtml += `

            <div class="order-container">

                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${date}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${dollarFormat(order.totalCostCents)} </div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>
                <div class="order-details-grid">
                    ${renderOrderInfo(order)}
                </div>
            </div>
        `;
    });

    ordersGrid.innerHTML = ordersHtml;
}

function renderOrderInfo(order) {

    let infoHtml = '';

    for (let el of order.products) {

        const deliveryTime = dayjs(el.estimatedDeliveryTime).format('MMMM D');

        let matchingItem;

        products.forEach(product => {
            if (product.id === el.productId) matchingItem = product;
        });
        

        
        infoHtml += `

                <div class="product-image-container">
                    <img src="${matchingItem.image}">
                </div>

                <div class="product-details">
                    <div class="product-name">${matchingItem.name}</div>
                    <div class="product-delivery-date">Arriving on: ${deliveryTime}</div>
                    <div class="product-quantity">Quantity: ${el.quantity}</div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>

        `;
    };
    return infoHtml;
}