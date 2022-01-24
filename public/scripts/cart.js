
let drawer = document.getElementById('drawer');
function changeAmmount(){
    if(e.target.classList.contains('minus')){
        console.log('restar')
    } else {
        console.log('sumar')
    }
}


window.addEventListener('load',()=>{
    if (localStorage.getItem('cart')) {
        productsInCart = JSON.parse(localStorage.getItem('cart'));
    
    productsInCart.forEach(
        product => {
            let productInCart = `<div class="cartProduct">
            <div class="cartProductContent">
                    <p>${product.title}</p>
                    <p>$${product.price}</p>
                    <img src="${product.image}">
                    <div class="cartProductControls">
                        <i class="fas fa-minus"></i>
                        <i class="fas fa-plus"></i>
                    </div>
            </div>
                <div class="cartProductTotal">
                    TOTAL: ${product.price * product.ammount}
                    <button class="cartRemoveItem">Remove Item</button>
                </div>
            </div>`
            drawer.innerHTML += productInCart;
        }
    );
}

let icons = productInCart.querySelectorAll('i');
icons.addEventListener('click',changeAmmount);

})


