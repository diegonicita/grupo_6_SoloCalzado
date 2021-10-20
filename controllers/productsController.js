const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
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
            ...req.body            
        };
        if (req.file == undefined)
        {newProduct.images = "default-image.png";}
        else
        {newProduct.images = req.file.filename; } 

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
        // Busca el producto editado para obtener su imagen previa y su id //
        let selectedProduct = listaProductos.find(product => product.id == id);        
        // crea una variable nueva con datos de selectedProduct y del req.body
        let editedProduct = {
            id: selectedProduct.id,
            ...req.body,
            images: selectedProduct.images         
        };

        editedProduct.size = req.body.size.split(",");

        // si el input type="file" no viene vacio, cambia el nombre del archivo
        if (req.file != undefined)            
            {editedProduct.images = req.file.filename; }        

        let newProducts = listaProductos.map(producto => {
            if(producto.id == selectedProduct.id){
                return producto = editedProduct;
            }
            return producto;
        });
        fs.writeFileSync(productsFilePath,JSON.stringify(newProducts,null,' '));
        listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.redirect('/products');
    },

    destroy: (req,res) => {
        let p = listaProductos.find(producto => producto.id == req.params.id);
        let finalProducts = listaProductos.filter(producto => producto.id != p.id);
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.redirect('/products');
    },

    error: (req, res) => {
        res.send("error");
    },      
}

module.exports = controller;