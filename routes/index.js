async function routes (fastify, options) {
  const opts = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            hello: { type: "string" },
          }
        }
      }
    }
  }
  
  fastify.get("/", opts, async (request, reply) => {
    return { hello: "routes" };
  });
}

module.exports = routes;
