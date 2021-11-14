//const fs = require('fs');
//const path = require('path');
//const usersPath = path.join(__dirname,'../data/users.json');
//const users = JSON.parse(fs.readFileSync(usersPath,'utf-8'));

function guestMiddleware(req,res,next){
    
 //   if(req.cookies.recordarUsuario != undefined){
   //     res.locals.logged = true;
     //   let id = req.cookies.recordarUsuario
       // let selectedUser = users.find(user => user.id == id);
       // req.session.userLogged = selectedUser;
     
   // }        
        
    if(!req.session.userLogged){
        res.redirect('/users/login')
    }
    
    next()
}

module.exports = guestMiddleware;