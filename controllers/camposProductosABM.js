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

const camposProductoAlta = camposProductoABM.slice(0, 6);
camposProductoAlta.push(
        {       
            id: 7,
            nombre: "crearProducto",
            label: "CREAR PRODUCTO",
            tipo: "button",                
            subtipo: "submit",
            enlace: "/"
        }
    );
    
const camposProductoModificacion = camposProductoABM.slice(0, 6);
camposProductoModificacion.push(
        {
            id: 7,
            nombre: "editarProducto",
            label: "GUARDAR MODIFICACION",
            tipo: "button",
            subtipo: "button",
            enlace: "/"
        }
    );

module.exports = {camposProductoModificacion,camposProductoAlta};