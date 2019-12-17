/* tslint:disable:max-classes-per-file */
import { Decimal } from "decimal.js";
import * as uuid from "uuid";

import { Entry, User } from "../data/models";
import { Currency, EntryType } from "../data/models/entry";

export interface IRegisterEntry {
  amount: Decimal;
  type: EntryType;
  currency: Currency;
  description?: string;
  user: User;
}

export class AmountMustBeGreaterThanZero extends Error {
  public readonly name = "AmountMustBeGreaterThanZero";
  public readonly message = "amount must be greater than 0";
}

export class CurrencyIsNotSupported extends Error {
  public readonly name = "CurrencyIsNotSupported";
  public readonly message = "currency is not supported";
}

export class EntryTypeIsNotSupported extends Error {
  public readonly name = "EntryTypeIsNotSupported";
  public readonly message = "entry type is not supported";
}

export class UserIsNotVerified extends Error {
  public readonly name = "UserIsNotVerified";
  public readonly message = "only verified users can perform this action";
}

export async function registerEntry(options: IRegisterEntry): Promise<Entry> {
  if (options.amount.isNegative() || options.amount.isZero()) {
    throw new AmountMustBeGreaterThanZero();
  }

  if (!Object.values(Currency).includes(options.currency)) {
    throw new CurrencyIsNotSupported();
  }

  if (!Object.values(EntryType).includes(options.type)) {
    throw new EntryTypeIsNotSupported();
  }

  if (!options.user.emailVerified) {
    throw new UserIsNotVerified();
  }

  return Entry.query().insertGraphAndFetch({
    amount: options.amount,
    currency: options.currency,
    id: uuid.v4(),
    type: options.type,
    userId: options.user.id
  });
}
