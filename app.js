const fastify = require('fastify')();
const routes = require("./routes/index");
const postgres = require("@fastify/postgres");
const port = 3000;

fastify.register(postgres, {
  connectionString: "postgres://postgres@localhost/postgres",
});
fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({ port });
    console.log(`Server is running at http://localhost:${port}`);
  } catch (err) {
    console.log(`Error - ${err}`);
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
