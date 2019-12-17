import * as Knex from "knex";

export function addTimeStampsToTable(t: Knex.TableBuilder, knex: Knex) {
  t.dateTime("created")
    .notNullable()
    .index()
    .defaultTo(knex.fn.now());
  t.dateTime("modified")
    .notNullable()
    .index()
    .defaultTo(knex.fn.now());
}
