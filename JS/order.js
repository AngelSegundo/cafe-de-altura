const cart = new ShoppingCart()
const eraseProduct = document.querySelector('.card-items')
const productsList = document.querySelector('.card-items')
const products = document.querySelector('.productCardWrapper')
const productsRows = document.querySelectorAll('.rowItem')
const clearCartBtn = document.querySelector('.clean')
const processOrderBtn = document.querySelector('.processOrder')


loadEvents()

function loadEvents() {
    
    products.addEventListener('click', (e) => { cart.addProduct(e) })

    productsList.addEventListener('click', (e) => { cart.btnAction(e)})

    eraseProduct.addEventListener('click', (e) => { cart.deleteProduct(e) })

    clearCartBtn.addEventListener('click', (e) => { cart.clearCart(e) })

    document.addEventListener('DOMContentLoaded', cart.readProductsLS())
    
    processOrderBtn.addEventListener('click', (e) => { cart.processOrder(e) })
    
    cart.getTotal()
    

}
