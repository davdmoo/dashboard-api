const { Category } = require("../models");

class CategoryController {
  static async createCategory(request, reply) {
    try {
      const { name } = request.body;
      const newCategory = await Category.create({ name });

      reply
        .code(201)
        .send(newCategory);
    } catch (error) {
      reply
        .code(500)
        .send({ message: "Internal server error" });
    }
  }

  static async getCategories(request, reply) {
    try {
      const categories = await Category.findAll();

      reply
        .code(200)
        .send(categories);
    } catch (error) {
      reply
        .code(500)
        .send({ message: "Internal server error" });
    }
  }
}

module.exports = CategoryController;