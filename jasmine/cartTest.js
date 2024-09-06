import { cart, updateQuantity, loadCartFromStorage } from "../data/cart.js";

describe('test suite: adds products to cart', () => {

    let testContainer;
    let button;
    let selectedValue;

    beforeEach(() => {

        spyOn(localStorage, 'setItem');

        testContainer = document.querySelector('.test-container');
        testContainer.innerHTML = `
            <div class="product-container">
                <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <button class="add-to-cart-button button-primary" data-product-id = "15b6fc6f-327a-4ec4-896f-486349e85a3d">
                    Add to Cart
                </button>
            </div>
        `;
        button = testContainer.querySelector('.add-to-cart-button');
        selectedValue = Number(button.parentElement.querySelector('select').value);
    });

    afterEach(() => {
        testContainer.innerHTML = '';
    });

    it('adds a new product', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadCartFromStorage(); // to restore the expected value of cart in the main file

        updateQuantity('15b6fc6f-327a-4ec4-896f-486349e85a3d', button);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(selectedValue);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));

    });

    it('adds an already existing product to cart', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        
        loadCartFromStorage();

        updateQuantity('15b6fc6f-327a-4ec4-896f-486349e85a3d', button);

        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(1 + selectedValue);
        expect(cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));

    });

});