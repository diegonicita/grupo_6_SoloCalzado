const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));
app.use(morgan('tiny'));

app.listen(port, () => console.log('Server Running on port: ' + port));

/* Routes */
var mainRouter = require('./routes/main');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

/* Set Carpeta de views y view Engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*Rutas que vamos a usar */
app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
