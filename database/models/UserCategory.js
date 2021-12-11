module.exports = (sequelize, dataTypes) => {

    let alias = "UserCategory";
    let cols = {
       id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},       
       name: { type: dataTypes.STRING(100)},        
     };
     let config = {
       tableName: 'usercategories',
       timestamps: false
     };
    
    const Model = sequelize.define(alias, cols, config);

    Model.associate = models => {

    Model.hasMany(models.User, {
      as: "users",
      foreignKey: 'usercategory_id'
    })  
  }    
    return Model;
    
    }