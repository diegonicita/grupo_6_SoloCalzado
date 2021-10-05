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
    {   
        id: 7,
        nombre: "registrar",
        label: "SIGUIENTE",
        tipo: "button",            
        subtipo: "button",
        enlace: "/"
    }
    ];

module.exports = camposRegister;