import { executeQuery } from "@/app/lib/mysqlClient";
import { queryToken } from "@/app/queries";
import { queriesSchema } from "@/app/queries/queries.schema";
import { env } from "@/env";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  const secret = request.headers.get("Secret");
  const { token, parameters } = await request.json();

  // Safe authentication between Plux Market and the API
  if (secret !== env.API_SECRET_TOKEN) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Make sure that there's one MySQL query token on the request
  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 400 });
  }

  // Validate the token is a valid accepted query token, if not, return an error
  const result = queriesSchema.safeParse(token);
  if (!result.success) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  const values = !parameters ? [] : parameters;

  try {
    // Using values with mysqlClient to prevent SQL Injection
    const data = await executeQuery({
      query: queryToken[token],
      values,
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
