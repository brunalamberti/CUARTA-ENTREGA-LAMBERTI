const modalCont = document.querySelector('.modal-container');
const openCart = document.getElementById('cesta-carrito');
const closeCart = document.getElementById('btn-close-cart');
const modalCart = document.querySelector('.modal-cart')

openCart.addEventListener('click', () => {
    modalCont.classList.toggle('modal-active')
});

closeCart.addEventListener('click', () => {
    modalCont.classList.toggle('modal-active')
});

modalCont.addEventListener('click', () => {
    closeCart.click()
});

modalCart.addEventListener('click', (e) => {
    e.stopPropagation()

    if (e.target.classList.contains('boton-delete')) {
        deleteProd(e.target.value)
    }
})