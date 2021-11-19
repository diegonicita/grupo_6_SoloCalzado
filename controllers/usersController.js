const path = require('path');
const formularioData = require('./formulariosData');
const { validationResult } = require('express-validator');
const fs = require('fs');
const usersPath = path.join(__dirname,'../data/users.json');
const users = JSON.parse(fs.readFileSync(usersPath,'utf-8'));
const bcrypt = require('bcryptjs');

const controller = {

    login: (req, res) => {
        res.render('users/login');
    },
    processLogin: (req,res) => {
        let errors = validationResult(req);	
        let userName = req.body.usuario.trim();
        let userLogin = users.find(user => user.user === userName);
        
        if (errors.isEmpty()) {
            if (userLogin != undefined && bcrypt.compareSync(req.body.password,userLogin.password) === true ) {            
                req.session.userLogged = userLogin;           
                if(userLogin.userLevel == 1){
                    req.session.levelOne = true;
                }
                else if (userLogin.userLevel == 2){
                    req.session.levelTwo = true;
                    
                }

                if (req.body.rememberPassword == "on")
                {
                    res.clearCookie('recordarUsuario');
                    res.cookie('recordarUsuario', userLogin.id, {maxAge: (1000 * 60) * 2 }); 
                    console.log("recordando cookie");
                }            
                res.redirect('/users/profile')
            }
            else if (userLogin != undefined && bcrypt.compareSync(req.body.password,userLogin.password) === false ) {
                console.log('Contraseña incorrecta');
                res.redirect('/users/login');            
            }
            else {
                console.log('usuario no encontrado');
                res.redirect('/users/login');            
            }            
        }
        else {
        res.render('users/login',{
            errors:errors.mapped(),
            old: req.body
        });
        };
    },
    register: (req, res) => {
        res.render('users/register');
    },
    processRegister: (req,res) => {

        const email = req.body.email;
        const userName = req.body.user;
        if (users.find(user => user.email === email )){
           return res.render('users/register', {
               errors: {
                   email: {
                       msg: 'Email ya existente'
                   }
               },
               old: req.body
           });
        }
        if (users.find(u => u.user === userName )){
            return res.render('users/register', {
                errors: {
                    user: {
                        msg: 'Usuario ya existente'
                    }
                },
                old: req.body
            });
        }

        const username = req.body.user;
        if (users.find(user => user.user === username)){
            return res.render('users/register', {
                errors: {
                user:{
                    msg: 'Usuario ya existente'
                }
            },
            old: req.body
            });
        }

        req.body.password = bcrypt.hashSync(req.body.password,10);
        let newUser = {
            "id":users.length+1,
            ...req.body
            
        }
        if (req.file == undefined){
            newUser.avatar = 'user-placeholder.png'
        } else {
            newUser.avatar = req.file.filename
        }
            newUser.userLevel = 0;
            
        let errors = validationResult(req);	
        if (errors.isEmpty()){
        users.push(newUser);
        fs.writeFileSync(usersPath,JSON.stringify(users,null,' '));
        res.redirect('/users/login');
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