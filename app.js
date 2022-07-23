const fastify = require('fastify')();
const routes = require("./routes/index");
const postgres = require("@fastify/postgres");

fastify.register(postgres, {
  connectionString: "postgres://postgres@localhost/postgres",
});
fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
