var path = require('path');
const formularioData = require('./formulariosData');

const controller = {

    login: (req, res) => {
        return res.render('users/login');
    },

    register: (req, res) => {
        return res.render('users/register');
    },

    create: (req,res) => {
        console.log(req.body);
        res.redirect('/login');
    },

    error: (req, res) => {
        res.send("error");
    }
}

module.exports = controller;