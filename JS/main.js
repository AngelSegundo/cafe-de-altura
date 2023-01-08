
// --- --- --- --- Globals Selectors --- --- --- --- //

let containerBuyCart = document.querySelector('.card-items')

let processOrder = document.querySelector('.processOrder').addEventListener('click', placeOrder)
let clearBtn = document.querySelector('.clean').addEventListener('click', clearOrder)

const addButtons = document.querySelectorAll('.addProduct');
addButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCart);
})


// --- --- --- --- Function --- --- --- --- //

function addToCart(e) {
    const button = e.target
    const item = button.closest('.productCard')

    const itemName = item.querySelector('div .productName').textContent
  
    const itemPrice = item.querySelector('span').textContent
    const itemImg = item.querySelector('.productImg img').src

    addProduct(itemName, itemPrice, itemImg)
}

function addProduct(itemName, itemPrice, itemImg) {
    const duplicated = containerBuyCart.getElementsByClassName('item-title')
    for (let i = 0; i < duplicated.length; i++) {
        if (duplicated[i].innerText === itemName) {
            let productQuantity = duplicated[i].parentElement.querySelector('.addQuantity')
            productQuantity.value++
            upShoppingTotal()
            return
        }
    }

    const row = document.createElement('div')
    row.classList.add('rowItem');
    const rowContent = `
        <div>
            <img class="itemImg" src="${itemImg}" alt="">
        </div>
        <div class="item-content">
            <div>
                <h4 class="item-title">${itemName}</h4>
                    <div class='cant'>
                        <h6>Cant.:
                        <div class="number-input">
                            <input class="addQuantity" min="1" value="1" type="number" size="10000">
                        </div>
                        </h6>
                    </div>
            </div>
            <div>
                <h5 class="cart-price">${itemPrice}€</h5>
            </div>
        </div>
        </div>
        <button class="delete-product">
                    <p>Eliminar</p>
        
        
    </div>
    
                    `
    row.innerHTML = rowContent
    containerBuyCart.append(row)

    row.querySelector('.delete-product').addEventListener('click', deleteProduct)
    row.querySelector('.addQuantity').addEventListener('change', quantityChanged)

    upShoppingTotal()
}

function upShoppingTotal() {
    let total = 0
    let counter = 0
    let priceTotal = document.querySelector('.price-total')

    const carItem = document.querySelectorAll('.rowItem')

    carItem.forEach(item => {
        const itemPriceProduct = item.querySelector('.cart-price')
        const itemPrice = Number(itemPriceProduct.textContent.replace('€', ''))

        const itemQuantityProduct = item.querySelector('.addQuantity')
        const itemQuantity = Number(itemQuantityProduct.value)

        total = total + (itemPrice * itemQuantity)
    })

    priceTotal.innerHTML = `${total.toFixed(2)}`
}

function deleteProduct(e) {
    const deleteItem = e.target
    deleteItem.closest('.rowItem').remove()
    upShoppingTotal()
}

function quantityChanged(e) {
    const inputNumber = e.target
    if (inputNumber.value <= 0) {
        inputNumber.value = 1
    }
    upShoppingTotal()
}

function placeOrder() {
        alert('Su proceso de compra ha iniciado!')
        containerBuyCart.innerHTML = ''
        upShoppingTotal()
        return
    }


function clearOrder() {
    containerBuyCart.innerHTML = ''
    upShoppingTotal()

}

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
    if (document.getElementById("products-id").style.display == "none") {
        document.getElementById("products-id").style.display = "block"
    }
}

function clearHtml() {
    if (containerBuyCart.innerHTML === '<h5>Tu cestas de Café de Altura está Vacía</h5>') {
        return
    } else {
        alert('Su proceso de compra ha iniciado!')
        containerBuyCart.innerHTML = '\n<h5>Tu cestas de Café de Altura está Vacía</h5>'
        upShoppingTotal()
        return
    }
}



//--- --- --- ---  Desplegable de Preguntas y Respuestas --- --- ---//

const questions = document.querySelectorAll(".infoFAQ")
const answer = document.querySelectorAll(".answer")
const chevronup = document.querySelectorAll('.chevronup img')

questions.forEach((question, key) => {
    question.addEventListener("click", () => {
        answer[key].classList.toggle("open_close")
        rotate(chevronup[key])
    })
})

const rotate = (img) => {
    if (img.style.transform === '') {
        img.style.transform = 'rotate(180deg)'
        img.style.transition = "0.4s"
    } else {
        img.style.transform = ''
        img.style.transition = ".3s"
    }
}

// --- --- --- --- //


//--- --- --- ---  Validacion de Formulario --- --- ---//

let form = document.querySelector('#form')
let nameInput = document.querySelector('#NameForm')
let emailInput = document.getElementById('emailForm')
let phoneInput = document.getElementById('phoneForm')
let textArea = document.querySelector('#textArea1')
let checker = document.getElementById('checker')

const formValidation = (e) => {
    e.preventDefault()
    if (!nameInput.value) {
        alert('Por favor, introduce tu nombre.')
        nameInput.focus()
        return
    }

    if (!emailInput.value.includes('@')) {
        alert('«Introduzca una dirección de correo electrónico válida»\n\n(los datos que introdujiste no están en el formato correcto).')
        emailInput.focus()
        return
    }

    if (!(phoneInput.value * 1)) {
        alert('Formato de TELEFONO incorrecto')
        phoneInput.focus()
        return
    }

    if (textArea.value == "") {
        alert('\n¿En qué podemos ayudarte?\n\nEnvianos un comentario')
        textArea.focus()
        return
    }

    if (!checker.checked) {
        let aceptar = confirm('Aceptas la Politica de Privacidad y los Terminos y condiciones?')
        if (aceptar) {
            checker.checked = true
        } else {
            alert('Es necesario aceptar.')
        }
        return
    }

    alert('El boton ENVIAR está funcionando')
}

//form.addEventListener('submit', formValidation)

// --- --- --- --- --- --- --- ---//

