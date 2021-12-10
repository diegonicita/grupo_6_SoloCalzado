module.exports = (sequelize, dataTypes) => {

    let alias = "Cart";
    let cols = {
       id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},       
     };
     let config = {
       tableName: 'carts',
       timestamps: false
     };
    
    const Model = sequelize.define(alias, cols, config);
    
    return Model;
    
    }