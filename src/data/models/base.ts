import knex from "knex";
import { Model as ModelBase } from "objection";

import databaseConfiguration from "../knexfile";

ModelBase.knex(knex(databaseConfiguration));

export abstract class Model extends ModelBase {}
