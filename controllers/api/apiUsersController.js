const db = require('../../database/models');
const { User, UserCategory, UserGender } = require('../../database/models');

const controller = {
    userList: (req,res) => {         
        User.findAll(
            {   
                raw: true,
                attributes: ['id', 'first_name', 'last_name', 'email']                
            })
            .then( (users) => {                
                newUsers = users.map( elemento => {
                    elemento.name = elemento.first_name + " " + elemento.last_name;
                    delete elemento.first_name;
                    delete elemento.last_name;
                    elemento.detail = "/api/users/" + elemento.id;
                    return elemento;
                })

                let respuesta = {
                    meta: {
                        status : 200,
                        count: users.length,
                        url: 'api/users'
                    },
                    users: newUsers                    
                }
                    res.json(respuesta);
                  
            })
            .catch(errors => console.log(errors));
    },
    userDetails: (req,res) => {  

        let promesa = User.findByPk(req.params.id,
            {                   
                attributes: ['id', 'first_name', 'last_name', 'born_date','username', 'email', 'password', 'avatar', 'usergender_id', 'usercategory_id'],
                include: [{association: "usercategory"}, {association: "usergender"}]                   
                
            })
            Promise.all([promesa])
            .then( (user) => {                                                  
                    
                let respuesta = {
                    meta: {
                        status : 200,
                        url: 'api/users/' + req.params.id
                    },
                    user: {
                        id: user[0].id,
                        first_name: user[0].first_name,
                        last_name: user[0].last_name,
                        username: user[0].username,
                        born_date: user[0].born_date,
                        avatar: "/images/avatars/" + user[0].avatar,
                        email: user[0].email,                        
                        genre: user[0].usergender.name                        
                    }
                }
                    res.json(respuesta);
                  
            })
            .catch(errors => console.log(errors));
    }

}
module.exports = controller;