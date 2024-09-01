import { cart, removeItemFromCart, saveToLocalStorage } from '../data/cart.js';
import { products } from '../data/products.js';

// selecting items :
const orderSummary = document.querySelector('.order-summary');
const homeLink = document.querySelector('.return-to-home-link');

addProductsToCheckout(orderSummary);

// update quantity in home link :
let linkQuantity = 0;
addQuantityToHomeLink();

// add event listeners to delete buttons :
const deleteButtons = document.querySelectorAll('.delete-quantity-link');

deleteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        
        const buttonId = btn.dataset.id;

        removeItemFromCart(buttonId);

        saveToLocalStorage()

        document.querySelector(`.js-${buttonId}`).remove();

        addQuantityToHomeLink();

    });
});



// functions :

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

        const productImage = matchingProduct.image;
        const productPrice = matchingProduct.priceCents;
        const productName = matchingProduct.name;

        orderSummaryHtml += `

            <div class="cart-item-container js-${matchingProduct.id}">

                <div class="delivery-date"> Delivery date: Tuesday, June 21</div>

                <div class="cart-item-details-grid">

                    <img class="product-image" src= ${productImage} >

                    <div class="cart-item-details">

                        <div class="product-name"> ${productName} </div>

                        <div class="product-price"> $${(productPrice / 100).toFixed(2)} </div>

                        <div class="product-quantity">

                            <span> Quantity: <span class="quantity-label">${cart[i].quantity}</span> </span>
                            <span class="update-quantity-link link-primary"> Update </span>
                            <span class="delete-quantity-link link-primary" data-id="${matchingProduct.id}"> Delete </span>

                        </div>
                    </div>

                    <div class="delivery-options">

                        <div class="delivery-options-title"> Choose a delivery option: </div>

                        <div class="delivery-option">
                            <input type="radio" checked class="delivery-option-input" name="delivery-option-${cart[i].productId}">
                            <div>
                                <div class="delivery-option-date"> Tuesday, June 21 </div>
                                <div class="delivery-option-price"> FREE Shipping </div>
                            </div>
                        </div>

                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input" name="delivery-option-${cart[i].productId}">
                            <div>
                                <div class="delivery-option-date"> Wednesday, June 15 </div>
                                <div class="delivery-option-price"> $4.99 - Shipping </div>
                            </div>
                        </div>

                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input" name="delivery-option-${cart[i].productId}">
                            <div>
                                <div class="delivery-option-date"> Monday, June 13 </div>
                                <div class="delivery-option-price"> $9.99 - Shipping </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

`;
};

    orderSummary.innerHTML = orderSummaryHtml;
}

function addQuantityToHomeLink() {

    linkQuantity = 0;

    cart.forEach(i => {
        linkQuantity ++;
    });

    homeLink.innerHTML = `${linkQuantity} items`;
}