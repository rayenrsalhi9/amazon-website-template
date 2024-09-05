/* import { updateQuantity, cart } from "../data/cart.js";

describe('test suite : testing function that adds product to cart', () => {

    it ('adds existing product to cart', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        console.log(localStorage.getItem('cart'));

        updateQuantity('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
    });

    it ('adds new product to cart', () => {

    });
}); */

import { updateQuantity, cart } from "../data/cart.js";

describe('test suite : testing function that adds product to cart', () => {

    // Mock product button with a select element for quantity
    const mockButton = () => {
        return {
            dataset: { productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' },
            parentElement: {
                querySelector: () => ({ value: '1' }) // Simulate the select quantity element with value '1'
            }
        };
    };

    beforeEach(() => {
        // Clear and mock the localStorage for each test
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]); // Initially return an empty cart
        });

        spyOn(localStorage, 'setItem').and.callFake(() => {
            // You can add logging here if needed
        });

        // Clear the cart array before each test
        cart.length = 0;
    });

    it ('adds existing product to cart', () => {
        const btn = mockButton();  // Create a mock button with productId

        updateQuantity(btn.dataset.productId, btn);
        expect(cart.length).toEqual(1);   // Cart should now have 1 item
        expect(cart[0].quantity).toEqual(1);  // Quantity should be 1
    });

    it ('adds new product to cart', () => {
        const btn = mockButton(); // Mock the button for a new product

        updateQuantity(btn.dataset.productId, btn);
        expect(cart.length).toEqual(1);   // New product added to cart
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});
