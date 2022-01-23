
let drawer = document.getElementById('drawer');


window.addEventListener('load',()=>{
    if (localStorage.getItem('cart')) {
        productsInCart = JSON.parse(localStorage.getItem('cart'));
    
    productsInCart.forEach(
        product => {
            let productInCart = `<div>
            <p>${product.id}</p>
            <p>${product.title}</p>
            <p>${product.price}</p>
            <img src="${product.image}">
            <div>TOTAL: ${product.price * product.ammount}</div>
            </div>`
            drawer.innerHTML += productInCart;
        }
    );
}
})
