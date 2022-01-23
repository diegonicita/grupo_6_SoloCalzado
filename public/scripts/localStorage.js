let addToCartBtn = document.querySelector(".add_to_cart");
let productTitle = document.querySelector('.product_title');
let productId = document.getElementById('hiddenId').value;

let productsInCart;










if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart','[]')
    productsInCart = JSON.parse(localStorage.getItem('cart'));
}
else {
    productsInCart =  JSON.parse(localStorage.getItem('cart'));
}


const selectItem = async (e)=>{
    let selectedItem; 
    await fetch(`/api/products/${productId}`)
    .then(res => {
        return res.json()
    })
    .then(data => {
        ({id,title,price,image} = data.product);
       
            selectedItem = {
                id,
                title,
                price,
                image,
                ammount: 1
            }
    })
    productsInCart.push(selectedItem);
    let productToAdd = JSON.stringify(productsInCart);
    localStorage.setItem('cart',productToAdd);
    window.location.replace('/products/productCart')
}

productsInCart
console.log(productsInCart.forEach(product => {
    if(product.id == productId){
        console.log('mismo id')
    } else {
        console.log('id nuevo')
    }
}))

addToCartBtn.addEventListener('click',selectItem);
