module.exports = (sequelize, dataTypes) => {

    let alias = "Size";
    let cols = {
       id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},       
       num: { type: dataTypes.STRING(100), allowNull: false},        
     };
     let config = {
       tableName: 'sizes',
       timestamps: false
     };
    
    const Model = sequelize.define(alias, cols, config);

    Model.associate = models => {

      Model.belongsToMany(models.Product, {
          as: "products",
          through: 'product_size',
          foreignKey: "size_id",
          otherKey: "product_id",
          timestamps : false
      })
  }
    
    return Model;
    
}