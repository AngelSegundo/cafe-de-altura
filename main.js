//selectors

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
                <h5 class="cart-price">${price}€</h5>
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
        img.style.transition = "all 0.4s"        
    } else {
        img.style.transform = ''
        img.style.transition = "all .7s"
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

form.addEventListener('submit', formValidation)

// --- --- --- --- --- --- --- ---//

