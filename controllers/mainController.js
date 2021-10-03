var path = require('path');

const controller = {

    index: (req, res) => {
        return res.render('main/index');
    },

    error: (req, res) => {
        res.send("error");
    },      
}

module.exports = controller;