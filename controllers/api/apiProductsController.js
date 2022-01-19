const db = require("../../database/models");
const {
  Product,
  Brand,
  ProductGender,
  Product_Size_Color,
  Color,
  Size,
} = require("../../database/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const controller = {

    getProductDetail: async(codigo) => {
        let promesa1 = Product.findByPk(codigo, {
          attributes: ["id", "title", "description", "price", "image"],
          include: [{ association: "brand", attributes: ["name"] }, { association: "productgender", attributes: ["name"] }],
        });
        let promesa2 = Product_Size_Color.findAll({
          where: { product_id: codigo },
          attributes: ["id", "stock", "colors.name", "sizes.num"],
          include: [
            { association: "colors", require: false, attributes: ["name"] },
            { association: "sizes", require: false, attributes: ["num"]},
          ],
        });
    
        try {
          product = await Promise.all([promesa1, promesa2]); 
          product[0].image = "/images/products/" + product[0].image;
          let respuesta = {       
            product: product[0],
            stock: product[1],
          };
          return respuesta;
        } catch (errores) {
          console.log(errores);
        }
      },
    

  productList: async (req, res) => {
    promesa1 = Product.findAll({
      raw: true,
      attributes: ["id", "title", "description", "price"],
      include: [
        { association: "productgender", attributes: ["name"] },
        { association: "brand", attributes: ["name"] },
      ],
    });
    promesa2 = ProductGender.findAll({ raw: true });

    try {
      [products, generos] = await Promise.all([promesa1, promesa2]);

      // console.log("PRINT: " + products[0]["productgender.id"])

      newProducts = products.map((elemento) => {
        elemento.detail = "/api/products/" + elemento.id;
        elemento.categories = [];
        elemento.categories.push(elemento["productgender.name"]);
        return elemento;
      });

      let cuentaGeneros = {};

      for (let i = 0; i < generos.length; i++) {
        var cuenta = 0;
        try {
          cuenta = await Product.count({
            where: {
              productgender_id: {
                [Op.eq]: generos[i].id,
              },
            },
          });
        } catch (errores) {
          "errores: " + console.log(errores);
        }
        cuentaGeneros["Categoria " + generos[i].name] = cuenta;
      }

      console.log(cuentaGeneros);

      let respuesta = {
        meta: {
          status: 200,
          count: products.length,
          countByCategory: cuentaGeneros,
          url: "api/products",
        },
        products: newProducts,
      };
      res.json(respuesta);
    } catch (errores) {
      console.log("errores create product-size-color: " + errores);
    }
  },

  productDetail: async (req, res) => {
    let promesa1 = Product.findByPk(req.params.id, {
      attributes: ["id", "title", "description", "price", "image"],
      include: [{ association: "brand", attributes: ["name"] }, { association: "productgender", attributes: ["name"] }],
    });
    let promesa2 = Product_Size_Color.findAll({
      where: { product_id: req.params.id },
      attributes: ["id", "stock", "colors.name", "sizes.num"],
      include: [
        { association: "colors", require: false, attributes: ["name"] },
        { association: "sizes", require: false, attributes: ["num"] },
      ],
    });

    try {
      product = await Promise.all([promesa1, promesa2]);      
      product[0].image = "/images/products/" + product[0].image;
      let respuesta = {
        meta: {
          status: 200,
          count: product.length,
          url: "api/products/:id",
        },
        product: product[0],
        stock: product[1],
      };
      res.json(respuesta);
    } catch (errores) {
      console.log(errores);
    }
  },
  
  lastProductDetail: async (req, res) => {
    promesa1 = Product.findAll({
        raw: true,
        attributes: [
            [Sequelize.fn('MAX', Sequelize.col('id')), "last_id"]
         ]
      });    
  
    try {
        [products] = await Promise.all([promesa1]); 
       
        let resp = "";
        try {
        resp = await controller.getProductDetail(products[0].last_id);
        }
        catch(errores) { console.log(errores)} 
  
        let respuesta = {
          meta: {
            status: 200,
            count: products.length,            
            url: "api/products/last",
          },          
          lastProduct: resp.product,
          stock: resp.stock
        };
        res.json(respuesta);
      } catch (errores) {
        console.log("errores: " + errores);
      }
    },
};
module.exports = controller;
