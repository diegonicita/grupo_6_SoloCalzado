module.exports = (sequelize, dataTypes) => {

    let alias = "Product";
    let cols = {
       id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
       title: { type: dataTypes.STRING(200), allowNull: true},       
       description: { type: dataTypes.TEXT, allowNull: true },       
       price: {type: dataTypes.DECIMAL(10,2), allowNull: true },
       image: {type: dataTypes.STRING(300), allowNull: true },
       productgender_id: {type: dataTypes.INTEGER, allowNull: false},
       brand_id: {type: dataTypes.INTEGER, allowNull: false},
     };
     let config = {
       tableName: 'products',
       timestamps: false
     };
    
    const Model = sequelize.define(alias, cols, config);

    Model.associate = models => {

      Model.belongsTo(models.Brand, {
          as: "brand",
          foreignKey: 'brand_id'
      })

      Model.belongsTo(models.ProductGender, {
          as: 'productgender',
          foreignKey: 'productgender_id'
      })
  }
    
    return Model;
    
    }
    
    