module.exports = (sequelize, dataTypes) => {

    let alias = "Product";
    let cols = {
       id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
       name: { type: dataTypes.STRING(200), allowNull: true},       
       description: { type: dataTypes.TEXT, allowNull: true },       
       price: {type: dataTypes.DECIMAL(10,2), allowNull: true },
       image: {type: dataTypes.STRING(300), allowNull: true }
     };
     let config = {
       tableName: 'products',
       timestamps: false
     };
    
    const Product = sequelize.define(alias, cols, config);
    
    return Product;
    
    }
    
    