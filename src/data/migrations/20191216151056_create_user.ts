import * as Knex from "knex";
import { addTimeStampsToTable } from "../migration-util";

import { User } from "../models";

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable(User.tableName, t => {
    t.uuid("id").primary();
    t.uuid("awsCognitoId").unique();
    t.string("givenName", 250)
      .notNullable()
      .index();
    t.string("familyName", 250)
      .notNullable()
      .index();
    t.string("email", 250)
      .notNullable()
      .unique();
    t.boolean("emailVerified")
      .notNullable()
      .defaultTo(false);

    addTimeStampsToTable(t, knex);
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable(User.tableName);
}
