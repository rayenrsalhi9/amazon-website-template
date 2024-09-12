import { cart } from '../data/class-cart.js';
import {products, fetchBackend} from '../data/products.js';

fetchBackend().then(() => renderProducts());

function renderProducts() {
  
  let opacity;

  handleSearchBar();
  displayQuantity();
  handleDarkMode();

  const productsGrid = document.querySelector('.products-grid');
  addProductsToPage(products, productsGrid);

  handleAddToCart();

  // functions :
  function addProductsToPage(products, productsGrid) {

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

    const cartQuantity = document.querySelector('.cart-quantity');
    
    let quantity = 0;
    cart.products.forEach(product => {
      quantity += product.quantity;
    });
    cartQuantity.innerText = quantity;
  }

  function handleSearchBar() {
    
    const searchBar = document.querySelector('.search-bar');

    searchBar.addEventListener('keydown', () => {
      
      setTimeout(() => {
        let searchProducts = [];

        products.forEach(product => {
          if (product.name.toLowerCase().includes(searchBar.value.toLowerCase())) {
            searchProducts.push(product);
          }
        });

        addProductsToPage(searchProducts, productsGrid);
        handleAddToCart();
      }, 100);
    });

  }

  function handleAddToCart() {

    const addButtons = document.querySelectorAll('.add-to-cart-button');
  
    addButtons.forEach(btn => {
      btn.addEventListener('click', () => {

        alertAddedProduct(opacity, btn)

        const {productId} = btn.dataset;
        
        cart.updateQuantity(productId, btn);

        displayQuantity();

      });
    });
  }

  function handleDarkMode() {
    const container = document.querySelector('.dark-mode-container');
    const icon = document.querySelector('.dark-mode-container i');
    icon.addEventListener('click', () => {
      icon.classList.toggle('clicked');
      container.classList.toggle('clicked');
    })
  }
}