module.exports = (sequelize, dataTypes) => {

    let alias = "Product_Size_Color";
    let cols = {
       id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},       
       size_id: { type: dataTypes.INTEGER, allowNull: false},        
       product_id: { type: dataTypes.INTEGER, allowNull: false}, 
       color_id:{type: dataTypes.INTEGER, allowNull: false},
       stock: { type: dataTypes.INTEGER, allowNull: false},  
     };
     let config = {
       tableName: 'product_size_color',
       timestamps: false
     };

     const Model = sequelize.define(alias, cols, config); 

      Model.associate = models => {

       Model.belongsTo(models.Size, {
           as: "sizes",
           foreignKey: 'size_id'
       })

       Model.belongsTo(models.Product, {
           as: 'products',
           foreignKey: 'product_id'
       })

       Model.belongsTo(models.Color, {
         as: "colors",
         foreignKey: "color_id",
       })
     
     }
    
   
    return Model;    
}