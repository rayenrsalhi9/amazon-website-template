import { cart, removeItemFromCart, saveToLocalStorage, updateDeliveryOption } from '../../data/cart.js';
import deliveryOptions from '../../data/deliveryOptions.js';
import { products } from '../../data/products.js';
import { generatePayment } from './payment.js';

export function renderOrderSummary() {

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
            renderOrderSummary();
            addQuantityToHomeLink();
            generatePayment();

        });
    });

    // add event listeners to update buttons :
    const updateButtons = document.querySelectorAll('.update-quantity-link');
    updateButtons.forEach(btn => {
        btn.addEventListener('click', () => {

            const updateButtonId = btn.dataset.id;

            const inputArea = btn.parentElement.querySelector('.quantity-input');
            const saveButton = btn.parentElement.querySelector('.save-quantity-link');
            const quantitySpan = btn.parentElement.querySelector('.quantity-label');

            inputArea.classList.toggle('hidden');
            saveButton.classList.toggle('hidden');
            btn.classList.add('hidden');
            quantitySpan.innerHTML = '';

            saveButton.addEventListener('click', (e) => {
                if (inputArea.value === '' || !inputArea.value.match(/[0-9]/ig)) e.preventDefault;
                else {
                    inputArea.classList.add('hidden');
                    saveButton.classList.add('hidden');
                    btn.classList.remove('hidden');
                    quantitySpan.innerHTML = Number(inputArea.value);
                    updateSavedQuantity(updateButtonId, Number(inputArea.value));
                    addQuantityToHomeLink();
                    generatePayment();
                }
            })
        });
    });

    // handle click on delivery options :
    document.querySelectorAll('.delivery-option').forEach(option => {
        option.addEventListener('click', () => {
            const productId = option.querySelector('.delivery-option-input').dataset.productId;
            const deliveryOptionId = option.querySelector('.delivery-option-input').dataset.deliveryOptionId;
            updateDeliveryOption(productId, deliveryOptionId); 
            renderOrderSummary();
            generatePayment();
        });
    });


    // functions :

    function addProductsToCheckout(orderSummary) {

        let orderSummaryHtml = '';

        cart.forEach(el => {

            const productId = el.productId;

            let matchingProduct;

            products.forEach(i => {
                if (productId === i.id) {
                    matchingProduct = i;
                }
            });

            const productImage = matchingProduct.image;
            const productPrice = matchingProduct.priceCents;
            const productName = matchingProduct.name;

            const deliveryOptionId = el.deliveryOptionId;
            let matchingIdItem;
            deliveryOptions.forEach(option => {
                if (option.id === deliveryOptionId) matchingIdItem = option;
            });

            const todaysDate = dayjs();
            const deliveryDate = todaysDate.add(matchingIdItem.deliveryDuration, 'day').format('dddd,MMMM D');

            orderSummaryHtml += `

                <div class="cart-item-container js-${matchingProduct.id}">

                    <div class="delivery-date"> Delivery date: ${deliveryDate}</div>

                    <div class="cart-item-details-grid">

                        <img class="product-image" src= ${productImage} >

                        <div class="cart-item-details">

                            <div class="product-name"> ${productName} </div>

                            <div class="product-price"> $${(productPrice / 100).toFixed(2)} </div>

                            <div class="product-quantity">

                                <span> Quantity: <span class="quantity-label">${el.quantity}</span> </span>
                                <span class="update-quantity-link link-primary" data-id="${matchingProduct.id}"> Update </span>
                                <input class="quantity-input hidden">
                                <span class="save-quantity-link hidden link-primary">Save</span>
                                <span class="delete-quantity-link link-primary" data-id="${matchingProduct.id}"> Delete </span>

                            </div>
                        </div>

                        <div class="delivery-options">

                            <div class="delivery-options-title"> Choose a delivery option: </div>

                            ${generateDeliveryOptions(matchingProduct, el)}

                        </div>
                    </div>
                </div>

    `;
        })

        orderSummary.innerHTML = orderSummaryHtml;
    }

    function addQuantityToHomeLink() {

        linkQuantity = 0;

        cart.forEach(i => {
            linkQuantity += i.quantity;
        });

        homeLink.innerHTML = `${linkQuantity} items`;
    }

    function updateSavedQuantity(updateButtonId, inputAreaValue) {

        let matchingItem;

        cart.forEach(i => {
            if (updateButtonId === i.productId) matchingItem = i;
        });

        matchingItem.quantity = inputAreaValue;

        saveToLocalStorage();

    }

    function generateDeliveryOptions(matchingProduct, el) {

        let deliveryOptionsHtml = ''

        deliveryOptions.forEach(option => {

            const todaysDate = dayjs();
            const deliveryDate = todaysDate.add(option.deliveryDuration, 'day').format('dddd,MMMM D');
            const deliveryCost = option.deliveryCents === 0 ? 'FREE' : `$${(option.deliveryCents / 100).toFixed(2)} - `;

            const isChecked = option.id === el.deliveryOptionId;

            deliveryOptionsHtml += `

            <div class="delivery-option">

                <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}" data-product-id="${matchingProduct.id}" data-delivery-option-id="${option.id}">
                <div>
                    <div class="delivery-option-date"> ${deliveryDate} </div>
                    <div class="delivery-option-price"> ${deliveryCost} Shipping </div>
                </div>

            </div>

        `;

        });

        return deliveryOptionsHtml;
    }
}