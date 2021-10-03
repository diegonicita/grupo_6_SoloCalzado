var path = require('path');

const formularioData = require('./formulariosData');
const listaProductos = require('./listaProductos');

const controller = {    

    productDetail: (req, res) => {
        let producto  = listaProductos.find(producto => producto.id == req.params.id);   
        let solapa = req.params.solapa;     
        return res.render('products/productDetail', {producto: producto, solapa: solapa});
    },

    productCart: (req, res) => {        
        return res.render('products/productCart', {listaProductos: listaProductos});
    },
    
    productABM: (req, res) => {        
        
        if (req.params.ABM == "alta"){
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