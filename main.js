
let allProducts = document.querySelector(".productCardWrapper")
let containerBuyCart = document.querySelector('.card-items')
let priceTotal = document.querySelector('.price-total')
let numberProduct = document.querySelector('.count-product')

let shoppingCart = []
let totalCard = 0
let countProduct = 0

//funtions
loadEventListenrs()
function loadEventListenrs() {
    allProducts.addEventListener('click', addProduct)
    containerBuyCart.addEventListener('click', deleteProduct)
}

function addProduct(e) {
    e.preventDefault()
    if (e.target.classList.contains("addProduct")) {
        const productSelected = (e.target.parentNode).parentNode
        readProcut(productSelected)
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains("delete-product")) {
        const deleteId = e.target.getAttribute('data-id')

        shoppingCart.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.number)
                totalCard = totalCard - priceReduce
                totalCard = totalCard.toFixed(2)
            }
        })
        shoppingCart = shoppingCart.filter(product => product.id !== deleteId)
        countProduct--
    }
    shoppingCartProducts()

}


function readProcut(product) {
    const infoProduct = {
        image: product.querySelector('picture img').src,
        nameProduct: product.querySelector('.productName').textContent,
        price: product.querySelector('.productPrice span').textContent,
        id: product.querySelector('div a').getAttribute('data-id'),
        number: 1,
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price)
    totalCard = totalCard.toFixed(2)

    const exist = shoppingCart.some(product => product.id === infoProduct.id);
    if (exist) {
        const newProduct = shoppingCart.map(product => {
            if (product.id === infoProduct.id) {
                product.number++;
                return product;
            } else {
                return product
            }
        });
        shoppingCart = [...newProduct]
    } else {
        shoppingCart = [...shoppingCart, infoProduct]
        countProduct++

    }
    shoppingCartProducts()
}

function shoppingCartProducts() {
    clearHtml()
    shoppingCart.forEach(product => {
        const { image, nameProduct, price, id, number } = product
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${nameProduct}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Cantidad: ${number}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        containerBuyCart.appendChild(row)

        priceTotal.innerHTML = totalCard

        numberProduct.innerHTML = countProduct

    });

}

function clearHtml() {
    containerBuyCart.innerHTML = ''
}


function showCart(x) {
    document.getElementById("products-id").style.display = "block";
}
function closeBtn() {
    document.getElementById("products-id").style.display = "none";
}
