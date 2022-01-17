const db = require('../../database/models');
const { Product, Brand, ProductGender, Product_Size_Color, Color, Size} = require('../../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const controller = {
    productList: async(req,res) => {  
        
        promesa1 = Product.findAll(
            {   
                raw: true,
                attributes: ['id', 'title', 'description', 'price'],
                include: [{association: "productgender"}]                
            })
        promesa2 = ProductGender.findAll({raw: true});          
        
        try {       

        [products, generos] = await Promise.all([promesa1, promesa2])                  
        

        // console.log("PRINT: " + products[0]["productgender.id"])
        
        newProducts = products.map( elemento => {
        elemento.detail = "/api/products/" + elemento.id;
        elemento.categories = [];
        elemento.categories.push(elemento["productgender.name"]);
        return elemento;})

        let cuentaGeneros = {};

        for (let i=0; i < generos.length; i++)
        {
        var cuenta = 0;
            try {
            cuenta = await Product.count({
            where: {
                productgender_id: {
                [Op.eq]: generos[i].id
              }
            }
          })} catch(errores) { "errores: " + console.log(errores);}
          cuentaGeneros["Categoria " + generos[i].name] = cuenta;
        }        

        console.log(cuentaGeneros);

        let respuesta = {
            meta: {
                status : 200,
                count: products.length,
                countByCategory: cuentaGeneros,
                url: 'api/products'
            },
            products: newProducts                    
        }
            res.json(respuesta);
        } catch(errores) { 
                console.log("errores create product-size-color: "+errores)
                }
    },

    productDetail: async(req, res) =>  {

    let promesa1 = Product.findByPk(req.params.id,
            { 
                attributes: ['id', 'title', 'description', 'price'],
                include: [{association: "brand"}, {association: "productgender"}, {association: "productsizecolors", require: false}]
            })
    
    try {
    product = await Promise.all([promesa1]); 

    product[0].dataValues.productsizecolors.forEach
        ( 
        item => {delete item.dataValues.product_id}
        )

    // delete product[0].dataValues.productsizecolors[0].dataValues.product_id;

    let respuesta = {
        meta: {
            status : 200,
            count: product.length,
            url: 'api/products/:id'
        },
        product: product
    }
   
//     id: product[0].dataValues.id,
//     title: product[0].dataValues.title,
//     description: product[0].dataValues.description,
//     price: product[0].dataValues.price}
//     gender: product[0].dataValues.productgender.dataValues});
//     brand: product[0].dataValues.brand.dataValues});
//     colors: product[0].dataValues.colors});
//     sizes: product[0].dataValues.sizes});

    res.json(respuesta);
    } catch(errores) { console.log(errores);}

    }
}
module.exports = controller;