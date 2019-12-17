import * as http from "http";

import config from "config";
import * as fastify from "fastify";
import plugin from "fastify-plugin";

import pointOfView = require("point-of-view");

const viewsPlugin: fastify.Plugin<
  http.Server,
  http.IncomingMessage,
  http.ServerResponse,
  {}
> = async (instance, options) => {
  instance.register(pointOfView, {
    engine: {
      ejs: require("ejs")
    },
    templates: config.get<string>("dir.templates")
  });
};

export = plugin(viewsPlugin);
