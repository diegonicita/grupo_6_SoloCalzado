const db = require('../database/models');
const { User } = require('../database/models');
const userController = require('../controllers/usersController');

const authLogin = async(req,res,next) => 
{ 
    let ts = Date.now();    
    let idCookie = req.cookies.recordarUsuario;;
    let user = req.session.userLogged;
    if (user == undefined && idCookie != undefined)
    {
        console.log("user : " + user + " - id in cookie: " + idCookie + " at " + ts);
        try {
        user = await userController.findUserById(idCookie);
            }
        catch(err) { console.log(err);}
        console.log("user in cookie: " + user.username);
        req.session.userLogged = user;
    }

    // let idInCookie = req.cookies.recordarUsuario;    
    // console.log("id in cookie: " + idInCookie + " at " + ts);
    // let userInCookie = null;
    // if (idInCookie != undefined)
    // {
    // userInCookie = await userController.findUserById(idInCookie);
    // console.log("we found an user in a cookie! => " + userInCookie);
    // }   
    
    // if (userInCookie != null){
    //     req.session.userLogged = userInCookie
    // }
    
    res.locals.logged = false;
    res.locals.loggedName = "Profile";
    res.locals.loggedImage = undefined;    
   
    if (req.session && req.session.userLogged != undefined) {
          res.locals.logged = true;
          res.locals.loggedUsername = req.session.userLogged.username;
          res.locals.loggedImage = req.session.userLogged.avatar;
          res.locals.loggedId = req.session.userLogged.id;
      }         
        
    next();
}

module.exports = authLogin;