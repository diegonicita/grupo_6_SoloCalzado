const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { User } = require('../database/models');

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
                                    req.session.levelOne = true;
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
                    // console.log("errores de validacion");
                    res.redirect('/users/login');                                         
                }
    },

    register: (req, res) => {
        res.render('users/register');
    },

    processRegister: async (req,res) => {

        const userEmail = req.body.email;
        const userName = req.body.user;
        console.log(req.body);

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
               if (user_con_email_existente != null) {errores.email.msg = "email existente"}
               if (user_con_username_existente != null) {errores.user.msg = "usuario existente"}
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
    profile: (req,res) => {        
        res.render('users/account',{
            user: req.session.userLogged
        })

    },
    list: (req,res) => {         
        User.findAll(
            {   
                attributes: ['id', 'first_name', 'last_name', 'born_date','username', 'email', 'password', 'avatar', 'usergender_id', 'usercategory_id'],
                include: [{association: "usercategory"}, {association: "usergender"}]
            })
            .then( (users) => {                
                res.render('users/list',{users: users}                
            )})
            .catch(errors => console.log(errors));
    },

    edit: (req,res) => {   

        userId = req.params.id;

            User.findByPk(userId,
                {   
                    attributes: ['id', 'first_name', 'last_name', 'born_date','username', 'email', 'password', 'avatar', 'usergender_id', 'usercategory_id'],
                    include: [{association: "usercategory"}, {association: "usergender"}]
                })
                .then( (user) => {                
                    res.render('users/edit',{user: user}                
                )})
                .catch(errors => console.log(errors));

    },    

    update: (req,res) => {   
        res.send('Aca va el codigo para actualizar los datos');
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