import { cart, updateQuantity, loadCartFromStorage } from "../data/cart.js";

describe('test suite: adds products to cart', () => {

    it('adds a new product', () => {

        spyOn(localStorage, 'setItem');
        // prevent localStorage from modifying localStorage in the main file

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        /* console.log(localStorage.getItem()); // => [] */

        loadCartFromStorage(); // to restore the expected value of cart in the main file

        const testContainer = document.querySelector('.test-container');
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
        const button = testContainer.querySelector('.add-to-cart-button');

        updateQuantity('15b6fc6f-327a-4ec4-896f-486349e85a3d', button);
        expect(cart.length).toEqual(1);
    });

});