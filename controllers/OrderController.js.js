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

  static async deleteOrder(request, reply) {
    try {
      const orderId = request.params.id;
      const order = await Order.findByPk(orderId);

      if (!order) throw "NotFound";

      await order.destroy();

      reply
        .code(200)
        .send({ message: `Order with ID ${order.id} deleted` });
    } catch (error) {
      console.log(`deleteOrder error - ${error}`);

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

module.exports = OrderController;
