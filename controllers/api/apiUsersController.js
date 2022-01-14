const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../../database/models');
const { User, UserCategory, UserGender } = require('../../database/models');
// const UserCategory = require('../database/models/UserCategory');

const controller = {
    userList: (req,res) => {         
        User.findAll(
            {   
                attributes: ['id', 'first_name', 'last_name', 'born_date','username', 'email', 'password', 'avatar', 'usergender_id', 'usercategory_id'],
                include: [{association: "usercategory"}, {association: "usergender"}]
            })
            .then( (users) => {                
                let respuesta = {
                    meta: {
                        status : 200,
                        count: users.length,
                        url: 'api/users'
                    },
                    data: users
                }
                    res.json(respuesta);
                  
            })
            .catch(errors => console.log(errors));
    },

}
module.exports = controller;