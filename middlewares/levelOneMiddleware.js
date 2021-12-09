//const fs = require('fs');
//const path = require('path');
//const usersPath = path.join(__dirname,'../data/users.json');
//const users = JSON.parse(fs.readFileSync(usersPath,'utf-8'));

function levelOneMiddleware(req,res,next){  
           
      //  if(!req.session.levelOne){
      //      console.log("levelMiddleware redirecting to products")
      //              res.redirect('/products');

           
      //  }
      //  else {    
      //  next();
      //  }

      next();
   }
   
   module.exports = levelOneMiddleware;