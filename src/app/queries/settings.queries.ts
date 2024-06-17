const VENDING_LOG_EXISTS = `
SELECT COUNT(*)
  FROM information_schema.tables 
  WHERE table_schema = ? 
    AND table_name = 'vending_log';
`;

export const settingsQueries = {
  VENDING_LOG_EXISTS,
};

export const settingsQueriesTokens = Object.keys(settingsQueries).map(
  (key) => key
);
