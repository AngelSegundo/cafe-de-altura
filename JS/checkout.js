const compra = new ShoppingCart()
const payAndOrderBtn = document.querySelector('.payAndOrder')

cargarEventos()

function cargarEventos() {
    compra.getTotal()

    payAndOrderBtn.addEventListener('click', (e) => { payAndOrder(e) })
}

function payAndOrder(e) {
    e.preventDefault()
    location.href = 'success.html'
}



