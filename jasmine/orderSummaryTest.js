import { renderOrderSummary } from "../scripts/checkout-page/orderSummary.js";
import { cart } from "../data/class-cart.js";
import { generatePayment } from "../scripts/checkout-page/payment.js";
import { fetchBackend } from "../data/products.js";


describe('test suite: renderOrderSummary', () => {

    let testContainer;
    let products;
    let productQuantity2;
    let deleteLink1;

    beforeAll((done) => {
        fetchBackend(() => {
            done();
        });
        
    });

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

        cart.loadFromStorage();
        renderOrderSummary();
    });

    afterEach(() => {
        testContainer.innerHTML = '';
    });

    it ('displays cart on page', () => {
        products = document.querySelectorAll('.cart-item-container');
        expect(products.length).toEqual(2);

        productQuantity2 = document.querySelector('.js-product-quantity-15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(productQuantity2.innerText).toContain('Quantity: 1');

        expect(
            document.querySelector('.js-product-price-15b6fc6f-327a-4ec4-896f-486349e85a3d').innerText
        ).toEqual('$20.95');

        expect(
            document.querySelector('.js-product-name-15b6fc6f-327a-4ec4-896f-486349e85a3d').innerText
        ).toEqual('Intermediate Size Basketball');

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
            cart.products[0].productId
        ).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.products.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        
    });

    it('updates delivery option', () => {

        const deliveryOption3 = document.querySelector('.js-delivery-option-15b6fc6f-327a-4ec4-896f-486349e85a3d-3');

        const input3 = deliveryOption3.querySelector('input');
        
        const input3productId = input3.dataset.productId;
        const input3deliveryId = input3.dataset.deliveryOptionId;

        deliveryOption3.click();

        cart.updateDeliveryOption(input3productId, input3deliveryId);
        renderOrderSummary();
        generatePayment();

        expect(
            cart.products[1].deliveryOptionId
        ).toEqual('3');

        expect(
            cart.products[1].productId
        ).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');

        expect(
            document.querySelector('.payment-summary')
                .querySelector('.js-delivery-cost').innerText
        ).toEqual('$9.99');

        expect(
            document.querySelector('.payment-summary')
        .querySelector('.js-total-no-tax').innerText
        ).toEqual('$52.74');

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart.products));

    });
});