module.exports = (sequelize, dataTypes) => {

    let alias = "UserGender";
    let cols = {
       id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},       
       name: { type: dataTypes.STRING(100)},        
     };
     let config = {
       tableName: 'usergenders',
       timestamps: false
     };
    
    const Model = sequelize.define(alias, cols, config);

    Model.associate = models => {

    Model.hasMany(models.User, {
      as: "users",
      foreignKey: 'usergender_id'
    })  
  }    
    return Model;
    
    }