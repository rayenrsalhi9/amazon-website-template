let cart = [];

let quantity = 0;
const cartQuantity = document.querySelector('.cart-quantity');

function displayQuantity() {
    quantity = 0
    cart.forEach(i => quantity += i.quantity);
    cartQuantity.innerHTML = quantity;
}
