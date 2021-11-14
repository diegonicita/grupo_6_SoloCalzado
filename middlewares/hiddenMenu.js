const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname,'../data/users.json');
const users = JSON.parse(fs.readFileSync(usersPath,'utf-8'));

function hiddenMenu(req,res,next){

    res.locals.logged = false;
    
    if (req.session && req.session.userLogged) {
          res.locals.logged = true;
      }
  //  if(req.cookies.recordarUsuario != undefined){
  //      res.locals.logged = true;
//    }
    if(req.cookies.recordarUsuario != undefined){
        res.locals.logged = true;
        let id = req.cookies.recordarUsuario
        let selectedUser = users.find(user => user.id == id);
        req.session.userLogged = selectedUser;
     
    } 

    next();
}

module.exports = hiddenMenu;