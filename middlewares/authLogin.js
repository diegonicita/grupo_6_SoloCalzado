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
            attributes: ['id', 'first_name', 'last_name', 'username', 'born_date', 'email', 'password', 'avatar', 'usergender_id', 'usercategory_id'],
            include: [{association: "usercategory"}, {association: "usergender"}]
        }            )        
    }   
    
    if (userInCookie != null){
        req.session.userLogged = userInCookie
    }
    
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