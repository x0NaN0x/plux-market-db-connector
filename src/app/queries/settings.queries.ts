const VENDING_LOG_EXISTS = `
SELECT 1 
  FROM vending_log 
  LIMIT 1;
`;

export const settingsQueries = {
  VENDING_LOG_EXISTS,
};

export const settingsQueriesTokens = Object.keys(settingsQueries).map(
  (key) => key
);
