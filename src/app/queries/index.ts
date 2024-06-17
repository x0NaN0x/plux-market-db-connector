import { itemQueries } from "./items.queries";
import { QueriesSchema } from "./queries.schema";
import { settingsQueries } from "./settings.queries";
import { statisticQueries } from "./statistic.queries";
import { storeQueries } from "./store.queries";

type QueryToken = {
  [key: QueriesSchema]: string;
};

export const queryToken: QueryToken = {
  ...statisticQueries,
  ...storeQueries,
  ...settingsQueries,
  ...itemQueries,
};
