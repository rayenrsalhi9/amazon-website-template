let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartQuantity = document.querySelector('.cart-quantity');

let quantity = 0;

function displayQuantity() {
    quantity = 0
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

export {cart , quantity,cartQuantity,updateQuantity, displayQuantity, removeItemFromCart, saveToLocalStorage}
