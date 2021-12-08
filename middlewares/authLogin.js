const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname,'../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersPath,'utf-8'));

// const userInCookie = users.find(function(user){
//     user.id === req.cookies.recordarUsuario
// })

const db = require('../database/models');
const { User } = require('../database/models');

const authLogin = async(req,res,next) => 
{ 
    let idInCookie = req.cookies.recordarUsuario;
    let userInCookie = null;
    if (idInCookie != undefined)
    {
    userInCookie = await User.findOne(
        {      
            where: {id: idInCookie},
            raw: true,         
            attributes: ['id', ['name', 'user'], 'email', 'password', 'avatar'] 
        }            )
        .then( u => {return u});
    }
   
    // console.log("cookie: " + idInCookie);
    // let userInCookie = users.find(user => 
    //     user.id == idInCookie
    // ) 
    
    // console.log("User in cookie: " + userInCookie);
    if (userInCookie != null){
        req.session.userLogged = userInCookie
    }

    res.locals.logged = false;
    res.locals.loggedName = "Profile";
    res.locals.loggedImage = undefined;
    
    // console.log("req.session.userLogged: " + req.session.userLogged);
    if (req.session && req.session.userLogged != undefined) {
          res.locals.logged = true;
          res.locals.loggedUsername = req.session.userLogged.user;
          res.locals.loggedImage = req.session.userLogged.avatar;
          res.locals.loggedId = req.session.userLogged.id;
      }      

    // console.log("locals.logged: " + res.locals.logged);
        
    next();
}

module.exports = authLogin;