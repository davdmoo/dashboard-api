'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Product, { foreignKey: "ProductId" });
    }
  }

  Order.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Quantity is required" },
      },
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Subtotal is required" },
      },
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "Products",
        },
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
      validate: {
        notEmpty: { msg: "Product ID is required" },
      },
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};