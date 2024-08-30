// select the container that has all products :
const productsGrid = document.querySelector('.products-grid');

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
              src="images/ratings/rating-${i.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${i.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(i.priceCents / 100).toFixed(2)}
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



const addButtons = document.querySelectorAll('.add-to-cart-button');
addButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    btn.parentElement.querySelector('.added-to-cart').style.opacity = '1';

    setTimeout(() => {
      btn.parentElement.querySelector('.added-to-cart').style.opacity = '0';
    }, 2000);

    const productId = btn.dataset.productId;
    let matchingItem = false;

    cart.forEach(el => {
      if (productId === el.productId) matchingItem = el;
    });

    if (matchingItem) matchingItem.quantity++;
      else cart.push({
        productId,
        quantity : 1
      });

    updateQuantity();
  });
});