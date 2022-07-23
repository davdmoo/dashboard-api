'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, { foreignKey: "CategoryId" });
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Category's name is required" },
        notEmpty: { msg: "Category's name is required" },
      },
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};