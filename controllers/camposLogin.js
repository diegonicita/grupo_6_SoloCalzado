const camposLogin = [
    {
    id: 1,
    nombre: "usuario",
    label: "Usuario",
    tipo: "text",
    subtipo: ""
    },
    {
    id: 2,
    nombre: "password",
    label: "Contraseña",
    tipo: "password",
    subtipo: ""
    },
    {
    id: 3,
    nombre: "remember",
    label: "Recordar Contraseña",
    tipo: "checkbox",
    subtipo: ""
    },
    {id: 4,
    nombre: "ingreso",
    label: "INGRESAR",
    tipo: "button",
    subtipo: "button",
    enlace: "/"
    },
    {id: 5,
    nombre: "crearCuenta",
    label: "CREAR CUENTA",
    tipo: "button",
    subtipo: "button",
    enlace: "/users/register"
    },
    {id: 5,
    nombre: "crearProducto",
    label: "CREAR PRODUCTO",
    tipo: "button",
    subtipo: "button",
    enlace: "/products/productABM/alta"
    },
    {id: 7,
    nombre: "modificarProducto",
    label: "MODIFICAR PRODUCTO",
    tipo: "button",
    subtipo: "button",
    enlace: "/products/productABM/modificar"
    },

    ];

module.exports = camposLogin;