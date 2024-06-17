import { z } from "zod";
import { statisticQueriesTokens } from "./statistic.queries";
import { storeQueriesTokens } from "./store.queries";
import { settingsQueriesTokens } from "./settings.queries";
import { itemQueriesTokens } from "./items.queries";

// Combine the two arrays
const combinedTokens = [
  ...statisticQueriesTokens,
  ...storeQueriesTokens,
  ...settingsQueriesTokens,
  ...itemQueriesTokens,
];

const allTokens = Array.from(new Set(combinedTokens));

// Create a Zod schema for the keys
export const queriesSchema = z.enum(allTokens as [string, ...string[]]);

export type QueriesSchema = z.infer<typeof queriesSchema>;
