let cart = [];

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

export {cart , cartQuantity,updateQuantity, displayQuantity}
