import { orders } from "../../data/orders.js";
import { fetchBackend, products } from "../../data/products.js";

fetchBackend().then(() => {
    renderTrackingPage();
});

function renderTrackingPage() {
    const trackingContainer = document.querySelector('.main');

    const pageUrl = new URL(window.location.href);
    const pageProductId = pageUrl.searchParams.get('productId');
    const pageOrderId = pageUrl.searchParams.get('orderId');

    renderTracking();

    function renderTracking() {

        let trackingHtml = '';

        let matchingItem;
        let matchingProductsItem;

        orders.forEach(order => {

            order.products.forEach(product => {

                if (product.productId === pageProductId) matchingItem = product;

            });

            
        });

        products.forEach(element => {
            if (element.id === matchingItem.productId) matchingProductsItem = element;
        });

        const arrivingDate = dayjs(matchingItem.estimatedDeliveryDate).format('dddd, MMMM D');

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
                    <div class="progress-label">
                        Preparing
                    </div>
                    <div class="progress-label current-status">
                        Shipped
                    </div>
                    <div class="progress-label">
                        Delivered
                    </div>
                </div>

                <div class="progress-bar-container">
                    <div class="progress-bar"></div>
                </div>

            </div>
        `;

        trackingContainer.innerHTML = trackingHtml;

    }
}