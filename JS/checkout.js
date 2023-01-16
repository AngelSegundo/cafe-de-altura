const order = new ShoppingCart()
const payAndOrderBtn = document.querySelector('.payAndOrder')
const shippingAmount = document.querySelector('.shippingAmount')

loadEvents()

function loadEvents() {
    getTotal()

    payAndOrderBtn.addEventListener('click', (e) => { validateForm(e) })
}


function getTotal() {
    let shipping = JSON.parse(localStorage.getItem('shippingAmount'))
    let productLS = JSON.parse(localStorage.getItem('products'))

    let nQuantity = Object.values(productLS).reduce((acc, { amount }) => acc + amount, 0)
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
    document.querySelector('.count-product p').innerHTML = nQuantity
}

//--- --- --- ---  Validacion de Formulario --- --- ---//

function validateForm(e) {

    let choice1 = document.getElementById('choice1').checked
    let choice2 = document.getElementById('choice2').checked
    let choice3 = document.getElementById('choice3').checked
    let nameForm = document.getElementById('nameForm')
    let cardNumber = document.getElementById('cardNumber')
    let expiry = document.getElementById('expiry')
    let cvc = document.getElementById('cvc')


    let adressNameForm = document.getElementById('adressNameForm')
    let adresslastName = document.getElementById('adresslastName')
    let adressPhone = document.getElementById('adressPhone')
    let adressEmail = document.getElementById('adressEmail')
    let adressCountry = document.getElementById('adressCountry')
    let adressPopulation = document.getElementById('adressPopulation')
    let adressCp = document.getElementById('adressCp')
    let adressStreet = document.getElementById('adressStreet')
    let adressStreetNumber = document.getElementById('adressStreetNumber')
    let adressFloor = document.getElementById('adressFloor')
    let adressDoor = document.getElementById('adressDoor')

    if (choice1 || choice2 || choice3) {
        if (choice1) {
            if (!nameForm.value) {
                nameForm.focus()
                Swal.fire({
                    icon: 'info',
                    title: 'Introduce el nombre del TITULAR de la trajeta.',
                    showConfirmButton: false,
                    timer: 1500,
                })
                return
            }
            if (!(cardNumber.value * 1)) {
                cardNumber.focus()
                Swal.fire({
                    icon: 'info',
                    title: 'Formato de NUMERO DE TAREJETA incorrecto.',
                    showConfirmButton: false,
                    timer: 1500,
                })
                return
            }
            if (!(expiry.value)) {
                expiry.focus()
                Swal.fire({
                    icon: 'info',
                    title: 'Introduce la Fecha de caducidad',
                    showConfirmButton: false,
                    timer: 1500,
                })
                return
            }
            if (!(cvc.value * 1)) {
                cvc.focus()
                Swal.fire({
                    icon: 'info',
                    title: 'Formato de CVC incorrecto.',
                    showConfirmButton: false,
                    timer: 1500,
                })
                return
            }

            payAndOrderBtn.disable = false

        } else
            if (choice2) {
                payAndOrderBtn.disable = false
            } else
                if (choice3) {
                    payAndOrderBtn.disable = false
                } else {
                    payAndOrderBtn.disable = true
                    Swal.fire({
                        icon: 'info',
                        title: 'Selecciona método de pago',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    
                }

        if (!adressNameForm.value) {
            adressNameForm.focus()
            Swal.fire({
                icon: 'info',
                title: 'COMPLETA LA DIRECCION DE ENVÍO',
                text: 'Introduce NOMBRE de quien recibirá el pedido',
                showConfirmButton: false,
                timer: 1500,
            })

        }

        if (!adresslastName.value) {
            adresslastName.focus()
            Swal.fire({
                icon: 'info',
                title: 'COMPLETA LA DIRECCION DE ENVÍO',
                text: 'Introduce APELLIDO de quien recibirá el pedido',
                showConfirmButton: false,
                timer: 1500,
            })
            return
        }

        if (!adressPhone.value * 1) {
            adressPhone.focus()
            Swal.fire({
                icon: 'info',
                title: 'COMPLETA LA DIRECCION DE ENVÍO',
                text: 'Formato de NUMERO TELEFONICO incorrecto.',
                showConfirmButton: false,
                timer: 1500,
            })
            return
        }

        if (!adressEmail.value.includes('@')) {
            adressEmail.focus()
            Swal.fire({
                icon: 'info',
                title: 'COMPLETA LA DIRECCION DE ENVÍO',
                text: 'Introduzca una dirección de correo electrónico válida»\n\n(los datos que introdujiste no están en el formato correcto).',
                showConfirmButton: false,
                timer: 2500,
            })
            return
        }

        if (adressCountry.value == 0) {
            adressCountry.focus()
            Swal.fire({
                icon: 'info',
                title: 'COMPLETA LA DIRECCION DE ENVÍO',
                text: 'Selecciona país de envío',
                showConfirmButton: false,
                timer: 2500,
            })
            return
        }

        if (!adressPopulation) {
            adressPopulation.focus()
            Swal.fire({
                icon: 'info',
                title: 'COMPLETA LA DIRECCION DE ENVÍO',
                text: 'Introduce POBLACION ',
                showConfirmButton: false,
                timer: 2500,
            })
            return
        }

        if (!adressCp * 1) {
            adressCp.focus()
            Swal.fire({
                icon: 'info',
                title: 'COMPLETA LA DIRECCION DE ENVÍO',
                text: 'CODIGO POSTAL incorrecto',
                showConfirmButton: false,
                timer: 2500,
            })
            return
        }

        if (!adressStreet) {
            adressStreet.focus()
            Swal.fire({
                icon: 'info',
                title: 'COMPLETA LA DIRECCION DE ENVÍO',
                text: 'Introduce CALLE',
                showConfirmButton: false,
                timer: 2500,
            })
            return
        }

        if (!adressStreetNumber * 1) {
            adressStreetNumber.focus()
            Swal.fire({
                icon: 'info',
                title: 'COMPLETA LA DIRECCION DE ENVÍO',
                text: 'Introduce Número de CALLE',
                showConfirmButton: false,
                timer: 2500,
            })
            return
        }

        if (!adressFloor * 1) {
            adressFloor.focus()
            Swal.fire({
                icon: 'info',
                title: 'COMPLETA LA DIRECCION DE ENVÍO',
                text: 'Introduce PISO',
                showConfirmButton: false,
                timer: 2500,
            })
            return
        }

        if (!adressDoor) {
            adressDoor.focus()
            Swal.fire({
                icon: 'info',
                title: 'COMPLETA LA DIRECCION DE ENVÍO',
                text: 'Introduce PUERTA',
                showConfirmButton: false,
                timer: 2500,
            })
            return
        }

        location.href = 'success.html'
        return
    } else {
        payAndOrderBtn.disable = true
        Swal.fire({
            icon: 'info',
            title: 'Selecciona tipo de ENVÍO',
            showConfirmButton: false,
            timer: 1500,
        })
    }
}



