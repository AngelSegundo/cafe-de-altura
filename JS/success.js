const order = new ShoppingCart()
const productsList = document.querySelector('.cart-products')
const shippingAmount = document.querySelector('.shippingAmount')
const backToStoreBtn = document.querySelector('.backToStoreBtn')

loadEvents()

function loadEvents() {
    document.addEventListener('DOMContentLoaded', order.readProductsLSSuccess())

    getTotal()

    backToStoreBtn.addEventListener('click', (e) => { backToStore(e) })
}

function backToStore(e) {
    e.preventDefault()
    localStorage.clear()
    location.href = 'store.html'
}

function getTotal() {
    let shipping = JSON.parse(localStorage.getItem('shippingAmount'))
    let productLS = JSON.parse(localStorage.getItem('products'))

    //let nQuantity = Object.values(productLS).reduce((acc, { amount }) => acc + amount, 0)
    let subtotal = Object.values(productLS).reduce((acc, { amount, price }) => acc + amount * price, 0)

    if (shipping > 1) {
        shippingAmount.innerHTML = `${shipping},00€`
    } else {
        shippingAmount.innerHTML = "GRATIS"
    }

    let total = subtotal + shipping
    let IVA = parseFloat(total * 0.21).toFixed(2)

    document.querySelector('.subtotal span').innerHTML = subtotal
    document.querySelector('.total span').innerHTML = total
    document.querySelector('.iva span').innerHTML = IVA
    //document.querySelector('.count-product p').innerHTML = nQuantity
}