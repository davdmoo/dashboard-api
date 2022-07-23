const { Order } = require("../models");

class OrderController {
  static async createOrder(request, reply) {
    try {
      const { quantity, subtotal, ProductId } = request.body;
      const newOrder = await Order.create({ quantity, subtotal, ProductId });

      reply
        .code(201)
        .send(newOrder);
    } catch (error) {
      reply
        .code(500)
        .send({ message: "Internal server error" });
    }
  }

  static async getOrders(request, reply) {
    try {
      const orders = await Order.findAll();

      reply
        .code(200)
        .send(orders);
    } catch (error) {
      reply
        .code(500)
        .send({ message: "Internal server error" });
    }
  }
}

module.exports = OrderController;
