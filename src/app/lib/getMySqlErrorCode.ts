import { MySqlError } from "./mysqlClient";

enum MySqlErrorCode {
  USER_ACCESS_DENIED = "USER_ACCESS_DENIED",
  UNKNOWN_DB = "UNKNOWN_DB",
  ECONNREFUSED = "ECONNREFUSED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

function isMySqlError(e: any): e is MySqlError {
  return e.message !== undefined;
}

export const getMySqlErrorCode = (error: Error | unknown): MySqlErrorCode => {
  if (!isMySqlError(error)) return MySqlErrorCode.UNKNOWN_ERROR;

  const databaseUserAccessDenied = error.message.includes(
    "Access denied for user"
  );
  const unknownDatbase = error.message.includes("Unknown database");
  const connectionRefused = error.message.includes("ECONNREFUSED");

  if (databaseUserAccessDenied) {
    // User or Password are incorrect
    return MySqlErrorCode.USER_ACCESS_DENIED;
  } else if (unknownDatbase) {
    // Database name is wrong
    return MySqlErrorCode.UNKNOWN_DB;
  } else if (connectionRefused) {
    // Database Host or Port are incorrect
    return MySqlErrorCode.ECONNREFUSED;
  } else {
    return MySqlErrorCode.UNKNOWN_ERROR;
  }
};
