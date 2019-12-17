import * as http from "http";

import * as fastify from "fastify";
import plugin from "fastify-plugin";

import * as registerEntry from "./handlers/register-entry";
import * as retrieveEntries from "./handlers/retrieve-entries";

const BASE_PATH = "/entries";

const entryRoute: fastify.Plugin<
  http.Server,
  http.IncomingMessage,
  http.ServerResponse,
  any
> = async (instance, options) => {
  instance
    .post(BASE_PATH, {
      handler: registerEntry.handle,
      schema: {
        body: registerEntry.BODY_SCHEMA,
        description: "Registers a new entry for the current user",
        operationId: "registerEntry",
        response: {
          200: registerEntry.RESPONSE_SCHEMA
        },
        summary: "Register entry"
      }
    })
    .get(BASE_PATH, {
      handler: retrieveEntries.handle,
      preValidation: [],
      schema: {
        description: "Retrieves the current user's entries",
        operationId: "getEntries",
        querystring: retrieveEntries.PARAMS_SCHEMA,
        response: {
          200: retrieveEntries.RESPONSE_SCHEMA
        },
        summary: "Retrieve entries"
      }
    });
};

export = plugin(entryRoute, {
  name: "entry-routes"
});
