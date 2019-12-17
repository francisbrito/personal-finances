import * as http from "http";

import config from "config";
import * as fastify from "fastify";
import jwt from "fastify-jwt";
import plugin from "fastify-plugin";

const BASE_PATH = "/auth";
const SIGN_IN_ENDPOINT = `${BASE_PATH}/sign-in`;

const authentication: fastify.Plugin<
  http.Server,
  http.IncomingMessage,
  http.ServerResponse,
  {}
> = (instance, options) => {
  instance
    .register(jwt, {
      secret: config.get<string>("secret")
    })
    .post(SIGN_IN_ENDPOINT, {}, async (request, response) => {
      // TODO:
    });
};

export = plugin(authentication, {
  name: "authentication"
});
