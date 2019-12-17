import * as fastify from "fastify";
import S from "fluent-schema";
// import getEntriesOfUser from "../../../../selectors/entry";

import {
  PAGINATED_RESPONSE_SCHEMA,
  PAGINATION_PARAMETERS_SCHEMA
} from "../../../schemas/pagination";

export const RESPONSE_SCHEMA = S.object().extend(PAGINATED_RESPONSE_SCHEMA);

export const PARAMS_SCHEMA = S.object().extend(PAGINATION_PARAMETERS_SCHEMA);

export const handle: fastify.RequestHandler = async (request, reply) => {
  // const { count, results } = await getEntriesOfUser({ user });
  const { count, results } = { count: 0, results: [] };

  const page = {
    count,
    results
  };

  reply.send(page);
};
