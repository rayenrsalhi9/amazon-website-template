let cart = [
  {
    productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
    quantity: 2
  } ,
  {
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 3
  } 
];

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

export {cart , cartQuantity,updateQuantity, displayQuantity, removeItemFromCart}
