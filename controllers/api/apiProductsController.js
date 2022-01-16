const db = require('../../database/models');
const { Product, Brand, ProductGender, Product_Size_Color, Color, Size} = require('../../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const controller = {
    productList: async(req,res) => {  
        
        promesa1 = Product.findAll(
            {   
                raw: true,
                attributes: ['id', 'title', 'description', 'price']                
            })
        promesa2 = ProductGender.findAll({raw: true});          
        
        try {       

        [products, generos] = await Promise.all([promesa1, promesa2])                  
                
        newProducts = products.map( elemento => {
        elemento.detail = "/api/products/" + elemento.id;
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
          })} catch(errores) { console.log(errores);}
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
    }
}
module.exports = controller;