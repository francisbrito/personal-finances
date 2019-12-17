import * as fastify from "fastify";

export = async (instance: fastify.FastifyInstance, options: {}) => {
  instance
    .register(require("./plugins/authentication"))
    .register(require("./plugins/views"))
    .register(require("./plugins/documentation"))
    .register(require("./routes/entry"));
};
