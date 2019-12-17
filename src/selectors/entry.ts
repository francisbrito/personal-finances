import { Entry, User } from "../data/models";
import { IPaginationOptions, IResultPage } from "./pagination";

export interface IGetEntriesOfUserOptions extends IPaginationOptions {
  user: User;
}

export default async function getEntriesOfUser(
  options: IGetEntriesOfUserOptions
): Promise<IResultPage<Entry>> {
  const query = Entry.query().modify("onlyOwnedByUser", options.user.id);
  const results = await query;
  const count = (await query.count("id").as("count")) as any;

  return {
    count,
    results
  };
}
