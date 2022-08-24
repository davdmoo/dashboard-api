const { Product, Category } = require("../models");
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

      const products = await Product.findAll({ include: Category, where: query });

      reply
        .code(200)
        .send(products);
    } catch (error) {
      console.log(`getProducts error - ${error}`);
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

  static async deleteProduct(request, reply) {
    try {
      const productId = request.params.id;
      const product = await Product.findByPk(productId);

      if (!product) throw "NotFound";

      await product.destroy();

      reply
        .code(200)
        .send({ message: `${product.name} deleted` });
    } catch (error) {
      console.log(`deleteProduct error - ${error}`);

      if (error == "NotFound") {
        reply
          .code(404)
          .send({ message: "Not found" });
      } else {
        reply
          .code(500)
          .send({ message: "Internal server error" });
      }
    }
  }
}

module.exports = ProductController;
