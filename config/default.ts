import { parse } from "pg-connection-string";
import { patchConfigurationDirectoryVariable } from "../src/util";

patchConfigurationDirectoryVariable();

import assert = require("assert");
import path = require("path");

import env = require("dotenv");

const PROJECT_ROOT = path.resolve(__dirname, "..");

env.config({
  path: path.join(PROJECT_ROOT, ".env")
});

assert(process.env.DB_URL, "DB_URL environment variable is missing");
assert(process.env.SECRET, "SECRET environment variable is missing");

const { database, host, port, user, password } = parse(process.env.DB_URL!);

export default {
  db: {
    config: {
      database: database || "postgres",
      host: host || "localhost",
      password,
      port: port ? parseInt(port, 10) : 5432,
      user: user || "postgres"
    }
  },
  dir: {
    migrations: path.join(PROJECT_ROOT, "src", "data", "migrations"),
    projectRoot: PROJECT_ROOT,
    templates: path.join(PROJECT_ROOT, "src", "rest", "templates")
  },
  secret: process.env.SECRET
};
