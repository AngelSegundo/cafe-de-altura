const compra = new ShoppingCart()
const productsSuccess = document.querySelector('.productsSuccess')

const backToStoreBtn = document.querySelector('.backToStoreBtn')


cargarEventos()

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.readProductsLSSuccess())

    compra.getTotal()

    backToStoreBtn.parentElement.addEventListener('click', (e) => { backToStore(e) })
}

function backToStore(e) {
    e.preventDefault()
    localStorage.clear()
    location.href = 'tienda.html'
}