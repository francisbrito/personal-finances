// tslint:disable-next-line:no-implicit-dependencies
import Chance = require("chance");

import { User } from "../../src/data/models";

const chance = new Chance();

export async function registerUser(overrides?: Partial<User>): Promise<User> {
  return User.query().insertGraphAndFetch({
    awsCognitoId: chance.guid({ version: 4 }),
    email: chance.email({ domain: "@point.do" }),
    emailVerified: true,
    familyName: chance.last(),
    givenName: chance.first(),
    id: chance.guid({ version: 4 }),
    ...overrides
  });
}
