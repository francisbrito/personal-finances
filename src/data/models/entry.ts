import { Decimal } from "decimal.js";
import S from "fluent-schema";
import * as Objection from "objection";

import { Model } from "./base";

export enum Currency {
  DOP = "dop",
  USD = "usd"
}

export enum EntryType {
  EXPENSE = "expense",
  INCOME = "income"
}

export class Entry extends Model {
  public static readonly tableName = "entries";

  public static readonly jsonSchema: Objection.JSONSchema = S.object()
    .id("model:entry")
    .title("EntryModel")
    .required(["id", "userId", "amount", "type", "currency"])
    .prop("id", S.string().format("uuid"))
    .prop("userId", S.string().format("uuid"))
    .prop("amount", S.number().minimum(1))
    .prop("currency", S.string().enum(Object.values(Currency)))
    .prop("type", S.string().enum(Object.values(EntryType)))
    .valueOf();

  public static get modifiers(): Objection.Modifiers {
    return {
      onlyOwnedByUser(builder: Objection.QueryBuilder<Entry>, userId: string) {
        builder.where("userId", "=", userId);
      }
    };
  }

  public id!: string;
  public userId!: string;
  public amount!: Decimal;
  public type!: EntryType;
  public currency!: Currency;
  public description?: string;
  public created!: Date;
  public modified!: Date;

  public $parseJson(
    json: Objection.Pojo,
    opt?: Objection.ModelOptions
  ): Objection.Pojo {
    if (json.amount) {
      json.amount = json.amount.toNumber();
    }

    return super.$parseJson(json, opt);
  }

  public $formatJson(json: Objection.Pojo): Objection.Pojo {
    if (json.amount) {
      json.amount = new Decimal(json.amount);
    }

    return super.$formatJson(json);
  }

  public $parseDatabaseJson(json: Objection.Pojo): Objection.Pojo {
    if (json.amount) {
      json.amount = new Decimal(json.amount);
    }

    return super.$parseDatabaseJson(json);
  }

  public $formatDatabaseJson(json: Objection.Pojo): Objection.Pojo {
    const formatted = super.$parseDatabaseJson(json);

    formatted.amount = formatted.amount.toFixed(2);

    return formatted;
  }
}
