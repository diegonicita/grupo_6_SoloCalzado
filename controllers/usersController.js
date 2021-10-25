let path = require('path');
const formularioData = require('./formulariosData');
const { validationResult } = require('express-validator');
const fs = require('fs');
const usersPath = path.join(__dirname,'../data/users.json');
const users = JSON.parse(fs.readFileSync(usersPath,'utf-8'));

const controller = {

    login: (req, res) => {
        res.render('users/login');
    },
    processLogin: (req,res) => {
        let errors = validationResult(req);	
        if (errors.isEmpty()){
        res.send('Ingresaste!');
        } else {
        res.render('users/login',{errors:errors.mapped()});
        };
    },
    register: (req, res) => {
        res.render('users/register');
    },
    processRegister: (req,res) => {
        let newUser = {
            "id":users.length+1,
            ...req.body
        }
        if (req.file == undefined){
            newUser.avatar = 'user-placeholder.png'
        } else {
            newUser.avatar = req.file.filename
        }
        users.push(newUser);
        fs.writeFileSync(usersPath,JSON.stringify(users,null,' '));
        res.redirect('/login');
    },

    error: (req, res) => {
        res.send("error");
    }
}

module.exports = controller;