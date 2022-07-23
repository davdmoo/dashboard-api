'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Product.hasMany(models.Order, { foreignKey: "ProductId" });
    }
  };

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" },
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Image URL is required" },
        notEmpty: { msg: "Image URL is required" },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Price is required" },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Description is required" },
        notEmpty: { msg: "Description is required" },
      },
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "Categories",
        },
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
      validate: {
        notEmpty: { msg: "Category ID is required" },
      },
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};