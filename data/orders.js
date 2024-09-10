let orders = JSON.parse(localStorage.getItem('orders')) || [];

function addOrder(order) {
    orders.unshift(order);
    saveOrderToStorage();
}

function saveOrderToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export { orders, addOrder }