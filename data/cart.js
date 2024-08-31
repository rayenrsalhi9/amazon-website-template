let cart = [];

const cartQuantity = document.querySelector('.cart-quantity');

function displayQuantity() {
    let quantity = 0
    cart.forEach(i => quantity += i.quantity);
    cartQuantity.innerHTML = quantity;
}

export {cart , cartQuantity, displayQuantity}
