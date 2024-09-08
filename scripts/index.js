import * as cartModule from '../data/cart.js';
import {products} from '../data/products.js';

const cartQuantity = document.querySelector('.cart-quantity');
displayQuantity();

// select the container that has all products :
const productsGrid = document.querySelector('.products-grid');
addProductsToPage(productsGrid);

const addButtons = document.querySelectorAll('.add-to-cart-button');
let opacity;

addButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    alertAddedProduct(opacity, btn)

    const {productId} = btn.dataset;
    
    cartModule.updateQuantity(productId, btn);
    displayQuantity();

  });
});

// functions :
function addProductsToPage(productsGrid) {

  let productsGridHtml = '';

  products.forEach(i => {
      productsGridHtml += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src=${i.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${i.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${i.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${i.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${i.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${i.showExtraInfo()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary" data-product-id = "${i.id}">
              Add to Cart
            </button>
          </div>
      `
  });

  productsGrid.innerHTML = productsGridHtml;
}

function alertAddedProduct(opacity, btn) {

  const alertSpan = btn.parentElement.querySelector('.added-to-cart')

  clearTimeout(opacity);

  alertSpan.style.opacity = '1';

  opacity = setTimeout(() => {
    alertSpan.style.opacity = '0';
  }, 2000);
}

function displayQuantity() {
  
  let quantity = 0;
  cartModule.cart.forEach(i => {
    quantity += i.quantity;
  });
  cartQuantity.innerText = quantity;
}

export {addProductsToPage}