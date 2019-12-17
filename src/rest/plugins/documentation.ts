import * as http from "http";

import * as fastify from "fastify";
import fastifyOAS = require("fastify-oas");
import plugin from "fastify-plugin";

const documentation: fastify.Plugin<
  http.Server,
  http.IncomingMessage,
  http.ServerResponse,
  {}
> = async (instance, options) => {
  instance
    .register(fastifyOAS, {
      routePrefix: "/documentation",
      swagger: {
        consumes: ["application/json"],
        info: {
          description:
            "A toy web service for feeding a personal finances management application.",
          title: "Personal Finances",
          version: "0.0.1"
        },
        produces: ["application/json"]
      }
    })
    .get(
      "/openapi.json",
      { schema: { hide: true } },
      async (request, reply) => {
        reply.send(await instance.oas());
      }
    )
    .get("/documentation", { schema: { hide: true } }, (request, reply) => {
      reply.view("documentation.ejs", {
        documentationUrl: "/openapi.json"
      });
    })
    .ready(async error => {
      if (error) {
        throw error;
      }

      await instance.oas();
    });
};

export = plugin(documentation);
