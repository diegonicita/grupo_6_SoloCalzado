let suma = 0;
let drawer = document.getElementById('drawer');
function changeAmmount(){
    if(e.target.classList.contains('minus')){
        console.log('restar')
    } else {
        console.log('sumar')
    }
}


window.addEventListener ('load',async ()=>{
    let respuesta = await fetch('/api/users/session')
    let data = await respuesta.json()
    let id = data.user.id
    
    
    if (localStorage.getItem('cart')) {
        productsInCart = JSON.parse(localStorage.getItem('cart'));
    
    productsInCart.forEach(
        product => {
            if(product.userId == id){
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
                    SUBTOTAL: ${product.price * product.ammount}
                    <button class="cartRemoveItem">Remove Item</button>
                </div>
            </div>`
            suma += parseInt(product.price * product.ammount);
            drawer.innerHTML += productInCart;
        }
        
    }
    );
drawer.innerHTML += 'TOTAL $ '+ suma

}


let icons = productInCart.querySelectorAll('i');
icons.addEventListener('click',changeAmmount);

})


