let carrito = [];

const prodDisplay = document.getElementById('prodDisplay');

prodDisplay.addEventListener('click', (e) => {
  if (e.target.classList.contains('add')) {
    validateCardProd(e.target.id)
  };
})

const validateCardProd = (productId) => {
  const estaRepetido = carrito.some(product => product.id == productId)

  if (!estaRepetido) {
    const product = products.find(product => product.id == productId)
    product.quantity++
    carrito.push(product)
    renderCartProd(product)
  } else {
    const repProd = carrito.find(product => product.id == productId)
    const quantity = document.getElementById(`cantidad${repProd.id}`)
    repProd.quantity++
    quantity.innerText = `Cantidad: ${repProd.quantity}`
    updateCartTotals(carrito)
  }
}

const renderCartProd = (product) => {
  const contenedor = document.getElementById('cart-container')
  const div = document.createElement('div')
  div.classList.add('prodInCart')
  div.innerHTML = `
    <p>${product.name}</p>
    <p>Precio: $${product.price}</p>
    <p id=cantidad${product.id}>Cantidad: ${product.quantity}</p>
    <button class="btn waves-effect waves-ligth boton-delete" value="${product.id}">X</button>
  `
  contenedor.appendChild(div)
  updateCartTotals(carrito)
}

const updateCartTotals = (carrito) => {
  const totalQuant = carrito.reduce((acc, prod) => acc + prod.quantity, 0)
  const totalPurch = carrito.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0)

  renderCartTotals(totalQuant, totalPurch)
  saveCarritoStorage(carrito)
}

const renderCartTotals = (totalQuant, totalPurch) => {
  const countCarrito = document.getElementById('contador-carrito')
  const totalPrice = document.getElementById('totalPrice')

  countCarrito.innerText = totalQuant
  totalPrice.innerHTML = totalPurch
}

const deleteProd = (productId) => {
  const productIndex = carrito.findIndex(product => product.id == productId)
  carrito.splice(productIndex, 1)
  renderCart(carrito)
  updateCartTotals(carrito)
}

const renderCart = (carrito) => {
  const contenedor = document.getElementById('cart-container')

  contenedor.innerHTML = ''

  carrito.forEach(product => {
    const div = document.createElement('div')
    div.classList.add('prodInCart')
    div.innerHTML = `
      <p>${product.name}</p>
      <p>Precio: $${product.price}</p>
      <p id=cantidad${product.id}>Cantidad: ${product.quantity}</p>
      <button class="btn waves-effect waves-ligth boton-delete" value="${product.id}">X</button>
    `
    contenedor.appendChild(div)
  });
}

const saveCarritoStorage = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

const getCarritoStorage = () => {
  const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
  return carritoStorage
}

if (localStorage.getItem('carrito')) {
  carrito = getCarritoStorage()
  renderCart(carrito)
  updateCartTotals(carrito)
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

openModalBtn.addEventListener("click", openModal);

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);

const paymentButton = document.getElementById('paymentSuccess');
const inputs = document.querySelectorAll('input');


// paymentButton.addEventListener('click', (e) => {
//   if (e.target.classList.contains('add')) {
//     validateCardProd(e.target.id)
//   };
// })



let checkoutForm = document.getElementById('checkout');

checkoutForm.addEventListener('submit',(e) => {
  e.preventDefault();

  let cardNums = document.getElementById("card-nums");
  let cardExp = document.getElementById("card-exp");
  let cardCvv = document.getElementById("card-ccv");
  let userEmail = document.getElementById("userEmail");

  if (!cardNums.value || !cardExp.value || !userEmail.value || !cardCvv.value) {
    Swal.fire({
      title: 'Error!',
      text: 'Completá los datos e intentá nuevamente',
      icon: 'warning',
      confirmButtonText: 'Reintentar'
    });
  } else {
    Swal.fire({
      title: 'Compra confirmada',
      text: 'Compra realizada con éxito. Recibirás información para coordinar el envío',
      icon: 'success',
      confirmButtonText: 'Volver a la tienda'
        })
        closeModal();
        modalCont.classList.toggle('modal-active')
}
});
