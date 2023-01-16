const order = new ShoppingCart()
const productsList = document.querySelector('.purchase')
const bag = document.querySelector('.bag')
const checkoutBtn = document.querySelector('.checkout')
const keepBuyingBtn = document.querySelector('.keepBuying')
const selectShipping = document.querySelectorAll('input[name="shippingMethod"]')
const shippingAmount = document.querySelector('.shippingAmount')

loadEvents()

function loadEvents() {

    document.addEventListener('DOMContentLoaded', readProductsLS())

    document.addEventListener('DOMContentLoaded', getTotalCart())

    productsList.addEventListener('click', (e) => { btnAction(e) })

    bag.addEventListener('click', (e) => { deleteProduct(e) })

    checkoutBtn.addEventListener('click', (e) => { checkout(e) })

    keepBuyingBtn.addEventListener('click', (e) => { keepBuying(e) })
}

function checkout(e) {
    e.preventDefault()

    let productsLS = JSON.parse(localStorage.getItem('products'))
    let choice1 = document.getElementById('choice1').checked
    let choice2 = document.getElementById('choice2').checked

    if (Object.keys(productsLS).length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cesta está vacia. Agrega algún producto',
            showConfirmButton: false,
            timer: 1500,
        }).then(function () { location.href = 'store.html' })
        return
    } else {
        if (choice1 || choice2) {
            checkoutBtn.disable = false
            location.href = 'checkout.html'
            return
        } else {
            checkoutBtn.disable = true
            Swal.fire({
                icon: 'info',
                title: 'Selecciona tipo de ENVÍO',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }
}

function keepBuying(e) {
    e.preventDefault()
    location.href = 'store.html'
}

function btnAction(e) {
    let productsLS = JSON.parse(localStorage.getItem('products'))

    if (e.target.classList.contains('plus')) {
        const product = productsLS[e.target.name]
        product.amount++
        productsLS[e.target.name] = { ...product }
        localStorage.setItem('products', JSON.stringify(productsLS))
        readProductsLS()
        getTotalCart()
        return
    }

    if (e.target.classList.contains('minus')) {
        const product = productsLS[e.target.name]
        if (product.amount > 1) {
            product.amount--
        }
        productsLS[e.target.name] = { ...product }
        localStorage.setItem('products', JSON.stringify(productsLS))
        readProductsLS()
        getTotalCart()
        return
    }
    e.stopPropagation()
}

function readProductsLS() {
    let productsLS = JSON.parse(localStorage.getItem('products'))
    productsList.innerHTML = ''
    Object.values(productsLS).forEach(product => {
        const row = document.createElement('div')
        row.classList.add('rowItem')
        row.innerHTML = `
        <div class='cant counter'>
            <div class="minus-input">
                <img class="minus" name="${product.id}" src="../assets/img/Vector -.png" alt="">
            </div>
            <div class="number-input">
                <p class="addQuantity">${product.amount}</p>
            </div>
            <div class="plus-input">
                <img class="plus" name="${product.id}" src="../assets/img/Vector +.png" alt="">
            </div>
        </div>
        <div class="coffeBag">
            <img class="itemImg" src="${product.image}" width=100>
        </div>
        <div class="item-content">
            <div>
                <p class="item-title">${product.brand}</p>
                <p class="cart-price">Precio: ${product.price},00€</p>
            </div>
        </div>
        <div class="item-title-details">
            <h3>${product.price * product.amount}.00€</h3>
        </div>
        <input type="image" class="delete-product" id=${product.id} src="../assets/img/delete-lcono.png" height="30" width="30"/>
        `
        productsList.appendChild(row)

    });
}

function deleteProduct(e) {
    e.preventDefault()

    if (e.target.classList.contains('delete-product')) {
        let productsLS = JSON.parse(localStorage.getItem('products'))

        let product = e.target.parentElement
        let productID = product.querySelector('.delete-product').getAttribute('id')

        e.target.parentElement.remove()

        delete productsLS[productID]
        localStorage.setItem('products', JSON.stringify(productsLS))
        this.readProductsLS()
    }

    this.getTotalCart()


}

function getTotalCart() {

    let shipping = 0
    selectShipping.forEach(e => {
        if (e.checked) {
            shipping = e.value * 1
            return shipping
        }
    })
  
    if (shipping > 1) {
        shippingAmount.innerHTML = `${shipping},00€`
    } else {
        shippingAmount.innerHTML = "GRATIS"
    }

    localStorage.setItem('shippingAmount', JSON.stringify(shipping))

    let productLS = JSON.parse(localStorage.getItem('products'))

    let nQuantity = Object.values(productLS).reduce((acc, { amount }) => acc + amount, 0)
    let subtotal = Object.values(productLS).reduce((acc, { amount, price }) => acc + amount * price, 0)

    let total = subtotal + shipping
    let IVA = parseFloat(total * 0.21).toFixed(2)

    document.querySelector('.subtotal span').innerHTML = subtotal
    document.querySelector('.total span').innerHTML = total
    document.querySelector('.iva span').innerHTML = IVA
    document.querySelector('h2 span').innerHTML = nQuantity
    document.querySelector('.count-product p').innerHTML = nQuantity
}


