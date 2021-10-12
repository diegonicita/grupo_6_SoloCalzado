// Configurando el Servidor //
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const publicPath = path.resolve(__dirname, "./public");
const override = require('method-override')

app.use(express.static(publicPath));
app.use(morgan('tiny'));
app.listen(port, () => console.log('Server Running on port: ' + port));

// Require de nuestros archivos con las rutas //
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

/* Motor de Templates EJS para tener paginas dinamicas */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Rutas que vamos a usar */
app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

/* Configursando el método POST para envios de formularios*/
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

/* Configurando OVERRIDE para uso de métodos extra */
app.use(override('_method'));
