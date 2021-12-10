module.exports = (sequelize, dataTypes) => {

    let alias = "ProductGender";
    let cols = {
       id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},       
       name: { type: dataTypes.STRING(100), allowNull: false},        
     };
     let config = {
       tableName: 'productgenders',
       timestamps: false
     };
    
    const Model = sequelize.define(alias, cols, config);

    Model.associate = models => {

    Model.hasMany(models.Product, {
      as: "products",
      foreignKey: 'productgender_id'
    })  
  }
    
    return Model;
    
    }