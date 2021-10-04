const { text } = require("express");

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

const camposRegister = [
        {
        id: 1,
        nombre: "nombre",
        label: "Nombre",
        tipo: "text"
        },
        {
        id: 2,
        nombre: "apellido",
        label: "Apellido",
        tipo: "text"
        },
        {
        id: 3,
        nombre: "email",
        label: "E-mail",
        tipo: "email"
        },
        {
        id: 4,
        nombre: "telefono",
        label: "Telefono",
        tipo: "tel"
        },
        {
        id: 5,
        nombre: "contrasenia",
        label: "Contraseña",
        tipo: "password"
        },
        {
        id: 6,
        nombre: "contraseniarepetida",
        label: "Repite tu contraseña",
        tipo: "password"
        },
        {id: 7,
            nombre: "registrar",
            label: "SIGUIENTE",
            tipo: "button",            
            subtipo: "button",
            enlace: "/"
        }
        ];

const camposProductoABM = [
            {
            id: 0,
            nombre: "codigo",
            label: "Codigo",
            tipo: "text",
            },
            {
            id: 1,
            nombre: "nombre",
            label: "Producto",
            tipo: "text"
            },
            {
            id: 2,
            nombre: "material",
            label: "Material",
            tipo: "text"
            },
            {
            id: 3,
            nombre: "color",
            label: "Color",
            tipo: "text"
            },
            {
            id: 4,
            nombre: "genero",
            label: "Genero",
            tipo: "text"
            },
            {
            id: 5,
            nombre: "talle",
            label: "Talle",
            tipo: "text"
            },
            {
            id: 6,
            nombre: "precio",
            label: "Precio",
            tipo: "text"
            }
            ];

let camposProductoAlta = camposProductoABM.slice(0, 6);
camposProductoAlta.push(
    {  id: 7,
                nombre: "crearProducto",
                label: "CREAR PRODUCTO",
                tipo: "button",                
                subtipo: "submit",
                enlace: "/"
        }
    );
    
let camposProductoModificacion = camposProductoABM.slice(0, 6);
camposProductoModificacion.push(
{
           id: 7,
               nombre: "editarProducto",
               label: "GUARDAR MODIFICACION",
               tipo: "button",
               subtipo: "button",
               enlace: "/"
});
         

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
        campos: camposProductoAlta
    },
    {
        id: 4,
        titulo: "Modificar un Producto",
        campos: camposProductoModificacion
    },

];

module.exports = formularioData;