const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsList.json');
let listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {   
    index: (req,res) => { 
        res.render('products/products', {productos: listaProductos,toThousand});
    },

    productDetail: (req, res) => {
        let producto  = listaProductos.find(producto => producto.id == req.params.id);   
        let tab = req.params.tab;     
        res.render('products/productDetail', {producto, tab});
    },

    productCart: (req, res) => {        
        res.render('products/productCart', {listaProductos: listaProductos, toThousand: toThousand});
    },
    
    create: (req, res) => {
        res.render('products/productCreate');
    },
    
    store: (req,res) => {
        let newProduct = {
            id: listaProductos[listaProductos.length - 1].id + 1,
            ...req.body,
            images:req.file.filename
        };
        listaProductos.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(listaProductos, null , ' '))
        res.redirect('/products'); 
    },

    edit: (req, res) => {   
        let id = req.params.id
        let selectedProduct = listaProductos.find(product => product.id == id);
        if (selectedProduct != undefined){
            res.render('products/productEdit',{selectedProduct});
        }
        else {
            res.send('ID not found')
        };
    },

    update: (req,res) => {
        let id = req.params.id;
        let selectedProduct = listaProductos.find(product => product.id == id);

        selectedProduct = {
            id: selectedProduct.id,
            ...req.body,
            images: req.file.filename,
        };
        let newProducts = listaProductos.map(producto => {
            if(producto.id == selectedProduct.id){
                return producto = selectedProduct;
            }
            return producto;
        });
        fs.writeFileSync(productsFilePath,JSON.stringify(newProducts,null,' '));
        listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.redirect('/products');
    },

    destroy: (req,res) => {
        let id = listaProductos.find(producto => producto.id == req.params.id);
        let finalProducts = listaProductos.filter(producto => producto.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        res.redirect('/products');
    },

    error: (req, res) => {
        res.send("error");
    },      
}

module.exports = controller;