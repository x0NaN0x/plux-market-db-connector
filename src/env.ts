import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    MYSQL_HOST: z.string().min(1),
    MYSQL_PORT: z.number().int().min(1).max(65535),
    MYSQL_DATABASE: z.string().min(1),
    MYSQL_USER: z.string().min(1),
    MYSQL_PASSWORD: z.string().min(1),
    API_SECRET_TOKEN: z.string().min(1),
    DEMO_MODE: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Will show results of players that are offline, this is only used for demo purposes"
      ),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {},
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: parseInt(process.env.MYSQL_PORT as string, 10),
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    API_SECRET_TOKEN: process.env.API_SECRET_TOKEN,
    DEMO_MODE: process.env.DEMO_MODE === "true" ? true : false,
  },
});
