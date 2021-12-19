const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
const { Product, Brand, ProductGender, Product_Size_Color, Color, Size} = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const controller = {   
    index: (req,res) => { 
        var object = {};
        object.attributes = ['id', 'title', 'description', 'price', 'image', 'brand_id', 'productgender_id'];
        object.include = [{association: "brand"}, {association: "productgender"}, {association: "colors"}, {association: "sizes"}];
        
        if (req.query.brand)
            object.where = { brand_id: req.query.brand } 
        if (req.query.gender)
            object.where = { productgender_id: req.query.gender }
        
        if (req.query.search)
        {
        object.where = {
                        title: {
                                [Op.like]: '%'+ req.query.search + '%'
                             }
                        }
        }

        Product.findAll( object )
              .then(                   
                    p => { 
                    //console.log(p[0].image);                   
                    res.render("products/products", {productos: p, toThousand });
                    })
              .catch(error => res.send(error));
    },

    productDetail: (req, res) => { 
        if (req.params.tab) tab = req.params.tab;
        let promesa1 = Color.findAll()
        let promesa2 = Size.findAll()
        let promesa3 = Product.findByPk(req.params.id,
        {   
             attributes: ['id', 'title', 'description', 'price', 'image', 'brand_id', 'productgender_id'],
             include: [{association: "brand"}, {association: "productgender"}, {association: "colors"}, {association: "sizes"},{association: "productsizecolors", require: false}]
        }) 
        Promise.all([promesa1, promesa2, promesa3])
        .then(([colors,sizes,p]) => {
            if (p != null) {               
            return res.render('products/productDetail', { producto: p.dataValues, colors, sizes });
            } else 
            {
            return res.send('El producto que quiere visualizar no fue encontrado!')
            }
                                        })
        .catch(error => {console.log("error:" + error)}); 
        },    
    
    create: (req, res) => {
        Brand
        .findAll()
        .then(brands => {
            ProductGender
                .findAll()
                .then(genders => {
                    return res.render('products/productCreate', { brands, genders });
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));        
    },
    
    store: async (req,res) => {      
        // console.log(req.body)
        let newProductImage = "default-image.png";
        if (req.file != undefined) {newProductImage = req.file.filename; }
        
        var newProduct = null;

        try{ 
            newProduct= await Product
        .create(
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                image: newProductImage,
                productgender_id: req.body.gender,
                brand_id: req.body.brand                
            }
        )}
        catch(errores) { 
                        console.log("errores create product: "+errores)
                    }      

        controller.createSizesAndColors(req.body, newProduct.id, 10);        
         
    return res.redirect('/products')},
                        

    edit: (req, res) => {
        let id = req.params.id;
        let promesa1 = Product.findByPk(id, 
            {                              
                attributes: ['id', 'title', 'description', 'price', 'image', 'brand_id', 'productgender_id'],
                include: [{association: "brand"}, {association: "productgender"}, {association: "colors"}, {association: "sizes"}]
            });
        let promesa2 = Brand.findAll();
        let promesa3 = ProductGender.findAll();   
        let promesa4 = Color.findAll();
        let promesa5 = Size.findAll();     
        Promise.all([promesa1, promesa2, promesa3, promesa4, promesa5])
        .then(([p, brands, genders, colors, sizes]) => {
            if (p != null) {               
            return res.render('products/productEdit', { selectedProduct: p.dataValues, brands, genders, colors, sizes });
            } else 
            {
            return res.send('El producto que quiere Editar no fue encontrado!')
            }
                                        })
        .catch(error => {console.log("error:" + error)});        
    },

    update: (req,res) => {        

        let productId = req.params.id;
        let newProductImage = "default-image.png";
        if (req.file != undefined) {newProductImage = req.file.filename; }

        Product
        .update(
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                image: newProductImage,     
                productgender_id: req.body.gender,
                brand_id: req.body.brand               
            },
            {
                where: {id: productId}
            })
        .then(()=> {
            
            Product_Size_Color
            .destroy({where: {product_id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
            .then(()=>{
                controller.createSizesAndColors(req.body, productId, 10);  
                return res.redirect('/products')})
            .catch(error => res.send(error)) 

            // return res.redirect('/products')
               
        })            
        .catch(error => res.send(error))
    },
    
    destroy: (req,res) => {
       
        let productId = req.params.id;
        Product
        .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/products')})
        .catch(error => res.send(error)) 
    },

    // Funciones //
    reqBodyVariarableToArray: function(variable) {        
        let arreglo = [];
        if (Array.isArray(variable))
        {
            arreglo = [...variable];
        }
        else {
            arreglo.push(variable);
        }        
        return arreglo;
    },

    createSizesAndColors: async (myReqBody, newProductId,stock) => {
        var newProductSizeColor = null;
        let talles = controller.reqBodyVariarableToArray(myReqBody.size);
        let colores = controller.reqBodyVariarableToArray(myReqBody.color);
        if (talles.length > 0 && colores.length > 0)
        {
            colores.forEach
            ( color => {
            talles.forEach( async talle => {

                try{ 
                    newProductSizeColor = await Product_Size_Color
                .create(
                    {
                        size_id: talle,
                        product_id: newProductId,            
                        color_id: color,
                        stock: stock                        
                    }
                )}
                catch(errores) { 
                                console.log("errores create product-size-color: "+errores)
                                }
                }) 
                    }        
            ) 
        } else { return res.send('no se puede crear un producto sin talles o colores')} 


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