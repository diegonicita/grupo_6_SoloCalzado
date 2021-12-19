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

      Model.belongsToMany(models.Color, {
        as: "colors",
        through: 'product_size_color',
        foreignKey: "product_id",
        otherKey: "color_id",
        timestamps: false       
      })

      Model.belongsToMany(models.Size, {
        as: "sizes",
        through: 'product_size_color',
        foreignKey: "product_id",
        otherKey: "size_id",
        timestamps: false       
      })
      
      Model.hasMany(models.Product_Size_Color, {
        as: "productsizecolors",
        foreignKey: "product_id",
        timestamps: false
      })
    }
    
    return Model;
    
  }
    
    