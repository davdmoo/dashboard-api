const CategoryController = require("../controllers/CategoryController");
const OrderController = require("../controllers/OrderController.js");
const ProductController = require("../controllers/ProductController");

async function routes(fastify, options) {
  const opts = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            hello: { type: "string" },
            message: { type: "string" }
          }
        },
        201: {
          type: "object",
          properties: {
            message: { type: "string" },
            data: { type: "object" },
          }
        }
      }
    }
  }

  fastify.get("/", opts, async (request, reply) => {
    reply
      .code(200)
      .send({ message: "Hello fastify" });
  });

  fastify.get("/products", ProductController.getProducts);
  fastify.get("/categories", CategoryController.getCategories);
  fastify.get("/orders", OrderController.getOrders);
  fastify.get("/products/:id", ProductController.getProductById);

  fastify.delete("/products/:id", ProductController.deleteProduct);
  fastify.delete("/orders/:id", OrderController.deleteOrder);
  fastify.delete("/categories/:id", CategoryController.deleteCategory);

  fastify.post("/products", ProductController.createProduct);
  fastify.post("/categories", CategoryController.createCategory);
  fastify.post("/orders", OrderController.createOrder);
}

module.exports = routes;
