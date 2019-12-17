import Decimal from "decimal.js";
import { Model, User } from "../../src/data/models";
import { Currency, EntryType } from "../../src/data/models/entry";

import { registerEntry } from "../../src/services";
import {
  AmountMustBeGreaterThanZero,
  CurrencyIsNotSupported,
  EntryTypeIsNotSupported,
  UserIsNotVerified
} from "../../src/services/entry";

import * as factories from "../factories";
import { truncateTables } from "../util";

describe("registerEntry", () => {
  let user: User;

  beforeAll(async () => {
    await Model.knex().migrate.latest();
  });

  beforeEach(async () => {
    user = await factories.registerUser();
  });

  afterEach(async () => {
    await truncateTables();
  });

  afterAll(async () => {
    await Model.knex().migrate.rollback({}, true);
    await Model.knex().destroy();
  });

  it("throws if amount is negative", async () => {
    await expect(
      registerEntry({
        amount: new Decimal("0"),
        currency: Currency.DOP,
        type: EntryType.EXPENSE,
        user
      })
    ).rejects.toThrowError(AmountMustBeGreaterThanZero);

    await expect(
      registerEntry({
        amount: new Decimal("-10.00"),
        currency: Currency.DOP,
        type: EntryType.EXPENSE,
        user
      })
    ).rejects.toThrowError(AmountMustBeGreaterThanZero);
  });

  it("throws if currency is unsupported", async () => {
    const currency = "foo" as any;

    await expect(
      registerEntry({
        amount: new Decimal("10.00"),
        currency,
        type: EntryType.EXPENSE,
        user
      })
    ).rejects.toThrowError(CurrencyIsNotSupported);
  });

  it("throws if entry type is unsupported", async () => {
    const type = "foo" as any;

    await expect(
      registerEntry({
        amount: new Decimal("10.00"),
        currency: Currency.DOP,
        type,
        user
      })
    ).rejects.toThrowError(EntryTypeIsNotSupported);
  });

  it("throws if user email is unverified", async () => {
    user = await factories.registerUser({ emailVerified: false });

    await expect(
      registerEntry({
        amount: new Decimal("10.00"),
        currency: Currency.DOP,
        type: EntryType.EXPENSE,
        user
      })
    ).rejects.toThrowError(UserIsNotVerified);
  });

  it("register a new entry into the database", async () => {
    const entry = await registerEntry({
      amount: new Decimal("10.00"),
      currency: Currency.DOP,
      type: EntryType.EXPENSE,
      user
    });

    expect(entry.amount.equals(new Decimal("10.00"))).toBe(true);
    expect(entry.currency).toEqual(Currency.DOP);
    expect(entry.type).toEqual(EntryType.EXPENSE);
    expect(entry.userId).toEqual(user.id);
  });
});
