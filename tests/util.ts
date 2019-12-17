import { Entry, Model, User } from "../src/data/models";

export const tables = [Entry.tableName, User.tableName];

export async function truncateTables() {
  for (const table of tables) {
    await Model.knex().raw(`TRUNCATE TABLE ${table} CASCADE`);
  }
}
