const fs = require('fs');
const { parse } = require('path');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsList.json');
var listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const formularioData = require('./formulariosData');

let allProductsPath = path.join(__dirname, '../data/productsList.json');
let allProducts = JSON.parse(fs.readFileSync(allProductsPath,'utf-8'));

const controller = {   
    
    index: (req,res) => {
        return res.render('products/products', {productos: listaProductos,toThousand});
    },

    productDetail: (req, res) => {
        let producto  = listaProductos.find(producto => producto.id == req.params.id);   
        let solapa = req.params.solapa;     
        return res.render('products/productDetail', {producto: producto, solapa: solapa});
    },

    productCart: (req, res) => {        
        return res.render('products/productCart', {listaProductos: listaProductos, toThousand: toThousand});
    },
    
    productABM: (req, res) => {        
        
        if (req.params.ABM == "create"){
        return res.render('products/productABM', {listaProductos: listaProductos, formularioData: formularioData[2], editing: false});
        }

        if (req.params.ABM == "modificar"){
        return res.render('products/productABM', {listaProductos: listaProductos, formularioData: formularioData[3], editing: true});
        }       

    },

    error: (req, res) => {
        res.send("error");
    },      
}

module.exports = controller;