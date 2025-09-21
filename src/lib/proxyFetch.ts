import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function proxyFetch(
  req: NextRequest,
  endpoint: string
) {
  const cookieStore = await cookies();
  
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const url = `${process.env.API_URL}${endpoint}`;

  const res = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {})
    },
    body: req.method !== "GET" ? await req.text() : undefined,
    cache: "no-store",
  });

  const text = await res.text();

  return NextResponse.json(text ? JSON.parse(text) : null, {
    status: res.status,
  });
}
