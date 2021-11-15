// Configurando el Servidor //
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const publicPath = path.resolve(__dirname, "./public");
const override = require('method-override');
const validator = require('express-validator');
const session = require('express-session');
const authLogin = require('./middlewares/authLogin');
const cookieParser = require('cookie-parser');


app.use(express.static(publicPath));
app.use(morgan('tiny'));
app.use(session({
	secret:"User session",
	resave: false,
	saveUninitialized: false
}));
app.use(cookieParser());
app.use(authLogin);

app.listen(port, () => console.log('Server Running on port: ' + port));

/* Configursando el método POST para envios de formularios*/
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

/* Configurando OVERRIDE para uso de métodos extra */
app.use(override('_method'));



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

/* PÁGINA 404*/
app.use(function(req,res,next){
	res.status(404).render('main/404');
});
