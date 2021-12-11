const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { User } = require('../database/models');

const controller = {

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
                    attributes: ['id', 'username', 'email', 'password', 'avatar', 'usergender_id', 'usercategory_id'],
                    include: [{association: "usercategory"}, {association: "usergender"}]
                }            )
                  .then(                   
                        u => { 
                            // console.log(u.toJSON());
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
                                    //res.send("user no existe o contraseña incorrecta");
                                    res.redirect('/users/login');  
                                 }
                        })
                  .catch(error => res.send(error)); 
    
                }
                else { 
                    res.redirect('/users/login');                     
                    // res.send("errores de validacion");
                }
    },

    register: (req, res) => {
        res.render('users/register');
    },
    processRegister: async (req,res) => {

        const userEmail = req.body.email;
        const userName = req.body.user;

        await User.findOne(
            {      
                where: {email: userEmail},
                raw: true,         
                attributes: ['id', 'username', 'email', 'password', 'avatar'] 
            }            )
              .then(                   
                    u => {
                        if (u != null)
                        {
                            return res.render('users/register', {
                                errors: {
                                    email: {
                                        msg: 'Email ya existente'
                                    }
                                },
                                old: req.body
                            });
                        }

                    })
              .catch(error => res.send(error));

     
        // if (users.find(u => u.user === userName )){
        //     return res.render('users/register', {
        //         errors: {
        //             user: {
        //                 msg: 'Usuario ya existente'
        //             }
        //         },
        //         old: req.body
        //     });
        // }

        // const username = req.body.user;
        // if (users.find(user => user.user === username)){
        //     return res.render('users/register', {
        //         errors: {
        //         user:{
        //             msg: 'Usuario ya existente'
        //         }
        //     },
        //     old: req.body
        //     });
        // }

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
        if (errors.isEmpty()){        

        await User
        .create(
            {
                username: newUser.user,
                email: newUser.email,
                avatar: newUser.avatar, 
                password: newUser.password,
                usergender_id: 1,
                usercategory_id: 1             
            }
        )
        .then((u)=> {
            res.clearCookie('recordarUsuario');
            res.cookie('recordarUsuario', u.dataValues.id, {maxAge: (1000 * 60) * 2 }); 
            return res.redirect('/users/profile')})            
        .catch(error => res.send(error)) 

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