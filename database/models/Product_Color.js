module.exports = (sequelize, dataTypes) => {

    let alias = "Product_Color";
    let cols = {
       id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},       
       color_id: { type: dataTypes.INTEGER, allowNull: false},        
       product_id: { type: dataTypes.INTEGER, allowNull: false},        
     };
     let config = {
       tableName: 'product_color',
       timestamps: false
     };
    
    const Model = sequelize.define(alias, cols, config); 
    return Model;    
}