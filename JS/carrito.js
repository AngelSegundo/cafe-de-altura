class ShoppingCart {
    addProduct(e) {
        e.preventDefault();
        if (e.target.classList.contains('addProduct')) {
            const product = e.target.parentElement.parentElement
            this.productInfo(product)

        }
    }

    productInfo(product) {
        const infoProduc = {
            image: product.querySelector('img').src,
            brand: product.querySelector('a').textContent,
            price: product.querySelector('.productPrice span').textContent,
            id: product.querySelector('a').getAttribute('id'),
            amount: 1,
        }

        let productsLS = this.getProductsLS()
        productsLS.forEach(function (productLS) {
            if (productLS.id === infoProduc.id) {
                productsLS = infoProduc.id
            }
        })

        if (productsLS === infoProduc.id) {
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: 'Oops...',
                text: 'Producto ya se encuentra en la cesta',
                showConfirmButton: false,
                timer: 2000,
            })
        } else {
            this.addToCart(infoProduc)
        }
    }

    addToCart(product) {
        const row = document.createElement('div')
        row.classList.add('rowItem')
        row.innerHTML = `
        <div class='cant'>
                <div class="number-input">
                    <input type="number" class="addQuantity" min="1" value=${product.amount}>
                </div>
            
        </div>
        
        <div>
            <img class="itemImg" src="${product.image}" width=100>
        </div>

        <div class="item-content">
            <div>
                <h4 class="item-title">${product.brand}</h4>
            </div>
            <div>
                <h5 class="cart-price">${product.price}€</h5>
            </div>
        </div>

        <div>
        <p>${product.price * product.amount}</p>
        </div>
                
        <button class="delete-product" id=${product.id}>Eliminar
                `
        productsList.appendChild(row)
        this.saveProductLS(product)
    }

    deleteProduct(e) {
        e.preventDefault()
        let product, productID
        if (e.target.classList.contains('delete-product')) {
            e.target.parentElement.remove()
            product = e.target.parentElement
            productID = product.querySelector('button').getAttribute('id')
        }
        this.deleteProductLS(productID)
        this.getTotal()
    }

    clearCart(e) {
        e.preventDefault()
        while (productsList.firstChild) {
            productsList.removeChild(productsList.firstChild)
        }
        this.clearCartLS()
        return false
    }

    saveProductLS(product) {
        let products
        products = this.getProductsLS()
        products.push(product)
        localStorage.setItem('products', JSON.stringify(products))
    }

    getProductsLS() {
        let productsLS
        if (localStorage.getItem('products') === null) {
            productsLS = []
        } else {
            productsLS = JSON.parse(localStorage.getItem('products'))
        }
        return productsLS
    }

    deleteProductLS(productID) {
        let productsLS = this.getProductsLS()
        productsLS.forEach(function (productLS, index) {
            if (productLS.id === productID) {
                productsLS.splice(index, 1)
            }
        });

        localStorage.setItem('products', JSON.stringify(productsLS))
    }

    readProductsLS() {
        let productsLS = this.getProductsLS()
        productsLS.forEach(function (product) {
            const row = document.createElement('div')
            row.classList.add('rowItem')
            row.innerHTML = `
        <div class='cant'>
                <div class="number-input">
                    <input type="number" class="addQuantity" min="1" value=${product.amount}>
                </div>
            
        </div>
        
        <div>
            <img class="itemImg" src="${product.image}" width=100>
        </div>

        <div class="item-content">
            <div>
                <h4 class="item-title">${product.brand}</h4>
            </div>
            <div>
                <h5 class="cart-price">${product.price}€</h5>
            </div>
        </div>

        <div>
        <p>${product.price * product.amount}</p>
        </div>
                
        <button class="delete-product" id=${product.id}>Eliminar
                `
            productsList.appendChild(row)
        });
    }

    readProductsLSBasket() {
        let productsLS = this.getProductsLS()
        productsLS.forEach(function (product) {
            const row = document.createElement('div')
            row.classList.add('rowItem')
            row.innerHTML = `
        <div class='cant'>
                <div class="number-input">
                    <input type="number" class="addQuantity" min="1" value=${product.amount}>
                </div>
            
        </div>
        
        <div>
            <img class="itemImg" src="${product.image}" width=100>
        </div>

        <div class="item-content">
            <div>
                <h4 class="item-title">${product.brand}</h4>
            </div>
            <div>
                <h5 class="cart-price">${product.price}€</h5>
            </div>
        </div>

        <div>
        <p>${product.price * product.amount}</p>
        </div>
                
        <button class="delete-product" id=${product.id}>Eliminar
                `
            productsBasket.appendChild(row)
        });
    }

    readProductsLSSuccess() {
        let productsLS = this.getProductsLS()
        productsLS.forEach(function (product) {
            const row = document.createElement('div')
            row.classList.add('rowItem')
            row.innerHTML = `
        <div class='cant'>
                <div class="number-input">
                <p>Cantidad:</p>
                <p>${product.amount}</p>
        </div>
            
        </div>
        
        <div>
            <img class="itemImg" src="${product.image}" width=100>
        </div>

        <div class="item-content">
            <div>
                <h4 class="item-title">${product.brand}</h4>
            </div>
            <div>
                <h5 class="cart-price">${product.price}€</h5>
            </div>
        </div>

        <div>
        <p>SubTotal</p>
        <p>${product.price * product.amount}</p>
        </div>
        `
            productsSuccess.appendChild(row)
        });
    }

    clearCartLS() {
        localStorage.clear()
    }

    processOrder(e) {
        e.preventDefault()
        if (this.getProductsLS().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cesta está vacia. Agrega algún producto',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            location.href = 'cesta.html'
        }
    }

    getTotal() {
        let productLS = this.getProductsLS()
        let total = 0, envio = 0, subtotal = 0, IVA = 0
        for (let i = 0; i < productLS.length; i++) {
            let element = Number(productLS[i].price * productLS[i].amount)
            subtotal = subtotal + element
        }

        total = subtotal + envio
        IVA = parseFloat(subtotal * 0.21).toFixed(2)

        document.querySelector('.subtotal span').innerHTML = subtotal
        document.querySelector('.total span').innerHTML = total
        document.querySelector('.iva span').innerHTML = IVA
    }










}