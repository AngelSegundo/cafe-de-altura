const cart = new ShoppingCart()
const bag = document.querySelector('.cart-products')
const products = document.querySelector('.productCardWrapper')
const productsList = document.querySelector('.card-items')
const clearCartBtn = document.querySelector('.clean')
const processOrderBtn = document.querySelector('.processOrder')

cargarEventos()

function cargarEventos() {
    products.addEventListener('click', (e) => { cart.addProduct(e) })

    bag.addEventListener('click', (e) => { cart.deleteProduct(e) })

    clearCartBtn.addEventListener('click', (e) => { cart.clearCart(e) })

    document.addEventListener('DOMContentLoaded', cart.readProductsLS())

    processOrderBtn.addEventListener('click', (e) => { cart.processOrder(e) })

}




