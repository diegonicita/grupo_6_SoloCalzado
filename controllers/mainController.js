var path = require('path');

const controller = {

    // Renderiza la pagina principal (index.ejs) que esta en view/main/
    index: (req, res) => {
        return res.render('main/index');
    },

    error: (req, res) => {
        res.send("error");
    },      
}

module.exports = controller;