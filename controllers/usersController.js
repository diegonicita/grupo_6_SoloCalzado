const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { User, UserCategory, UserGender } = require('../database/models');
// const UserCategory = require('../database/models/UserCategory');

const controller = {

    findUserById: async(user_id) =>
    {
        let user = null;        
        try {
            user = await User.findOne(
                {    
                    where: {id: user_id},                      
                    attributes: ['id', 'first_name', 'last_name', 'born_date','username', 'email', 'password', 'avatar', 'usergender_id', 'usercategory_id'],
                    include: [{association: "usercategory"}, {association: "usergender"}]
                })
            return user;
        }
        catch(errores) { 
            console.log("errores: "+errores)
                        }
    },
    login: (req, res) => {
        res.render('users/login');
    },
    processLogin: (req,res) => {
        let errors = validationResult(req);
        let nombre = req.body.usuario.trim();  
        
        if (errors.isEmpty()) {
            User.findOne(
                {    
                    where: {username: nombre},                      
                    attributes: ['id', 'first_name', 'last_name', 'born_date','username', 'email', 'password', 'avatar', 'usergender_id', 'usercategory_id'],
                    include: [{association: "usercategory"}, {association: "usergender"}]
                }            )
                .then(                   
                        u => { 
                            //  console.log(u.toJSON());
                            if (u != null && bcrypt.compareSync(req.body.password,u.password)) 
                            {                                
                                    req.session.userLogged = u;
                                    // console.log(req.session.userLogged.usercategory.dataValues.name);
                                    console.log(req.session.userLogged.usercategory.dataValues.id);
                                    // console.log(u.usercategory.id);
                                    // req.session.levelOne = true;
                                    if (req.body.rememberPassword == "on")
                                    {
                                        res.clearCookie('recordarUsuario');
                                        res.cookie('recordarUsuario', u.id, {maxAge: (1000 * 60) * 2 }); 
                                        console.log("recordando cookie");
                                    }                                     
                                
                                    if (!req.session.returnTo) {res.redirect('/users/profile')} 
                                    else {
                                        res.redirect(req.session.returnTo);
                                        }                            
                            }
                            else {  
                                    //console.log("user no existe o contraseña incorrecta");
                                    res.redirect('/users/login');  
                                 }
                        })
                  .catch(error => res.send(error)); 
    
                }
                else { 
                    console.log(errors.mapped);
                    res.render('users/login',{
                        errors:errors.mapped(),
                        old: req.body });                                         
                }
    },

    register: (req, res) => {
        res.render('users/register');
    },

    processRegister: async (req,res) => {

        const userEmail = req.body.email;
        const userName = req.body.user;

        let user_con_email_existente = null;
        let user_con_username_existente = null;

        try {
        user_con_email_existente = 
                await User.findOne(
                {      
                    where: {email: userEmail},                             
                    attributes: ['id'] 
                }            )            
            } 
            catch(err) { console.log('error: ', err);}

        try {
        user_con_username_existente = 
                await User.findOne(
                {      
                    where: {username: userName},                            
                    attributes: ['id'] 
                }            )            
            } 
            catch(err) { console.log('error: ', err);}

        if (user_con_email_existente != null  || user_con_username_existente != null)
        {
            let errores = { email: {msg : ""}, user: {msg : ""}};             
            if (user_con_email_existente != null) {errores.email.msg = "Email existente"}
            if (user_con_username_existente != null) {errores.user.msg = "Usuario existente"}
            return res.render('users/register', {errors: errores, old: req.body });
            }

        req.body.password = bcrypt.hashSync(req.body.password,10);
        let newUser = {            
            ...req.body            
        }
        if (req.file == undefined){
            newUser.avatar = 'user-placeholder.png'
        } else {
            newUser.avatar = req.file.filename
        }
            newUser.userLevel = 1;
            
    let errors = validationResult(req);	    
    if (errors.isEmpty())
    { 
    
    try {
        let u = await User.create(
            {
                username: newUser.user,
                first_name: newUser.firstName,
                last_name: newUser.lastName,
                email: newUser.email,
                avatar: newUser.avatar, 
                password: newUser.password,
                usergender_id: 1,
                usercategory_id: 1             
            }
        )        
        res.clearCookie('recordarUsuario');
        res.cookie('recordarUsuario', u.dataValues.id, {maxAge: (1000 * 60) * 2 }); 
        res.redirect('/users/profile');
        } catch(err) { console.log('error: ', err);}        
        
    } else {
        res.render('users/register',{
            errors:errors.mapped(),
            old: req.body });
        };
    },

    profile: async (req,res) => {        
        let usuario = null;
        try {
        usuario = await controller.findUserById(req.session.userLogged.id);
        }
        catch(errors) {console.log(errors);}
        res.render('users/account',{
            user: usuario
        })

    },
    adminList: (req,res) => {         
        User.findAll(
            {   
                attributes: ['id', 'first_name', 'last_name', 'born_date','username', 'email', 'password', 'avatar', 'usergender_id', 'usercategory_id'],
                include: [{association: "usercategory"}, {association: "usergender"}]
            })
            .then( (users) => {                
                res.render('users/adminList',{users: users}                
            )})
            .catch(errors => console.log(errors));
    },

    adminEdit: async (req,res) => {
        userId = req.params.id;
        let user = null;
        let categories = null;
        let genders = null
        try {
            user = await User.findByPk(userId,
              {   
                    attributes: ['id', 'first_name', 'last_name', 'born_date','username', 'email', 'password', 'avatar', 'usergender_id', 'usercategory_id'],
                    include: [{association: "usercategory"}, {association: "usergender"}]
              })
            }
            catch(errors) {console.log(errors)};
        try {
            categories = await UserCategory.findAll( {attributes: ['id', 'name']});
            }
            catch(errors) {console.log(errors)};
        try {
            genders = await UserGender.findAll( {attributes: ['id', 'name']});                        
            }
            catch(errors) {console.log(errors)};    

        res.render('users/adminEdit',{user: user, categories, genders});                                      
    },    

    update: async (req,res) => {
        
        let user = null;
        try {
        user = await controller.findUserById(req.session.userLogged.id);
        }
        catch(errors) {console.log(errors);}        
        let newUserImage = "user-placeholder.png";
        if (req.file != undefined) {newUserImage = req.file.filename; }
        let errors = validationResult(req);	    
        if (errors.isEmpty())
        {
            User
        .update(
            {
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                born_date: req.body.bornDate,
                email: req.body.email,
                username: req.body.user,
                password: user.password,
                avatar: newUserImage                              
            },
            {
                where: {id: user.id}
            })
        .then(()=> {
            req.session.userLogged.firstName = req.body.firstName;
            req.session.userLogged.lastName = req.body.lastName;
            req.session.userLogged.bornDate = req.body.bornDate;
            req.session.userLogged.email = req.body.email;
            req.session.userLogged.avatar = newUserImage;
            req.session.userLogged.password = req.body.password;
            return res.redirect('/users/profile')})            
        .catch(error => res.send(error))

        } 
        else {
            res.render('users/account',{
                errors:errors.mapped(),
                old: req.body,
                user }
                );
        }
        
        //res.send('Aca va el codigo para actualizar los datos');
    },

    adminUpdateById: async (req,res) => {   
        let userId = req.params.id;        
        // console.log(req.body);
        let newUserImage = "user-placeholder.png";
        if (req.file != undefined) {newUserImage = req.file.filename; }

        User
        .update(
            {                
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                born_date: req.body.bornDate,
                email: req.body.email,
                username: req.body.user,                
                avatar: newUserImage,
                usercategory_id: req.body.usercategory,                  
                usergender_id: req.body.usergender
            },
            {
                where: {id: userId}
            })
        .then(()=> {
            return res.redirect('/users/list')})            
        .catch(error => res.send(error))

        //res.send('Aca va el codigo para actualizar los datos');
    },
    
    destroy: (req,res) => {       
        let userId = req.params.id;
        if (userId != 1)
        {
        User
        .destroy({where: {id: userId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/users/list')})
        .catch(error => res.send(error)) 
        }
        else {
          res.redirect('/users/list');
        }
    },

    logout: (req,res) => {
        req.session.destroy();
        res.clearCookie('recordarUsuario')
        res.redirect('/');
        // res.clearCookie.recordarUsuario;
    },
    error: (req, res) => {
        res.send("error");
    }
}
module.exports = controller;