const compra = new ShoppingCart()
const productsBasket = document.querySelector('.purchase')
const bag = document.querySelector('.productsCards')
const checkoutBtn = document.querySelector('.checkout')
const keepBuyingBtn = document.querySelector('.keepBuying')

cargarEventos()

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.readProductsLSBasket())

    bag.addEventListener('click', (e) => { compra.deleteProduct(e) })

    compra.getTotal()

    checkoutBtn.addEventListener('click', (e) => { checkout(e) })

    keepBuyingBtn.addEventListener('click', (e) => { keepBuying(e) })
}

function checkout(e) {
    e.preventDefault()
    if (compra.getProductsLS().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cesta está vacia. Agrega algún producto',
            showConfirmButton: false,
            timer: 1500,
        }).then(function () { location.href = 'tienda.html' })
    } else {
        location.href = 'checkout.html'
    }
}

function keepBuying(e) {
    e.preventDefault()
    location.href = 'tienda.html'
}

