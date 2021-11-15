const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname,'../data/users.json');
const users = JSON.parse(fs.readFileSync(usersPath,'utf-8'));

// const userInCookie = users.find(function(user){
//     user.id === req.cookies.recordarUsuario
// })

function authLogin(req,res,next){

    let idInCookie = req.cookies.recordarUsuario;
    let userInCookie = users.find(function(user){
        user.id === idInCookie
    }) 

    if (userInCookie){
        req.session.userLogged = userInCookie
    }

    res.locals.logged = false;
    
    if (req.session && req.session.userLogged) {
          res.locals.logged = true;
      }
      

    next();
}

module.exports = authLogin;