module.exports = (sequelize, dataTypes) => {

    let alias = "User";
    let cols = {
       id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
       username: { type: dataTypes.STRING(100), allowNull: false},       
       first_name: { type: dataTypes.STRING(100), allowNull: true},       
       last_name: { type: dataTypes.STRING(100), allowNull: true},       
       born_date: { type: dataTypes.DATE, allowNull: true},       
       email: { type: dataTypes.STRING(100), allowNull: false },       
       password: {type: dataTypes.STRING(100), allowNull: false },
       usergender_id: {type: dataTypes.INTEGER, allowNull: false },  
       usercategory_id: {type: dataTypes.INTEGER, allowNull: false },  
       avatar: {type: dataTypes.STRING(300), allowNull: true }
     };
     let config = {
       tableName: 'users',
       timestamps: false
     };
    
    const Model = sequelize.define(alias, cols, config);

    Model.associate = models => {
      
      Model.belongsTo(models.UserCategory, {
        as: 'usercategory',
        foreignKey: 'usercategory_id'
    })

      Model.belongsTo(models.UserGender, {
          as: 'usergender',
          foreignKey: 'usergender_id'
      })
  }
    
    return Model;
    
    }