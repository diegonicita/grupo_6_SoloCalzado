const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
const { Product, Brand, ProductGender } = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const controller = {   
    index: (req,res) => { 
        var objecto = {};
        objecto.attributes = ['id', 'title', 'description', 'price', 'image', 'brand_id', 'productgender_id'];
        objecto.include = [{association: "brand"}, {association: "productgender"}];
        
        if (req.query.brand)
            objecto.where = { brand_id: req.query.brand } 
        if (req.query.gender)
            objecto.where = { productgender_id: req.query.gender }
        
        if (req.query.search)
        {
        objecto.where = {
                        title: {
                                [Op.like]: '%'+ req.query.search + '%'
                             }
                        }
        }

        Product.findAll( objecto )
              .then(                   
                    p => { 
                    //console.log(p[0].image);                   
                    res.render("products/products", {productos: p, toThousand });
                    })
              .catch(error => res.send(error));
    },

    productDetail: (req, res) => { 
        if (req.params.tab) tab = req.params.tab;
        Product
        .findByPk(req.params.id,
            {   
                 attributes: ['id', 'title', 'description', 'price', 'image', 'brand_id', 'productgender_id'],
                 include: [{association: "brand"}, {association: "productgender"}, {association: "colors"}, {association: "sizes"}]
            })
        .then( p => {   
            if (p != null) {                  
                    //console.log(p.dataValues.colors[0].dataValues);
                    res.render("products/productDetail", {producto: p.dataValues, tab });
            } else {
                res.send("El producto que quieres ver no fue encontrado!");
            }
                    })
        .catch(error => res.send(error));
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
        console.log(req.body)
        let newProductImage = "default-image.png";
        if (req.file != undefined) {newProductImage = req.file.filename; }
        try{ 
            let p = await Product
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
                        console.log("errores: "+errores)}
         


                        return res.redirect('/products')},
                        

    edit: (req, res) => {
        let id = req.params.id;
        let promesa1 = Product.findByPk(id, 
            {                              
                attributes: ['id', 'title', 'description', 'price', 'image', 'brand_id', 'productgender_id'],
                include: [{association: "brand"}, {association: "productgender"}, ]
            });
        let promesa2 = Brand.findAll();
        let promesa3 = ProductGender.findAll();        
        Promise.all([promesa1, promesa2, promesa3])
        .then(([p, brands, genders]) => {
            if (p != null) {
            return res.render('products/productEdit', { selectedProduct: p.dataValues, brands, genders });
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
            return res.redirect('/products')})            
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