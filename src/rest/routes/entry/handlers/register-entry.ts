import * as fastify from "fastify";
import S from "fluent-schema";

import { Currency, Entry, EntryType } from "../../../../data/models/entry";
import { registerEntry } from "../../../../services";

export const BODY_SCHEMA = S.object()
  .id("input:register-entry")
  .title("RegisterEntryInput")
  .required(["amount", "currency", "type"])
  .prop("amount", S.number().minimum(1))
  .prop("currency", S.string().enum(Object.values(Currency)))
  .prop("type", S.string().enum(Object.values(EntryType)))
  .valueOf();

export const RESPONSE_SCHEMA = Entry.jsonSchema;

export const handle: fastify.RequestHandler = async (request, reply) => {
  const input = request.body;
  const entry = await registerEntry(input);

  reply.send(entry);
};
