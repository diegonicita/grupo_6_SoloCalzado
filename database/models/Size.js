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
          through: 'product_size_color',
          foreignKey: "size_id",
          otherKey: "product_id",
          timestamps : false
      })

    //   Model.belongsTo(models.Product_Size_Color, {
    //     as: "product_size_color",
    //     foreignKey: 'id'
    // })
  }
    
    return Model;
    
}