import S from "fluent-schema";
import { JSONSchema } from "objection";

import { Model } from "./base";
import { Entry } from "./entry";

export class User extends Model {
  public static readonly tableName = "users";

  public static readonly jsonSchema: JSONSchema = S.object()
    .id("model:user")
    .title("UserModel")
    .required(["id", "awsCognitoId", "givenName", "familyName", "email"])
    .prop("id", S.string().format("uuid"))
    .prop("awsCognitoId", S.string().format("uuid"))
    .prop("givenName", S.string().maxLength(250))
    .prop("familyName", S.string().maxLength(250))
    .prop("email", S.string().maxLength(250))
    .prop("emailVerified", S.boolean().default(false))
    .valueOf();

  public static readonly relationMappings = {
    entries: {
      join: {
        from: "users.id",
        to: "entries.user"
      },
      modelClass: Entry,
      relation: Model.HasManyRelation
    }
  };

  public id!: string;
  public awsCognitoId!: string;
  public givenName!: string;
  public familyName!: string;
  public email!: string;
  public emailVerified!: boolean;
}
