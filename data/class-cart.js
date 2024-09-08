class Cart {
    
    products;
    #localStorageKey;

    constructor(key) {
        this.#localStorageKey = key;
        this.loadFromStorage();
    }
    
    loadFromStorage () {
        this.products = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    };
    
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.products));
    };
    
    updateQuantity(productId, btn) {
        let matchingItem = false;
    
        this.products.forEach(el => {
        if (productId === el.productId) matchingItem = el;
        });

        const selectedQuantity = Number(btn.parentElement.querySelector('select').value);
    
        if (matchingItem) matchingItem.quantity += selectedQuantity;
        else this.products.push({
            productId,
            quantity : selectedQuantity,
            deliveryOptionId: '1'
        });
        this.saveToStorage();
    };
    
    removeItem(buttonId) {

        let newCart = [];
    
        this.products.forEach(i => {
            if (buttonId !== i.productId) newCart.push(i);
        });
    
        this.products = newCart;
    
        this.saveToStorage();
    
    };
    
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingCartItem;
        this.products.forEach(cartItem => {
            if (cartItem.productId === productId) matchingCartItem = cartItem;
        });
    
        matchingCartItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage();
    };
    
    displayQuantity() {
        let quantity = 0
        this.products.forEach(i => quantity += i.quantity);
        this.cartQuantity.innerHTML = quantity;
    };
}

const cart = new Cart('cart');

export { cart }