const authLogin = (req,res) => {
    let enteredUser = req.body.usuario;
    let selectedUser = users.find(user => user.user == enteredUser);
}