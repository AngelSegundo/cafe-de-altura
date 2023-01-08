
// //--- --- --- --- Globals Selectors --- --- --- --- //

// let containerBuyCart = document.querySelector('.card-items')

// let processOrder = document.querySelector('.processOrder').addEventListener('click', placeOrder)
// let clearBtn = document.querySelector('.clean').addEventListener('click', clearOrder)

// const addButtons = document.querySelectorAll('.addProduct');
// addButtons.forEach((addToCartButton) => {
//     addToCartButton.addEventListener('click', addToCart);
// })


// // --- --- --- --- Function --- --- --- --- //

// function addToCart(e) {
//     const button = e.target
//     const item = button.closest('.productCard')

//     const itemName = item.querySelector('div .productName').textContent
//     const itemPrice = item.querySelector('span').textContent
//     const itemImg = item.querySelector('.productImg img').src

//     addProduct(itemName, itemPrice, itemImg)
// }

// function addProduct(itemName, itemPrice, itemImg) {
//     const duplicated = containerBuyCart.getElementsByClassName('item-title')
//     for (let i = 0; i < duplicated.length; i++) {
//         if (duplicated[i].innerText === itemName) {
//             let productQuantity = duplicated[i].parentElement.querySelector('.addQuantity')
//             productQuantity.value++
//             upShoppingTotal()
//             return
//         }
//     }

//     const row = document.createElement('div')
//     row.classList.add('rowItem');
//     const rowContent = `
//         <div>
//             <img class="itemImg" src="${itemImg}" alt="">
//         </div>
//         <div class="item-content">
//             <div>
//                 <h4 class="item-title">${itemName}</h4>
//                     <div class='cant'>
//                         <h6>Cant.:
//                         <div class="number-input">
//                             <input class="addQuantity" min="1" value="1" type="number" size="10000">
//                         </div>
//                         </h6>
//                     </div>
//             </div>
//             <div>
//                 <h5 class="cart-price">${itemPrice}€</h5>
//             </div>
//         </div>
//         </div>
//         <button class="delete-product">
//                     <p>Eliminar</p>


//     </div>

//                     `
//     row.innerHTML = rowContent
//     containerBuyCart.append(row)

//     row.querySelector('.delete-product').addEventListener('click', deleteProduct)
//     row.querySelector('.addQuantity').addEventListener('change', quantityChanged)

//     upShoppingTotal()
// }

// function upShoppingTotal() {
//     let total = 0
//     let counter = 0
//     let priceTotal = document.querySelector('.price-total')

//     const carItem = document.querySelectorAll('.rowItem')

//     carItem.forEach(item => {
//         const itemPriceProduct = item.querySelector('.cart-price')
//         const itemPrice = Number(itemPriceProduct.textContent.replace('€', ''))

//         const itemQuantityProduct = item.querySelector('.addQuantity')
//         const itemQuantity = Number(itemQuantityProduct.value)

//         total = total + (itemPrice * itemQuantity)
//     })

//     priceTotal.innerHTML = `${total.toFixed(2)}`
// }

// function deleteProduct(e) {
//     const deleteItem = e.target
//     deleteItem.closest('.rowItem').remove()
//     upShoppingTotal()
// }

// function quantityChanged(e) {
//     const inputNumber = e.target
//     if (inputNumber.value <= 0) {
//         inputNumber.value = 1
//     }
//     upShoppingTotal()
// }

// function placeOrder() {
//     alert('Su proceso de compra ha iniciado!')
//     containerBuyCart.innerHTML = ''
//     upShoppingTotal()
//     return
// }


// function clearOrder() {
//     containerBuyCart.innerHTML = ''
//     upShoppingTotal()

// }

// function showCart() {
//     if (document.getElementById("products-id").style.display == "block") {
//         document.getElementById("products-id").style.display = "none"
//     } else {
//         document.getElementById("products-id").style.display = "block";
//     }
// }

// function closeBtn() {
//     document.getElementById("products-id").style.display = "none";
// }

// function clearHtml() {
//     if (containerBuyCart.innerHTML === '<h5>Tu cestas de Café de Altura está Vacía</h5>') {
//         return
//     } else {
//         alert('Su proceso de compra ha iniciado!')
//         containerBuyCart.innerHTML = '\n<h5>Tu cestas de Café de Altura está Vacía</h5>'
//         upShoppingTotal()
//         return
//     }
// }


// --- --- --- Productos--- --- --- --- ---//

fetch('https://cafe-de-altura-api.vercel.app/api/products')
    .then(response => response.json())
    .then(response => {
        response.products.forEach(product => {
            let article = document.createElement('article')
            article.setAttribute('class', 'productCard')
            document.querySelector('.productCardWrapper').appendChild(article)
            article.innerHTML = `
            <picture class="productImg">
                         <img src="${product.img_url}" alt="Coffee Bag">
                     </picture>
                     <div class="productInfo">
                         <a class="productName" href="" id="${product._id}">${product.brand}</a>
                         <p class="productPrice"><span class="Price">${product.price}</span>€</p>
                     </div>
                     <div class="productButton">
                         <button class="addProduct" onclick="showCart2()">Añadir</button>
                     </div>
                      `
        });
    })

function showCart() {
    if (document.getElementById("products-id").style.display == "block") {
        document.getElementById("products-id").style.display = "none"
    } else {
        document.getElementById("products-id").style.display = "block";
    }
}

function closeBtn() {
    document.getElementById("products-id").style.display = "none";
}

function showCart2() {
    if (document.getElementById("products-id").style.display === "none") {
        document.getElementById("products-id").style.display = "block"
    }
}


