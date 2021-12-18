function userLevelAuthMiddleware(options)
{     
  return function(req, res, next) 
  {

      // Niveles de Usuarios: user_category = de 1 a 3
      // usuario comun = 1
      // usuario avanzado = 2
      // administrador = 3
      
      // console.log(req.session.userLogged.usercategory.id);

        if(req.session.userLogged.usercategory.id == options.level) {
          next();  
        }
        else {    
          console.log(" Usuario no autorizado - redirecting to main")
          res.redirect('/');          
          }      
  }
}

module.exports = userLevelAuthMiddleware;
      
