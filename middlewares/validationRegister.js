function validationResult (req,res) {
    const email = req.body.email;
    if (users.find(user => user.email === email )){
        return false
    } else {return true}
}

