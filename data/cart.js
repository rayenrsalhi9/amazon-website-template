let cart = [];

let quantity = 0;
const cartQuantity = document.querySelector('.cart-quantity');

function updateQuantity() {
    quantity++;
    cartQuantity.innerText = quantity;
}
