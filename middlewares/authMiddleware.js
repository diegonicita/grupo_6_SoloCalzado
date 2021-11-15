function authMiddleware(req,res,next){
    
    if(req.session.userLogged){
        console.log("authMiddleware redirecting to profile")
        res.redirect('/users/profile')
       
    } else {    
    next();
    }
}

module.exports = authMiddleware;