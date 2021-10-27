let path = require('path');
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
        let password = req.body.password;
        hashPassword = bcrypt.hashSync(password,10);
        let errors = validationResult(req);	
        if (errors.isEmpty()){
        res.send('Ingresaste!');
        } else {
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
        req.body.password = bcrypt.hashSync(req.body.password,10);
        let newUser = {
            "id":users.length+1,
            ...req.body,
        }
        if (req.file == undefined){
            newUser.avatar = 'user-placeholder.png'
        } else {
            newUser.avatar = req.file.filename
        }
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

    error: (req, res) => {
        res.send("error");
    }
}
module.exports = controller;