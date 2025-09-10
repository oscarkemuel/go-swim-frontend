import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxyFetch(
  req: NextRequest,
  endpoint: string
) {
  const cookie = await cookies();
  const token = cookie.get("auth_token")?.value;

  const url = `${process.env.API_URL}${endpoint}`;

  const res = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: req.method !== "GET" ? await req.text() : undefined,
    cache: "no-store",
  });

  const text = await res.text();

  return NextResponse.json(text ? JSON.parse(text) : null, {
    status: res.status,
  });
}
