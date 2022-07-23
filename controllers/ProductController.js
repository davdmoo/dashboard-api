const { Product } = require("../models");
const Sequelize = require('sequelize');
const op = Sequelize.Op;

class ProductController {
  static async createProduct(request, reply) {
    try {
      const { name, imageUrl, price, description, CategoryId } = request.body;
      const newProduct = await Product.create({ name, imageUrl, price, description, CategoryId });

      reply
        .code(201)
        .send(newProduct);
    } catch (error) {
      reply
        .code(500)
        .send({ message: "Internal server error" });
    }
  }

  static async getProducts(request, reply) {
    try {
      let query = {};
      if (request.query) {
        if (request.query.name) {
          query = {
            name: {
              [op.iLike]: `%${request.query.name}%`,
            }
          }
        } else {
          query = request.query;
        }
      }

      const products = await Product.findAll({ where: query });

      reply
        .code(200)
        .send(products);
    } catch (error) {
      reply
        .code(500)
        .send({ message: "Internal server error" });
    }
  }

  static async getProductById(request, reply) {
    try {
      const productId = request.params.id;
      const product = await Product.findByPk(productId);

      reply
        .code(200)
        .send(product);
    } catch (error) {
      reply
        .code(500)
        .send({ message: "Internal server error" });
    }
  }
}

module.exports = ProductController;
