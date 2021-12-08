// const path = require('path');
// const formularioData = require('./formulariosData');
const { validationResult } = require('express-validator');
// const fs = require('fs');
// const usersPath = path.join(__dirname,'../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersPath,'utf-8'));
const bcrypt = require('bcryptjs');

//////////////////////////////////
const db = require('../database/models');
const { User } = require('../database/models');
//////////////////////////////////////////////////////

const controller = {

    login: (req, res) => {
        res.render('users/login');
    },
    processLogin: (req,res) => {
        let errors = validationResult(req);	
        let userName = req.body.usuario.trim();        
        
        if (errors.isEmpty()) {
            User.findOne(
                {      
                    where: {name: userName},
                    raw: true,         
                    attributes: ['id', ['name', 'user'], 'email', 'password', 'avatar'] 
                }            )
                  .then(                   
                        u => { 
                            if (u != null) { 
                                console.log("el usuario existe pero falta chequear su contraseña");
                                req.session.userLogged = u;
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
                            else { res.send("el usuario no existe = null ");}
                        })
                  .catch(error => res.send(error)); 
    
                }
                else {                    
                    res.send("errores de validacion");
                }
    },

    register: (req, res) => {
        res.render('users/register');
    },
    processRegister: (req,res) => {

        const userEmail = req.body.email;
        const userName = req.body.user;

        User.findOne(
            {      
                where: {email: userEmail},
                raw: true,         
                attributes: ['id', ['name', 'user'], 'email', 'password', 'avatar'] 
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

        User
        .create(
            {
                name: newUser.user,
                email: newUser.email,
                avatar: newUser.avatar, 
                password: newUser.password               
            }
        )
        .then(()=> {
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