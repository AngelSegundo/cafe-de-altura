
//selectors
let allProducts = document.querySelector(".productCardWrapper")
let containerBuyCart = document.querySelector('.card-items')
let priceTotal = document.querySelector('.price-total')
let numberProduct = document.querySelector('.count-product')
let cleanCarBtn = document.querySelector(".clean")
let item = document.querySelector(".card-items")

// Variables

let shoppingCart = []
let totalCard = 0
let countProduct = 0

// EventListenrs

allProducts.addEventListener('click', addProduct)
containerBuyCart.addEventListener('click', deleteProduct)
item.addEventListener('click', btnAcction)


//Funciones 

function addProduct(e) {
    e.preventDefault()
    if (e.target.classList.contains("addProduct")) {
        const productSelected = (e.target.parentNode).parentNode
        readProcut(productSelected)
    }
}

function readProcut(product) {
    const infoProduct = {
        image: product.querySelector('picture img').src,
        nameProduct: product.querySelector('.productName').textContent,
        price: product.querySelector('.productPrice span').textContent,
        id: product.querySelector('div a').getAttribute('data-id'),
        number: 1,
    }
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
    totalCard = (parseFloat(totalCard) + parseFloat(infoProduct.price)).toFixed(2)
    shoppingCartProducts()
}

function deleteProduct(e) {
    if (e.target.classList.contains("delete-product")) {
        const deleteId = e.target.getAttribute('data-id')
        shoppingCart.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.number)
                totalCard = (totalCard - priceReduce).toFixed(2)
            }
            shoppingCartProducts()
        })
        shoppingCart = shoppingCart.filter(product => product.id !== deleteId)
        countProduct--
    }
    shoppingCartProducts()
}

function shoppingCartProducts() {
    clearHtml()
    shoppingCart.forEach(product => {
        const { image, nameProduct, price, id, number } = product
        const row = document.createElement('div');
        row.classList.add('item');
        let subtotal = number * price
        row.innerHTML = `
        <div>
        <img class="itemImg" src="${image}" alt="">
        </div>
        <div class="item-content">
        <div class="title">
            <h4>${nameProduct}</h4>
            <div class="quantity">
                <h6>Cant.:
                <button class="button-" data-id="${id}">-</button>
                <span>${number}</span>
                <button class="button+" data-id="${id}">+</button>
                </h6>
            </div>
            <button class="delete-product" data-id="${id}">Eliminar</button>
        </div>
    </div>
    <div>
    <h5 class="cart-price">${price}€</h5>
    <h6 class="cart-priceSubTotal">(Subtotal: ${subtotal} €)</h6>
    </div>
            `;
        containerBuyCart.appendChild(row)
        numberProduct.innerHTML = countProduct
        priceTotal.innerHTML = `${totalCard}`

    })
}

function clearHtml() {
    if (shoppingCart.length > 0) {
        containerBuyCart.innerHTML = ''
    } else {
        containerBuyCart.innerHTML = '<h5>Tu cestas de Café de Altura está Vacía</h5>'
    }
}

function btnAcction(e) {
    if (e.target.classList.contains('button+')) {
        const id = e.target.getAttribute('data-id')
        shoppingCart.forEach(producto => {
            if (producto.id === id) {
                producto.number++;
                return producto.number
            }
            console.log(shoppingCart[producto.id]);
            shoppingCartProducts()
        })






        // const nCant = e.target.getAttribute('data-id')
        // console.log(nCant);
        // console.log((e.target).parentNode);
        // shoppingCart.forEach(value => {
        //     const { image, nameProduct, price, id, number } = value
        //     if (value.id = nCant) {
        //         value.number ++
        //         shoppingCartProducts()
        //         totalCard = (parseFloat(totalCard) + parseFloat(value.price)).toFixed(2)
        //     }

        //     // if (value.id == nCant) {
        //     //     number ++
        // });



        // shoppingCart.forEach(value => {
        //     if (value.id == deleteId) {
        //         let priceReduce = parseFloat(value.price) * parseFloat(value.number)
        //         totalCard = (totalCard - priceReduce).toFixed(2)
        //     }
        //     console.log(nCant);
        //const id = e.target.querySelector("div .item").getAttribute('data-id')
        //product.querySelector('div a').getAttribute('data-id'),

    }

}

// if (e.target.classList.contains("delete-product")) {
//     const deleteId = e.target.getAttribute('data-id')
//     shoppingCart.forEach(value => {
//         if (value.id == deleteId) {
//             let priceReduce = parseFloat(value.price) * parseFloat(value.number)
//             totalCard = (totalCard - priceReduce).toFixed(2)
//         }
//         shoppingCartProducts()
//     })


// item.addEventListener
// function addItem(e) {
//     e.preventDefault()
//     if (e.target.classList.contains("addProduct")) {
//         const productSelected = (e.target.parentNode).parentNode
//         readProcut(productSelected)
//     }
// }





function showCart(btn) {
    if (document.getElementById("products-id").style.display == "block") {
        document.getElementById("products-id").style.display = "none"
    } else {
        document.getElementById("products-id").style.display = "block";
    }
}

cleanCarBtn.addEventListener('click', () => {
    shoppingCart = []
    totalCard = 0
    countProduct = 0
    priceTotal.innerHTML = 0
    shoppingCartProducts()
})


function increaseItem() {
    items++;
    quantity.textContent = items;
}

function decreaseItem() {
    if (items > 0) items--;
    quantity.textContent = items;
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

form.addEventListener('submit', formValidation)

// --- --- --- --- --- --- --- ---//

