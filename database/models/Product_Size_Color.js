module.exports = (sequelize, dataTypes) => {

    let alias = "Product_Size_Color";
    let cols = {
       id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},       
       size_id: { type: dataTypes.INTEGER, allowNull: false},        
       product_id: { type: dataTypes.INTEGER, allowNull: false}, 
       color_id:{type: dataTypes.INTEGER, allowNull: false},
      //  stock: { type: dataTypes.INTEGER, allowNull: false},  
     };
     let config = {
       tableName: 'product_size_color',
       timestamps: false
     };
    
    const Model = sequelize.define(alias, cols, config); 
    return Model;    
}