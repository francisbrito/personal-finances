import { patchConfigurationDirectoryVariable } from "../util";

patchConfigurationDirectoryVariable();

import config from "config";
import { Config } from "knex";

const configuration: Config = {
  client: "pg",
  connection: config.get<{
    host: string;
    port: number;
    database: string;
    user: string;
    password?: string;
  }>("db.config"),
  migrations: {
    directory: config.get<string>("dir.migrations"),
    tableName: "migrations"
  },
  pool: {
    max: 12,
    min: 3
  }
};

export = configuration;
