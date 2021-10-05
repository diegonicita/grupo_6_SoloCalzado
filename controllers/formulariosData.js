const camposLogin = require('./camposLogin');
const camposProductosABM= require('./camposProductosABM');
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
    },
    {
        id: 3,
        titulo: "Crear un Producto",
        campos: camposProductosABM.camposProductoAlta
    },
    {
        id: 4,
        titulo: "Modificar un Producto",
        campos: camposProductosABM.camposProductoModificacion
    },

];

module.exports = formularioData;