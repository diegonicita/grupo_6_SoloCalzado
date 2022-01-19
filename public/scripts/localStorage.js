let addToCartBtn = document.querySelector(".add_to_cart");
let productTitle = document.querySelector('.product_title');

let productsInCart = [...JSON.parse(localStorage.getItem('cart'))];

const selectItem = (e)=>{
    let selectedItem = productTitle.dataset.title;
    console.log(selectedItem);
    productsInCart.push(selectedItem);
    localStorage.setItem('cart',JSON.stringify(productsInCart));
}

addToCartBtn.addEventListener('click',selectItem);
