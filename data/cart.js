let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartQuantity = document.querySelector('.cart-quantity');


function displayQuantity() {
    let quantity = 0
    cart.forEach(i => quantity += i.quantity);
    cartQuantity.innerHTML = quantity;
}

function updateQuantity(productId, btn) {

    let matchingItem = false;
  
    cart.forEach(el => {
      if (productId === el.productId) matchingItem = el;
    });
  
    const selectedQuantity = Number(btn.parentElement.querySelector('select').value);
  
    if (matchingItem) matchingItem.quantity += selectedQuantity;
      else cart.push({
        productId,
        quantity : selectedQuantity
      });
  }

function removeItemFromCart(buttonId) {

  let newCart = [];

  cart.forEach(i => {
    if (buttonId !== i.productId) newCart.push(i);
  });

  cart = newCart;

}

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export {cart , cartQuantity,updateQuantity, displayQuantity, removeItemFromCart, saveToLocalStorage}
