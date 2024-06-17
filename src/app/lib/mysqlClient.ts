import { env } from "@/env";
import mysql from "serverless-mysql";

const config = {
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  database: env.MYSQL_DATABASE,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
};

const db = mysql({
  config,
  library: require("mysql2"),
});

export async function executeQuery({
  query,
  values,
}: {
  query: string;
  values?: string | string[] | number | number[];
}): Promise<any> {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
