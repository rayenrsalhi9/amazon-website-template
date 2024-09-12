import { orders } from "../../data/orders.js";
import { fetchBackend, products } from "../../data/products.js";
import { cart } from "../../data/class-cart.js";

fetchBackend().then(() => {
    renderTrackingPage();
});

function renderTrackingPage() {
    
    displayCartQuantity();
    const trackingContainer = document.querySelector('.main');

    const pageUrl = new URL(window.location.href);
    const pageProductId = pageUrl.searchParams.get('productId');
    const pageOrderId = pageUrl.searchParams.get('orderId');

    renderTracking();

    function renderTracking() {

        let trackingHtml = '';

        let matchingItem;
        let matchingProductsItem;
        let matchingOrderId;


        orders.forEach(order => {

            if (order.id === pageOrderId) matchingOrderId = order;

            order.products.forEach(product => {

                if (product.productId === pageProductId) matchingItem = product;

            });

        });

        products.forEach(element => {
            if (element.id === matchingItem.productId) matchingProductsItem = element;
        });

        let width = calculateWidth(matchingItem, matchingOrderId);
        width = width < 100 ? width : 100;

        const arrivingDate = dayjs(matchingItem.estimatedDeliveryTime).format('dddd, MMMM D');

        trackingHtml = `

            <div class="order-tracking">

                <a class="back-to-orders-link link-primary" href="orders.html">
                    View all orders
                </a>

                <div class="delivery-date">
                    Arriving on ${arrivingDate}
                </div>

                <div class="product-info">
                    ${matchingProductsItem.name}
                </div>

                <div class="product-info">
                    Quantity: ${matchingItem.quantity}
                </div>

                <img class="product-image" src="${matchingProductsItem.image}">

                <div class="progress-labels-container">
                    <div class="progress-label" data-min-width="0" data-max-width="49">
                        Preparing
                    </div>
                    <div class="progress-label" data-min-width="50" data-max-width="99">
                        Shipped
                    </div>
                    <div class="progress-label" data-min-width="100" data-max-width="100">
                        Delivered
                    </div>
                </div>

                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${width}%"></div>
                </div>

            </div>
        `;

        trackingContainer.innerHTML = trackingHtml;

        selectCurrentLabel(width);
    }

    function displayCartQuantity() {
        const cartQuantity = document.querySelector('.cart-quantity');
        let quantity = 0;
        cart.products.forEach(product => {
            quantity += product.quantity;
        });
        cartQuantity.innerHTML = quantity;
    }

    function calculateWidth(matchingItem, matchingOrderId) {

        const currentTime = dayjs();
        const deliveryTime = dayjs(matchingItem.estimatedDeliveryTime);
        const orderTime = dayjs(matchingOrderId.orderTime);

        const width = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;
        
        return width;

    }

    function selectCurrentLabel(width) {

        const progessLabels = document.querySelectorAll('.progress-label');

        progessLabels.forEach(label => {

            const minWidth = label.dataset.minWidth;
            const maxWidth = label.dataset.maxWidth;

            if (width >= minWidth && width <= maxWidth) label.classList.add('current-status');
        });
    }
}