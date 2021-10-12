const camposLogin = require('./camposLogin');
const camposRegister = require('./camposRegister');

const formularioData = [
    {
        id: 1,
        titulo: "Hola! ingresá tu nombre de usuario o email y contraseña para continuar",
        campos: camposLogin       
    },
    {
        id: 2,
        titulo: "Crea tu cuenta gratis",
        campos: camposRegister
    }

];

module.exports = formularioData;