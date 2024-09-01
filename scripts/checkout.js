import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

// selecting item that contains all products added to cart :
const orderSummary = document.querySelector('.order-summary');

addProductsToCheckout(orderSummary);

function addProductsToCheckout(orderSummary) {

    let orderSummaryHtml = '';

    for (let i in cart) {

        const productId = cart[i].productId;

        let matchingProduct;

        for (let i in products) {
            if (productId === products[i].id) {
                matchingProduct = products[i];
            }
        }

        const productImage = products[i].image;
        const productPrice = products[i].priceCents;
        const productName = products[i].name;

        orderSummaryHtml += `

            <div class="cart-item-container">

                <div class="delivery-date"> Delivery date: Tuesday, June 21</div>

                <div class="cart-item-details-grid">

                    <img class="product-image" src= ${productImage} >

                    <div class="cart-item-details">

                        <div class="product-name"> ${productName} </div>

                        <div class="product-price"> $${(productPrice / 100).toFixed(2)} </div>

                        <div class="product-quantity">

                            <span> Quantity: <span class="quantity-label">${cart[i].quantity}</span> </span>
                            <span class="update-quantity-link link-primary"> Update </span>
                            <span class="delete-quantity-link link-primary"> Delete </span>

                        </div>
                    </div>

                    <div class="delivery-options">

                        <div class="delivery-options-title"> Choose a delivery option: </div>

                        <div class="delivery-option">
                            <input type="radio" checked class="delivery-option-input" name="delivery-option-1">
                            <div>
                                <div class="delivery-option-date"> Tuesday, June 21 </div>
                                <div class="delivery-option-price"> FREE Shipping </div>
                            </div>
                        </div>

                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input" name="delivery-option-1">
                            <div>
                                <div class="delivery-option-date"> Wednesday, June 15 </div>
                                <div class="delivery-option-price"> $4.99 - Shipping </div>
                            </div>
                        </div>

                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input" name="delivery-option-1">
                            <div>
                                <div class="delivery-option-date"> Monday, June 13 </div>
                                <div class="delivery-option-price"> $9.99 - Shipping </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

`
};

    orderSummary.innerHTML = orderSummaryHtml;

}