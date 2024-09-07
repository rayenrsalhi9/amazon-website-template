function Cart(localStorageKey) {

    const cart = {

        products: undefined,
    
        loadFromStorage() {
            this.products = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        },
    
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.products));
        },
    
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
            this.saveToLocalStorage();
        },
    
        removeItem(buttonId) {
    
            let newCart = [];
        
            this.products.forEach(i => {
                if (buttonId !== i.productId) newCart.push(i);
            });
        
            this.products = newCart;
        
            this.saveToLocalStorage();
        
        },
    
        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingCartItem;
            this.products.forEach(cartItem => {
                if (cartItem.productId === productId) matchingCartItem = cartItem;
            });
        
            matchingCartItem.deliveryOptionId = deliveryOptionId;
        
            this.saveToLocalStorage();
        },
    
        displayQuantity() {
            let quantity = 0
            this.products.forEach(i => quantity += i.quantity);
            this.cartQuantity.innerHTML = quantity;
        } 
    }

    return cart;
}

const c1 = Cart('c1');
c1.loadFromStorage();

const c2 = Cart('cart');
c2.loadFromStorage();

console.log(c1);
console.log(c2);