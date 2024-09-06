import { renderOrderSummary } from "../scripts/checkout-page/orderSummary.js";
import { loadCartFromStorage, cart } from "../data/cart.js";

describe('test suite: renderOrderSummary', () => {

    let testContainer;
    let products;
    let productQuantity2;
    let deleteLink1;

    beforeEach(() => {
        testContainer = document.querySelector('.test-container');
        testContainer.innerHTML = `
        <div class="return-to-home-link"></div>
        <div class="order-summary"></div>
        <div class="payment-summary"></div>
        `;

        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
                }
            ]);
        });

        loadCartFromStorage();
        renderOrderSummary();
    })

    it ('displays cart on page', () => {
        products = document.querySelectorAll('.cart-item-container');
        expect(products.length).toEqual(2);

        productQuantity2 = document.querySelector('.js-product-quantity-15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(productQuantity2.innerText).toContain('Quantity: 1');

        testContainer.innerHTML = '';
    });

    it('deletes a product correctly', () => {
        deleteLink1 = document.querySelector('.js-delete-quantity-link-15b6fc6f-327a-4ec4-896f-486349e85a3d');

        deleteLink1.click();

        expect(
            document.querySelector('.js-15b6fc6f-327a-4ec4-896f-486349e85a3d')
        ).toEqual(null);

        expect(
            document.querySelector('.js-e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        ).not.toEqual(null);

        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(1);

        expect(
            document.querySelector('.js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerText
        ).toContain('Quantity: 2');   
        
        expect(
            cart[0].productId
        ).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        
        testContainer.innerHTML = '';
    });

});