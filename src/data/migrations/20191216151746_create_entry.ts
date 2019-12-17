import * as Knex from "knex";
import { addTimeStampsToTable } from "../migration-util";
import { Entry, User } from "../models";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable(Entry.tableName, t => {
    t.uuid("id").primary();
    t.uuid("userId")
      .notNullable()
      .references("id")
      .inTable(User.tableName)
      .onDelete("CASCADE");
    t.decimal("amount", 14, 2)
      .notNullable()
      .index();
    t.string("type", 50)
      .notNullable()
      .index();
    t.string("currency", 3)
      .notNullable()
      .index();
    t.text("description").nullable();

    addTimeStampsToTable(t, knex);
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable(Entry.tableName);
}
