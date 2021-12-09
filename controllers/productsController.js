const session = require('express-session');
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
let listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// Products Carts y Carts Items //
const cartsFilePath = path.join(__dirname, '../data/carts.json');
const cartsItemsFilePath = path.join(__dirname, '../data/cartsItems.json');
let listaCarts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
let listaCartsItems = JSON.parse(fs.readFileSync(cartsItemsFilePath, 'utf-8'));
//////////////////////////////////
const db = require('../database/models');
const { Product } = require('../database/models');
//////////////////////////////////////////////////////

const controller = {   
    index: (req,res) => { 
        //res.render('products/products', {productos: listaProductos,toThousand});
        Product.findAll(
            {      
                raw: true,         
                attributes: ['id', ['name', 'title'], 'description', 'price', ['image', 'images']] 
            }
        )
              .then(                   
                    p => { 
                    // console.log(p);                   
                    res.render("products/products", {productos: p, toThousand });
                    })
              .catch(error => res.send(error));
    },

    productDetail: (req, res) => {
        // let producto  = listaProductos.find(producto => producto.id == req.params.id);   
        // let tab = "1";
        // if (req.params.tab) tab = req.params.tab;  
        // if (producto) {res.render('products/productDetail', {producto, tab});}
        // else {        
        //     console.log("el producto no existe");
        //     res.status(404).render('main/404');
        // }

        if (req.params.tab) tab = req.params.tab;
        Product.findByPk(req.params.id,
            {      
                raw: true,         
                attributes: ['id', ['name', 'title'], 'description', 'price', ['image', 'images']] 
            }
        )
              .then(                   
                    p => { 
                    // console.log(p);
                    res.render("products/productDetail", {producto: p, tab });
                    })
              .catch(error => res.send(error));
    },    
    
    create: (req, res) => {
        res.render('products/productCreate');
    },
    
    store: (req,res) => {
        // let newProduct = {
        //     id: listaProductos[listaProductos.length - 1].id + 1,
        //     ...req.body            
        // };
        // if (req.file == undefined)
        // {newProduct.images = "default-image.png";}
        // else
        // {newProduct.images = req.file.filename; } 
        // newProduct.size = req.body.size.split(",");
        // listaProductos.push(newProduct);
        // fs.writeFileSync(productsFilePath, JSON.stringify(listaProductos, null , ' '))
        // res.redirect('/products'); 

        let newProductImage = "default-image.png";
        if (req.file != undefined) {newProductImage = req.file.filename; }
        Product
        .create(
            {
                name: req.body.title,
                description: req.body.description,
                price: req.body.price,
                image: newProductImage                
            }
        )
        .then(()=> {
            return res.redirect('/products')})            
        .catch(error => res.send(error))       

    },

    edit: (req, res) => {   
        // let id = req.params.id
        // let selectedProduct = listaProductos.find(product => product.id == id);
        // if (selectedProduct != undefined){
        //     res.render('products/productEdit',{selectedProduct});
        // }
        // else {
        //     res.send('ID not found')
        // };

        let id = req.params.id;        
        Product.findByPk(id, 
            {      
                raw: true,         
                attributes: ['id', ['name', 'title'], 'description', 'price', ['image', 'images']] 
            })
        .then( p => {            
            if (p != null){
                     res.render('products/productEdit',{selectedProduct: p});
                 }
                 else {
                     res.send('ID not found')
                 }
            }                     
            )
        .catch(error => res.send(error))        
    },

    update: (req,res) => {
        // let id = req.params.id;
        // // Busca el producto editado para obtener su imagen previa y su id //
        // let selectedProduct = listaProductos.find(product => product.id == id);        
        // // crea una variable nueva con datos de selectedProduct y del req.body
        // let editedProduct = {
        //     id: selectedProduct.id,
        //     ...req.body,
        //     images: selectedProduct.images         
        // };

        // editedProduct.size = req.body.size.split(",");

        // // si el input type="file" no viene vacio, cambia el nombre del archivo
        // if (req.file != undefined)            
        //     {editedProduct.images = req.file.filename; }        

        // let newProducts = listaProductos.map(producto => {
        //     if(producto.id == selectedProduct.id){
        //         return producto = editedProduct;
        //     }
        //     return producto;
        // });
        // fs.writeFileSync(productsFilePath,JSON.stringify(newProducts,null,' '));
        // listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // res.redirect('/products');

        let productId = req.params.id;
        let newProductImage = "default-image.png";
        if (req.file != undefined) {newProductImage = req.file.filename; }

        Product
        .update(
            {
                name: req.body.title,
                description: req.body.description,
                price: req.body.price,
                image: newProductImage                
            },
            {
                where: {id: productId}
            })
        .then(()=> {
            return res.redirect('/products')})            
        .catch(error => res.send(error))
    },

    destroy: (req,res) => {
        // let p = listaProductos.find(producto => producto.id == req.params.id);
        // let finalProducts = listaProductos.filter(producto => producto.id != p.id);
        // fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        // listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // res.redirect('/products');

        let productId = req.params.id;
        Product
        .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/products')})
        .catch(error => res.send(error)) 
    },

    // Product Carts //

    productCart: (req, res) => {
        // Los usuarios pueden tener carritos de compras en status "Compra Cancelada", "Compra Finalizada" y "Compra Pendiente"
        // Busca un carrito con su compra en status "Compra Pendiente" del usuario logueado //        
        let cart = listaCarts.find( cart => cart.status == "Compra Pendiente" && cart.userId == res.locals.loggedId);  
        // Busca los items del carrito //
        console.log(cart);

        let cartItems = [];
        if (cart) cartItems = listaCartsItems.filter( item => item.carritoId == cart.id);
        console.log(cartItems);
        // Crea una lista de productos usando los items del carrito //
        cartListaProductos = [];        
        for (let i=0; i < cartItems.length; i++)
            {            
            let item = listaProductos.filter( item => item.id == cartItems[i].productoId)            
            cartListaProductos.push(item[0]);
            }
        // Renderiza la lista de productos //
       res.render('products/productCart', {listaProductos: cartListaProductos, toThousand: toThousand});
    },
    productCartAddItem: (req,res) => {
        // Busca un carrito con su compra pendiente del usuario actual //
        let cart = listaCarts.find( cart => cart.status == "Compra Pendiente" && cart.userId == res.locals.loggedId); 
        // Crea el nuevo Item agregandole un id nuevo
        let lastId = 0;
        if (listaCartsItems.length != 0) lastId = listaCartsItems[listaCartsItems.length - 1].id;        
        let newItem = {
            id: lastId + 1,
            carritoId: cart.id,
            productoId: req.body.id
        }; 
        listaCartsItems.push(newItem);
        fs.writeFileSync(cartsItemsFilePath, JSON.stringify(listaCartsItems, null , ' '))
        res.redirect('/products/productCart'); 
    },
    productCartDeleteItem: (req,res) => {        
        let lista = listaCartsItems.filter(producto => producto.productoId != req.body.id);        
        fs.writeFileSync(cartsItemsFilePath, JSON.stringify(lista, null , ' '))
        listaCartsItems = JSON.parse(fs.readFileSync(cartsItemsFilePath, 'utf-8'));
        res.redirect('/products/productCart'); 
    },

    error: (req, res) => {
        res.send("error");
    },      
}

module.exports = controller;