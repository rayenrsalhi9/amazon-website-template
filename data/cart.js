let cart;
loadCartFromStorage();

/* let cart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }
]; */

function updateQuantity(productId, btn) {

    let matchingItem = false;
  
    cart.forEach(el => {
      if (productId === el.productId) matchingItem = el;
    });
  
    const selectedQuantity = Number(btn.parentElement.querySelector('select').value);
  
    if (matchingItem) matchingItem.quantity += selectedQuantity;
      else cart.push({
        productId,
        quantity : selectedQuantity,
        deliveryOptionId: '1'
      });

      saveToLocalStorage();
  }

function removeItemFromCart(buttonId) {

  let newCart = [];

  cart.forEach(i => {
    if (buttonId !== i.productId) newCart.push(i);
  });

  cart = newCart;

  saveToLocalStorage();

}

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingCartItem;
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) matchingCartItem = cartItem;
  });

  matchingCartItem.deliveryOptionId = deliveryOptionId;

  saveToLocalStorage();

}

function loadCartFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export { cart , updateQuantity, removeItemFromCart, saveToLocalStorage, updateDeliveryOption, loadCartFromStorage }
