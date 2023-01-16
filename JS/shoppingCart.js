class ShoppingCart {
    addProduct(e) {
        e.preventDefault();
        if (e.target.classList.contains('addProduct')) {
            const product = e.target.parentElement.parentElement
            this.productInfo(product)
        }
        e.stopPropagation()
    }

    productInfo = (product) => {
        const infoProduc = {
            image: product.querySelector('img').src,
            brand: product.querySelector('a').textContent,
            price: product.querySelector('.productPrice span').textContent,
            id: product.querySelector('a').getAttribute('id'),
            amount: 1,
        }

        let productsLS = this.getProductsLS()

        if (productsLS.hasOwnProperty(infoProduc.id)) {
            infoProduc.amount = productsLS[infoProduc.id].amount + 1
        }

        productsLS[infoProduc.id] = { ...infoProduc }
        localStorage.setItem('products', JSON.stringify(productsLS))
        this.addToCart()
    }

    addToCart() {
        productsList.innerHTML = ''
        let productsLS = this.getProductsLS()
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

        this.getTotal()
    }

    btnAction(e) {
        let productsLS = this.getProductsLS()

        if (e.target.classList.contains('plus')) {
            const product = productsLS[e.target.name]
            product.amount++
            productsLS[e.target.name] = { ...product }
            localStorage.setItem('products', JSON.stringify(productsLS))
            this.readProductsLS()
            return
        }

        if (e.target.classList.contains('minus')) {
            const product = productsLS[e.target.name]
            if (product.amount > 1) {
                product.amount--
            }
            productsLS[e.target.name] = { ...product }
            localStorage.setItem('products', JSON.stringify(productsLS))
            this.readProductsLS()
            return
        }

        e.stopPropagation()
    }

    deleteProduct(e) {
        e.preventDefault()
        if (e.target.classList.contains('delete-product')) {
            let productsLS = this.getProductsLS()

            let product = e.target.parentElement
            let productID = product.querySelector('.delete-product').getAttribute('id')

            e.target.parentElement.remove()

            delete productsLS[productID]
            localStorage.setItem('products', JSON.stringify(productsLS))
            this.readProductsLS()
        }

        this.getTotal()

    }

    clearCart(e) {
        e.preventDefault()
        while (productsList.firstChild) {
            productsList.removeChild(productsList.firstChild)
        }
        localStorage.clear()
        this.readProductsLS()
        this.getTotal()
        return false
    }

    getProductsLS() {
        let productsLS
        if (localStorage.getItem('products') === null) {
            productsLS = {}
        } else {
            productsLS = JSON.parse(localStorage.getItem('products'))
        }
        return productsLS
    }

    readProductsLS() {
        let productsLS = this.getProductsLS()
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

    readProductsLSSuccess() {
        let productsLS = this.getProductsLS()
        productsList.innerHTML = ''
        Object.values(productsLS).forEach(product => {
            const row = document.createElement('div')
            row.classList.add('rowItem')
            row.innerHTML = `
                <div class='cant counter'>
                    <div class="number-input">
                        <p class="addQuantity">${product.amount}</p>
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
                `
            productsList.appendChild(row)
        });
    }

    processOrder(e) {
        e.preventDefault()
        let productsLS = this.getProductsLS()

        if (Object.keys(productsLS).length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cesta está vacia. Agrega algún producto',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            location.href = 'cart.html'
        }
    }

    getTotal() {
        let productLS = this.getProductsLS()

        let nQuantity = Object.values(productLS).reduce((acc, { amount }) => acc + amount, 0)
        let subtotal = Object.values(productLS).reduce((acc, { amount, price }) => acc + amount * price, 0)

        let total = subtotal
        let IVA = parseFloat(total * 0.21).toFixed(2)

        document.querySelector('.nQuantity span').innerHTML = nQuantity
        document.querySelector('.count-product').innerHTML = nQuantity
        document.querySelector('.subtotal span').innerHTML = subtotal
        document.querySelector('.total span').innerHTML = total
        document.querySelector('.iva span').innerHTML = IVA
        this.readProductsLS()
    }


}