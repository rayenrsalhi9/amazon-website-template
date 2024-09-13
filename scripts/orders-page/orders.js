import { cart } from "../../data/class-cart.js";
import { orders } from "../../data/orders.js";
import { dollarFormat } from "../../quickActions/dollarFormat.js";
import { products } from "../../data/products.js";
import { fetchBackend } from "../../data/products.js";

displayCartQuantity();

const ordersGrid = document.querySelector('.orders-grid');

fetchBackend().then(() => {
    renderOrders();
    handleBuyAgain();
    handleTrackPackage();
    handleDarkMode();
    initializeAppearance();
});



// functions : 

function displayCartQuantity() {
    const cartQuantity = document.querySelector('.cart-quantity');
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
                    <button class="buy-again-button button-primary" data-id="${matchingItem.id}">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${matchingItem.id}">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>

        `;
    };
    return infoHtml;
}

function handleBuyAgain() {

    const buttons = document.querySelectorAll('.buy-again-button');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {

            let matchingItem;

            cart.products.forEach(product => {
                if (product.productId === btn.dataset.id) matchingItem = product;
            });

            if (matchingItem) {
                matchingItem.quantity ++;
                cart.saveToStorage();
                displayCartQuantity();
            } else {
                cart.products.push({
                    productId: btn.dataset.id,
                    quantity: 1,
                    deliveryOptionId: '1'
                });
                cart.saveToStorage();
                displayCartQuantity();
            }
        });
    });

}

function handleTrackPackage() {
    const buttons = document.querySelectorAll('.track-package-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log(button.dataset.orderId);
            console.log(button.dataset.productId);
        })
    })
}

function handleDarkMode() {

    const container = document.querySelector('.dark-mode-container');
    const icon = document.querySelector('.dark-mode-container svg');

    icon.addEventListener('click', () => {
      icon.classList.toggle('clicked');
      container.classList.toggle('clicked');

      if (icon.classList.contains('clicked')) {

        localStorage.setItem('dark-mode', 'on');
        
        document.documentElement.style.setProperty('--dark-color', '#fafafa');
        document.body.style.backgroundColor = '#111111';
        document.querySelectorAll('.order-header').forEach(header => {
            header.style.backgroundColor = 'rgb(254, 189, 105)';
        });

      } else {

        localStorage.setItem('dark-mode', 'off');

        document.documentElement.style.setProperty('--dark-color', '#111111');
        document.body.style.backgroundColor = 'white';
        document.querySelectorAll('.order-header').forEach(header => {
            header.style.backgroundColor = 'rgb(240, 242, 242)';
        });
      }
    })
}

function initializeAppearance() {

    const container = document.querySelector('.dark-mode-container');
    const icon = document.querySelector('.dark-mode-container svg');

    const darkModeOn = localStorage.getItem('dark-mode') || 'off';

    if (darkModeOn === 'off') {

        icon.classList.remove('clicked');
        container.classList.remove('clicked');
        
        document.documentElement.style.setProperty('--dark-color', '#111111');
        document.body.style.backgroundColor = 'white';
        document.querySelectorAll('.order-header').forEach(header => {
            header.style.backgroundColor = 'rgb(240, 242, 242)';
        });

    } else {

        icon.classList.add('clicked');
        container.classList.add('clicked');

        document.documentElement.style.setProperty('--dark-color', '#fafafa');
        document.body.style.backgroundColor = '#111111';
        document.querySelectorAll('.order-header').forEach(header => {
            header.style.backgroundColor = 'rgb(254, 189, 105)';
        });

    }
}